const m = require('mithril');

class Keep {
  static getName() {
    if (process.env.USER_TYPE === 'person') return process.env.USER_TYPE;
    else return `keep-${process.env.USER_TYPE}-${process.env.API_PORT}`;
  }
}

module.exports = Keep;
