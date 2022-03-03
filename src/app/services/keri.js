import m from 'mithril';
import API from './api';

class KERI {
  static generatePasscode() {
    return API.Code.read();
  }

  static initializeAgent(name, passcode) {
    return API.Boot.create({
      name,
      passcode,
    });
  }

  static unlockAgent(name, passcode) {
    return API.Boot.update({
      name,
      passcode,
    });
  }

  static createIdentifier(alias, witnesses) {
    return m.request({
      method: 'POST',
      url: `${process.env.API_HOST}/ids/${alias}`,
      body: {
        wits: witnesses,
      },
    });
  }

  static listIdentifiers() {
    return m.request({
      method: 'GET',
      url: `${process.env.API_HOST}/ids`,
    });
  }

  static getOOBI(alias, role) {
    return m.request({
      method: 'GET',
      url: `${process.env.API_HOST}/oobi/${alias}`,
      params: {
        role,
      },
    });
  }

  static resolveOOBI(alias, rpy, url) {
    // body should contain rpy and url
    return m.request({
      method: 'POST',
      url: `${process.env.API_HOST}/oobi/${alias}`,
      body: {
        rpy,
        url,
      },
    });
  }
}

module.exports = KERI;
