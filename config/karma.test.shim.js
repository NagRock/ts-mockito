Error.stackTraceLimit = Infinity;

require('core-js/es6');

require('ts-helpers');

var appContext = require.context('./../test', true, /^((?!e2e).)*spec/);
appContext.keys().forEach(appContext);
