/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

module.exports = function(session) {
  const Store = session.Store;

  class DatastoreStore extends Store {
    constructor(options) {
      options = options || {};
      super(options);
      this.ds = options.dataset || options.datastore;
      if (!this.ds) {
        throw new Error('No dataset provided to Datastore Session.');
      }
      this.kind = options.kind || 'Session';
    }

    get(sid, callback) {
      this.ds.get(this.ds.key([this.kind, sid]), (err, entity) => {
        if (err) {
          return callback(err);
        }
        if (!entity) {
          return callback();
        }

        let result;
        try {
          result = JSON.parse(entity.data);
        } catch (er) {
          return callback(er);
        }
        return callback(null, result);
      });
    }

    set(sid, sess, callback) {
      callback = callback || (() => {});
      let sessJson;

      try {
        sessJson = JSON.stringify(sess);
      } catch (err) {
        return callback(err);
      }

      this.ds.save(
        {
          key: this.ds.key([this.kind, sid]),
          data: [
            {
              name: 'data',
              value: sessJson,
              excludeFromIndexes: true,
            },
          ],
        },
        callback
      );
    }

    destroy(sid, fn) {
      this.ds.delete(this.ds.key([this.kind, sid]), fn);
    }
  }
  return DatastoreStore;
};
