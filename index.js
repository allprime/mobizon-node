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
    mobizonMethod = function(queryString, callbackFunction){
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
      request(request_options, function (requestError, requestResponse, requestBody) {
        if (callbackFunction) {
          if (requestError || requestResponse.statusCode != 200) {
            error = {
              code: 999,
              message: 'No network connection or cannot reach the server'
            }
            callbackFunction(error, null);
          }
          else if (!isJsonQuery) {
            callbackFunction(null, requestBody)
          }
          else if (requestBody.code != 0) {
            error = {
              code: requestBody.code,
              message: requestBody.message,
              data: requestBody.data
            }
            callbackFunction(error, null);
          }
          else if (requestBody.code == 0) {
            callbackFunction(null, requestBody.data)
          }
          else {
            error = {
              code: 500,
              message: 'Неизвестная ошибка приложения'
            }
            callbackFunction(error, null)
          }
        }
      })
    }
    return mobizonMethod;
  }
}
