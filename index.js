'use strict';


var util = require('util');
var noop = function(){};


module.exports = function(session){
  var Store = session.Store;

  function DatastoreStore(options){
    options = options || {};
    Store.call(this, options);
    this.ds = options.dataset;
    if(!this.ds) throw new Error("No dataset provided to Datastore Session.");
  }

  util.inherits(DatastoreStore, Store);

  DatastoreStore.prototype.get = function(sid, fn){
    this.ds.get(this.ds.key(['Session', sid]), function(err, entity){
      if(err) return fn(err);
      if(!entity) return fn();

      var result;
      try {
        result = JSON.parse(entity.data.data);
      }
      catch (er) {
        return fn(er);
      }
      return fn(null, result);
    });
  };

  DatastoreStore.prototype.set = function(sid, sess, fn){
    fn = fn || noop;
    var jsonsess;

    try{
      jsonsess = JSON.stringify(sess);
    } catch(err){
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

  DatastoreStore.prototype.destroy = function(sid, fn){
    this.ds.delete(this.ds.key(['Session', sid]), fn);
  };

  return DatastoreStore;
};
