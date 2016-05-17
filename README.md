[![Build Status](https://snap-ci.com/rafbgarcia/angular-parse-wrapper/branch/master/build_image)](https://snap-ci.com/rafbgarcia/angular-parse-wrapper/branch/master)

Parse Mock
=====================

## Important notice

This repo is not maintained. Please use any of these instead:

 - https://github.com/thedistricts/parse-mockdb
 - https://github.com/HustleInc/parse-mockdb
 
A collection of stubs to ease unit-testing of Parse.com services.

- Seamless Parse integration. New Mock Object
- Use with any testing framework
- Only sinon as a dependency

Brought to you by the [DashBouquet](http://dashbouquet.com) team.


## Installation

```
npm install parse-mock --save-dev
```

## Usage

```
//karma.conf.js

module.exports = function (config) {
  'use strict';
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'sinon'],
    files: [
      'your/app/build.js',
      'src/vendor/parse-mock.js',
      'your/app/**/*.spec.js'
    ],
    browsers: ['Chrome']
  });
};
```


```
//sample.spec.js
describe('My parsejs app', function () {

  it('should load some data from parse', function () {
    var stub = Parse.Mock.stubQueryFind(function (options) {
      return [new Parse.Object('User', {name: 'Antony'})]
    });

    expect(getUser()).toBeUndefined();

    loadUser(); //function that invokes Query.find

    expect(getUser()).toBeDefined();
    expect(stub.callCount).toEqual(1); //do assertions on stub object if necessary
  }));

  afterEach(inject(function () {
    Parse.Mock.clearStubs(); //manually dispose of stubs
  }));


});


```
