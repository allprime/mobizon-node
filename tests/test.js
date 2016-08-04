const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const assert = require('assert');


const mobizon = require('../index')('randomrandomrandom');
const nock = require('nock');

nock('https://api.mobizon.com/').persist().get(/.*/).reply(200, function(uri, requestBody) {
  let uriObject = url.parse(uri);
  let filepath = __dirname + '/mock';
      filepath += uriObject.pathname.toLowerCase() + '/';
      filepath += qs.parse(uriObject.query).mockReplyCode + '.json';
  return fs.readFileSync(filepath);
});

describe('Request to mobizon server', function() {
  describe('have callbackFunction(error, data)', function() {

    it("where error = null if apiCode == 0", function (done) {
      mobizon.message.getsmsstatus({ids:6300284, mockReplyCode: 0}, function(error, data){
        assert.equal(error, null);
        done();
      })
    });

    it("where data = Object if apiCode == 0", function (done) {
      mobizon.link.create({data: {fullLink: 'https://google.com'}, mockReplyCode: 0}, function(error, data){
        assert.notEqual(data, null);
        done();
      })
    });

    it("where error = Object if apiCode != 0", function (done) {
      mobizon.message.sendSMSMessage({recipient: '+77770000000', text: 'Success', mockReplyCode: 4}, function(error, data){
        assert.notEqual(error, null);
        done();
      })
    });

    it("where data = null if apiCode != 0", function (done) {
      mobizon.User.getOwnBalance({mockReplyCode: 8}, function(error, data){
        assert.equal(data, null);
        done();
      })
    });
  });
});
