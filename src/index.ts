// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as expressSession from 'express-session';
import {Datastore} from '@google-cloud/datastore';
import {
  DeleteCallback,
  SaveCallback,
} from '@google-cloud/datastore/build/src/request';

export interface DataStoreOptions {
  dataset?: Datastore;
  datastore?: Datastore;
  kind?: string;
  expirationMs?: number;
}

export class DatastoreStore extends expressSession.Store {
  ds: Datastore;
  kind: string;
  expirationMs: number;
  constructor(options: DataStoreOptions = {}) {
    super();
    this.ds = (options.dataset || options.datastore)!;
    if (!this.ds) {
      throw new Error('No dataset provided to Datastore Session.');
    }
    this.kind = options.kind || 'Session';

    if (options.expirationMs) {
      if (
        typeof options.expirationMs !== typeof 0 ||
        options.expirationMs < 0
      ) {
        throw new Error(
          'invalid value for option expirationMs: must be an integer greater than 0'
        );
      }
      this.expirationMs = Number(options.expirationMs);
    } else {
      this.expirationMs = 0;
    }
  }

  get = (
    sid: string,
    callback: (
      err: Error | null,
      session?: expressSession.SessionData | null
    ) => void
  ) => {
    this.ds.get(this.ds.key([this.kind, sid]), (err, entity) => {
      if (err) {
        return callback(err);
      }
      if (!entity) {
        return callback(null);
      }

      let result;
      try {
        result = JSON.parse(entity.data);
      } catch (er) {
        return callback(er as Error);
      }

      if (!entity.createdAt || !this.expirationMs) {
        return callback(null, result);
      }

      const createdAtMs = entity.createdAt.valueOf();
      const expiresAtMs = createdAtMs + this.expirationMs;
      const nowMs = new Date().valueOf();

      if (expiresAtMs <= nowMs) {
        this.destroy(sid, err => {
          if (err) {
            return callback(err);
          }
          return callback(null);
        });
        return;
      }

      return callback(null, result);
    });
  };

  set = (
    sid: string,
    sess: expressSession.SessionData,
    callback?: (err: Error | null) => void
  ) => {
    callback = callback || (() => {});
    let sessJson;

    try {
      sessJson = JSON.stringify(sess);
    } catch (err) {
      return callback(err as Error);
    }

    const createdAt = new Date();
    const data = [
      {
        name: 'data',
        value: sessJson,
        excludeFromIndexes: true,
      },
      {
        name: 'createdAt',
        value: createdAt,
      },
    ];

    this.ds.save(
      {
        key: this.ds.key([this.kind, sid]),
        data,
      },
      callback as SaveCallback
    );
  };

  destroy = (sid: string, callback?: (err: Error | null) => void) => {
    this.ds.delete(this.ds.key([this.kind, sid]), callback as DeleteCallback);
  };
}
