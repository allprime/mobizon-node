var request = require('request');
var Reflect = require('harmony-reflect');

module.exports = function(apiKey) {
  mobizonObj = {
    apiKey: apiKey
  }
  mobizonProxy = new Proxy(mobizonObj, {
    get(target, apiModule) {
      mobizonModuleObj = {
        apiKey: target.apiKey,
        apiModule: apiModule
      };
      mobizonModuleProxy = new Proxy(mobizonModuleObj, {
        get(target, apiMethod) {
          mobizonRequest = function(queryString, callbackFunction){
            if (!queryString) {
              queryString = {}
            }
            queryString.apiKey = target.apiKey;
            var request_options = {
              baseUrl: 'https://api.mobizon.com/service/',
              url: target.apiModule + '/' + apiMethod,
              followRedirect: false,
              json: true,
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
      })
      return mobizonModuleProxy;
    }
  })
  return mobizonProxy;
}
