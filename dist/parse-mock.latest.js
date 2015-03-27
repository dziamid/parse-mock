(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null),
  sinon = (typeof window !== "undefined" ? window.sinon : typeof global !== "undefined" ? global.sinon : null),
  Parse = (typeof window !== "undefined" ? window.Parse : typeof global !== "undefined" ? global.Parse : null),

  lastObjectId = 1,
  registeredStubs = [],

  stubMethods;

if (typeof Parse.Parse != 'undefined') {
  Parse = Parse.Parse;
}

stubMethods = {
  stubRequest: [Parse, '_request'],
  stubCollectionFetch: [Parse.Collection.prototype, 'fetch'],
  stubConfigGet: [Parse.Config, 'get'],
  stubQueryFind: [Parse.Query.prototype, 'find'],
  stubQueryFirst: [Parse.Query.prototype, 'first'],
  stubQueryGet: [Parse.Query.prototype, 'get'],
  stubQueryCount: [Parse.Query.prototype, 'count'],
  stubObjectSave: [Parse.Object.prototype, 'save'],
  stubObjectFetch: [Parse.Object.prototype, 'fetch'],
  stubObjectDestroy: [Parse.Object.prototype, 'destroy']
};

for (var key in stubMethods) {
  var object = stubMethods[key][0],
    methodName = stubMethods[key][1];

  (function (object, methodName) {
    stubMethods[key] = function (cb) {
      return registerStub(sinon.stub(object, methodName, function (options) {
        var promise = new Parse.Promise()._thenRunCallbacks(options),
          data = cb.call(this, queryToJSON(this));

        if (data) {
          data = addDefaultFields(data);
        }

        promise.resolve(data);

        console.log('stub resolved');

        return promise;
      }));

    };
  })(object, methodName);

}

Parse.Mock = _.extend(stubMethods, {
  clearStubs: clearStubs
});

module.exports = Parse.Mock;

function registerStub(stub) {
  registeredStubs.push(stub);

  return stub;
}

function clearStubs() {
  registeredStubs.forEach(function (stub) {
    stub.restore();
  })

}

function queryToJSON(query) {
  return _.extend(query.toJSON(), {
    className: query.className
  });
}

/**
 * Extends object tree with server-genereated fields
 *
 * @param data Array|Parse.Object
 * @returns {*}
 */

function addDefaultFields(data) {
  if (Array.isArray(data)) {
    return _.map(data, function (d) {
      return addDefaultFields(d);
    })
  }

  //todo: loop if array passed
  //todo: walk model recursively
  //todo: don't override if exists

  return _.extend(data, {
    id: lastObjectId++,
    createdAt: new Date(),
    updatedAt: new Date()
  });
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
