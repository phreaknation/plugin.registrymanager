(function() {
  'use strict';

  window.ajv = new Ajv();
  var _ = window._ || function() {};

  if (_.isUndefined === undefined) {
    _.isUndefined = function(o) {
      return o === undefined;
    };
  }

  if (_.isUndefined(_.isArray)) {
    _.isArray = function(a) {
      return Object.prototype.toString.call(a) === '[object Array]';
    };
  }

  if (_.isUndefined(_.isBoolean)) {
    _.isBoolean = function(b) {
      return typeof b === 'boolean';
    };
  }

  if (_.isUndefined(_.isNumber)) {
    _.isNumber = function(n) {
      return (typeof n === 'number' || n instanceof Number);
    };
  }

  if (_.isUndefined(_.isObject)) {
    _.isObject = function(o) {
      return (typeof o === 'object' || o !== null);
    };
  }

  if (_.isUndefined(_.isString)) {
    _.isString = function(s) {
      return (typeof s === 'string' || s instanceof String);
    };
  }

  if (_.isUndefined(_.format)) {
    _.format = function(str, opts) {
      if (_.isString(str) && _.isPlainObject(opts)) {
        var rep = str.replace(/(\{(\w+)\})/g, function() {
          return opts[arguments[2]];
        });
        return rep;
      }
      return false;
    };
  }

  if (_.isUndefined(_.validateStructure)) {
    _.validateStructure = function(obj, struct) {
      var tmp = obj;

      if (_.isObject(obj)) {
        for (var key in obj) {
          var value = obj[key];
          console.log('%s: %s', key, value);
        }
      }

      return true;
    };
  }

  if (_.isUndefined(_.callURL)) {
    _.callURL = function() {
      var request = new XMLHttpRequest();
      var sendData = null;
      var args = arguments[0];
      var methods = {
        GET: 0,
        POST: 1,
      };

      if (!_.isString(args.URL) || !_.isString(args.callback)) {
      }

      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          if (_.isFunction(args.callback))
            args.callback(request.responseText, request.status);
        } else {
          if (_.isFunction(args.errorCallback))
            args.errorCallback(request.status, request);
        }
      };

      request.onerror = function() {
        if (_.isFunction(args.errorCallback))
          args.errorCallback(args);
      };

      if (args.method === methods.POST || _.toUpper(args.method) == Object.keys(1)) {
        request.open('POST', args.URL, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        if (_.isString(args.data))
          sendData = args.data;
      } else {
        if (_.isString(args.data))
          args.URL += '?data=' + args.data;
        request.open('GET', args.URL, true);
      }
      request.send(sendData);
    };
  }

  window._ = _;

})();