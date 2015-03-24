[![Build Status](https://snap-ci.com/rafbgarcia/angular-parse-wrapper/branch/master/build_image)](https://snap-ci.com/rafbgarcia/angular-parse-wrapper/branch/master)

Parse Mock
=====================

A collection of stubs to ease unit-testing of Parse.js based applications.


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
    var stub = Parse.Mock.stubRequest(function (options) {
      return [new Parse.Object('User', {name: 'Antony'})]
    });

    expect(getUser()).toBeUndefined();
    loadUser(); //invoke function that initiates a request to parse and returns
    expect(getUser().name).toBeDefined(0);
    Abuse.loadReportedPosts();
    expect(stub.callCount).toEqual(1); //do assertions on stub object
  }));

  afterEach(inject(function () {
    Parse.Mock.clearStubs(); //manually restore stubs
  }));


});


```