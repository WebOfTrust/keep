const m = require('mithril');

class Keep {
  static isPackaged() {
    return (
      typeof navigator === 'object' &&
      typeof navigator.userAgent === 'string' &&
      navigator.userAgent.indexOf('Electron') >= 0
    );
  }

  static getName() {
    return `keep-${process.env.USER_TYPE}-${process.env.API_PORT}`;
  }

  static check() {
    return m.request({
      method: 'GET',
      url: 'http://localhost:8765/keep',
    });
  }
}

module.exports = Keep;
