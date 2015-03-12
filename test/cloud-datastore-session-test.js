"use strict";

var assert = require('assert');
var session = require('express-session');
var DatastoreStore = require('../')(session);


describe('Cloud Datastore Store', function(){
  var dataset = {
    data: {},
    key: function(path){
      return path;
    },
    get: function(key, cb){
      cb(null, {data: this.data[key.pop()]});
    },
    save: function(entity, cb){
      this.data[entity.key.pop()] = {data: entity.data[0].value};
      cb(null);
    },
    delete: function(key, cb){
      delete this.data[key.pop()];
      cb(null);
    }
  };

  var store = new DatastoreStore({dataset: dataset});

  it("Should return an empty session", function(done){
    store.get('123', function(err, session){
      assert.equal(session, undefined);
      done();
    });
  });
  it("Should create and retrive a session", function(done){
    store.set('123', {foo: 'bar'}, function(err){
      assert.equal(err, undefined);
      store.get('123', function(err, session){
        assert.deepEqual(session, {foo: 'bar'});
        done();
      });
    });
  });
  it("Should destroy a session", function(done){
    store.destroy('123', function(err){
      assert.equal(err, undefined);
      store.get('123', function(err, session){
        assert.equal(session, undefined);
        done();
      });
    });
  });
});
