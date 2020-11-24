// Copyright 2017 Google LLC
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

import * as assert from 'assert';
import {describe, it} from 'mocha';
import {DatastoreStore} from '../src';
import {Datastore} from '@google-cloud/datastore';
import {SessionData} from 'express-session';

describe('works with no expiration', () => {
  const store = new DatastoreStore({
    dataset: new Datastore(),
  });

  it('Should return an empty session', done => {
    store.get('id1', (err, session) => {
      assert.ifError(err);
      assert.strictEqual(session, undefined);
      done();
    });
  });

  it('Should create and retrieve a session', done => {
    store.set('id1', ({foo: 'bar'} as {}) as SessionData, err => {
      assert.ifError(err);
      store.get('id1', (err, session) => {
        assert.ifError(err);
        assert.deepStrictEqual(session, {foo: 'bar'});
        done();
      });
    });
  });

  it('Should destroy a session', done => {
    store.destroy('id1', err => {
      assert.ifError(err);
      assert.strictEqual(err, null);
      store.get('id1', (err, session) => {
        assert.ifError(err);
        assert.strictEqual(session, undefined);
        done();
      });
    });
  });
});

describe('expired session is not returned', () => {
  const store = new DatastoreStore({
    dataset: new Datastore(),
    expirationMs: 1,
  });

  it('Should create but not retrieve an expired session', done => {
    store.set('id2', ({foo: 'bar'} as {}) as SessionData, err => {
      assert.ifError(err);
      store.get('id2', (err, session) => {
        assert.ifError(err);
        assert.deepStrictEqual(session, undefined);
        done();
      });
    });
  });
});

describe('unexpired session is returned', () => {
  const store = new DatastoreStore({
    dataset: new Datastore(),
    expirationMs: 10000,
  });

  it('Should create and retrieve a session', done => {
    store.set('id3', ({foo: 'bar'} as {}) as SessionData, err => {
      assert.ifError(err);
      store.get('id3', (err, session) => {
        assert.ifError(err);
        assert.deepStrictEqual(session, {foo: 'bar'});
        done();
      });
    });
  });

  it('Should destroy a session', done => {
    store.destroy('id3', err => {
      assert.ifError(err);
      assert.strictEqual(err, null);
      store.get('id3', (err, session) => {
        assert.ifError(err);
        assert.strictEqual(session, undefined);
        done();
      });
    });
  });
});
