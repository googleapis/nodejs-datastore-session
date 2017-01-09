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

var assert = require('assert');
var session = require('express-session');
var DatastoreStore = require('../')(session);

describe('Cloud Datastore Store', function () {
  before(function () {
    assert(process.env.GCLOUD_PROJECT, 'GCLOUD_PROJECT env var required to run the tests.');
    assert(process.env.GOOGLE_APPLICATION_CREDENTIALS, 'GOOGLE_APPLICATION_CREDENTIALS env var required to run the tests.');
  });

  var store = new DatastoreStore({
    dataset: require('@google-cloud/datastore')()
  });

  it('Should return an empty session', function (done) {
    store.get('123', function (err, session) {
      assert.ifError(err);
      assert.equal(session, undefined);
      done();
    });
  });

  it('Should create and retrieve a session', function (done) {
    store.set('123', { foo: 'bar' }, function (err) {
      assert.ifError(err);
      store.get('123', function (err, session) {
        assert.ifError(err);
        assert.deepEqual(session, { foo: 'bar' });
        done();
      });
    });
  });

  it('Should destroy a session', function (done) {
    store.destroy('123', function (err) {
      assert.ifError(err);
      assert.equal(err, undefined);
      store.get('123', function (err, session) {
        assert.ifError(err);
        assert.equal(session, undefined);
        done();
      });
    });
  });
});
