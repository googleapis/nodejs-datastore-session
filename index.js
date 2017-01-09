/*
Copyright 2015 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

'use strict';


var util = require('util');
var noop = function() {};


module.exports = function(session) {
  var Store = session.Store;

  function DatastoreStore(options) {
    options = options || {};
    Store.call(this, options);
    this.ds = options.dataset || options.datastore;
    if (!this.ds) throw new Error("No dataset provided to Datastore Session.");
  }

  util.inherits(DatastoreStore, Store);

  DatastoreStore.prototype.get = function(sid, fn) {
    this.ds.get(this.ds.key(['Session', sid]), function(err, entity) {
      if (err) return fn(err);
      if (!entity) return fn();

      var result;
      try {
        result = JSON.parse(entity.data.data);
      } catch (er) {
        return fn(er);
      }
      return fn(null, result);
    });
  };

  DatastoreStore.prototype.set = function(sid, sess, fn) {
    fn = fn || noop;
    var jsonsess;

    try {
      jsonsess = JSON.stringify(sess);
    } catch (err) {
      return fn(err);
    }

    this.ds.save({
      key: this.ds.key(['Session', sid]),
      data: [{
        name: 'data',
        value: jsonsess,
        excludeFromIndexes: true
      }]
    }, fn);
  };

  DatastoreStore.prototype.destroy = function(sid, fn) {
    this.ds.delete(this.ds.key(['Session', sid]), fn);
  };

  return DatastoreStore;
};
