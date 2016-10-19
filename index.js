'use strict' 
var request = require('request');
var Reflect = require('harmony-reflect');

module.exports = function(apiKey) {
  let mobizonObj = {
    apiKey: apiKey
  }
  let mobizonProxy = new Proxy(mobizonObj, mobizonProxyHandler);
  return mobizonProxy;
}

let mobizonProxyHandler = {
  get: function(target, apiModule) {
    let mobizonModuleObj = {
      apiKey: target.apiKey,
      apiModule: apiModule
    };
    let mobizonModuleProxy = new Proxy(mobizonModuleObj, mobizonModuleProxyHandler);
    return mobizonModuleProxy;
  }
}

let mobizonModuleProxyHandler = {
  get: function(target, apiMethod) {
    let mobizonMethod = function(queryString, callbackFunction){
      if (!queryString) {
        queryString = {};
      }

      let testBaseUrl = false;
      if (queryString.testBaseUrl) {
        testBaseUrl = queryString.testBaseUrl;
        delete queryString["testBaseUrl"];
      }

      let isJsonQuery = !(queryString.output && queryString.output != 'json') // mobizon support XML too, but by default mobizon use JSON

      queryString.apiKey = target.apiKey;

      let request_options = {
        baseUrl: testBaseUrl || 'https://api.mobizon.com/service/',
        url: target.apiModule + '/' + apiMethod,
        followRedirect: false,
        json: isJsonQuery,
        qs: queryString
      };
      request(request_options, function (requestError, requestResponse, requestBody) {
        if (callbackFunction) {
          let error = null;
          let data = null;

          if (requestError || requestResponse.statusCode != 200) {
            error = {
              code: 999,
              message: 'Не удалось установить связь с сервером'
            }
          }
          else if (!isJsonQuery) {
            data = requestBody;
          }
          else if (requestBody.code != 0) {
            error = {
              code: requestBody.code,
              message: requestBody.message,
              data: requestBody.data
            }
          }
          else if (requestBody.code == 0) {
            data = requestBody.data;
          }
          else {
            error = {
              code: 500,
              message: 'Неизвестная ошибка приложения'
            }
          }

          callbackFunction(error, data);
        }
      })
    }
    return mobizonMethod;
  }
}
