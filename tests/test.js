const fs = require('fs');
const url = require('url');
const qs = require('querystring');

const mobizon = require('../index')('3790b95f03adc37c16a86cafd1f1108deca90bef');
const nock = require('nock');

nock('https://api.mobizon.com/').get(/./).reply(200, function(uri, requestBody) {
  let uriObject = url.parse(uri);
  let filepath = __dirname + '/mock';
      filepath += uriObject.pathname.toLowerCase() + '/';
      filepath += qs.parse(uriObject.query).mockReplyCode + '.json';

  return fs.readFileSync(filepath);
});


mobizon.message.getsmsstatus({ids:6300284}, function(error, data){
  console.log(error, data);
})
