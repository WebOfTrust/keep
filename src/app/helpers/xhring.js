const m = require('mithril');

class xhring {
  static exnRequest(body) {
    return m
      .request({
        method: 'POST',
        url: 'http://localhost:5623/credential/issue',
        body: body,
      })
      .catch(function (e) {
        console.log('gaccRequest error: ', e);
      });
  }

  static agentPost(date, attachment, body) {
    return m
      .request({
        method: 'POST',
        url: 'http://localhost:5623/exn/cmd/credential/issue',
        headers: {
          'CESR-DATE': date,
          'CESR-ATTACHMENT': attachment,
          'Content-Type': 'application/cesr+json',
        },
        body: body,
      })
      .catch(function (e) {
        console.log('agentPost error: ', e);
      });
  }
}

module.exports = xhring;
