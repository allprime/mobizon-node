var request = require('request');
var Reflect = require('harmony-reflect');

module.exports = function(apiKey) {
  mobizonObj = {
    apiKey: apiKey
  }
  mobizonProxy = new Proxy(mobizonObj, mobizonProxyHandler);
  return mobizonProxy;
}

mobizonProxyHandler = {
  get: function(target, apiModule) {
    mobizonModuleObj = {
      apiKey: target.apiKey,
      apiModule: apiModule
    };
    mobizonModuleProxy = new Proxy(mobizonModuleObj, mobizonModuleProxyHandler);
    return mobizonModuleProxy;
  }
}

mobizonModuleProxyHandler = {
  get: function(target, apiMethod) {
    mobizonRequest = function(queryString, callbackFunction){
      if (!queryString) {
        queryString = {};
      }
      isJsonQuery = !(queryString.output && queryString.output != 'json') // mobizon support XML too, but by default mobizon use JSON
      queryString.apiKey = target.apiKey;
      var request_options = {
        baseUrl: 'https://api.mobizon.com/service/',
        url: target.apiModule + '/' + apiMethod,
        followRedirect: false,
        json: isJsonQuery,
        qs: queryString
      };
      request(request_options, function (error, response, body) {
        if (callbackFunction) {
          callbackFunction(error, body);
        }
      })
    }
    return mobizonRequest;
  }
}
