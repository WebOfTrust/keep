const m = require('mithril');

class WellKnown {
  static getExternalDelegator() {
    return m.request({
      method: 'GET',
      url: 'http://localhost:3000/root',
    });
  }

  static getQARDelegator() {
    return m.request({
      method: 'GET',
      url: 'http://localhost:3000/external',
    });
  }
}

module.exports = WellKnown;
