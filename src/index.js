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

var util = require('util');
var noop = function () {};

module.exports = function (session) {
  var Store = session.Store;

  function DatastoreStore (options) {
    options = options || {};
    Store.call(this, options);
    this.ds = options.dataset || options.datastore;
    if (!this.ds) {
      throw new Error('No dataset provided to Datastore Session.');
    }
  }

  util.inherits(DatastoreStore, Store);

  DatastoreStore.prototype.get = function (sid, callback) {
    this.ds.get(this.ds.key(['Session', sid]), function (err, entity) {
      if (err) {
        return callback(err);
      }
      if (!entity) {
        return callback();
      }

      var result;
      try {
        result = JSON.parse(entity.data);
      } catch (er) {
        return callback(er);
      }
      return callback(null, result);
    });
  };

  DatastoreStore.prototype.set = function (sid, sess, callback) {
    callback = callback || noop;
    var sessJson;

    try {
      sessJson = JSON.stringify(sess);
    } catch (err) {
      return callback(err);
    }

    this.ds.save({
      key: this.ds.key(['Session', sid]),
      data: [{
        name: 'data',
        value: sessJson,
        excludeFromIndexes: true
      }]
    }, callback);
  };

  DatastoreStore.prototype.destroy = function (sid, fn) {
    this.ds.delete(this.ds.key(['Session', sid]), fn);
  };

  return DatastoreStore;
};
