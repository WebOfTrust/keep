import m from 'mithril';
import API from './api';

class KERI {
  static port = process.env.API_PORT;

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
      url: `${process.env.API_HOST}:${this.port}/ids/${alias}`,
      body: {
        wits: witnesses,
      },
    });
  }

  static listIdentifiers() {
    return m.request({
      method: 'GET',
      url: `${process.env.API_HOST}:${this.port}/ids`,
    });
  }

  static getOOBI(alias, role) {
    return m.request({
      method: 'GET',
      url: `${process.env.API_HOST}:${this.port}/oobi/${alias}`,
      params: {
        role,
      },
    });
  }

  static resolveOOBI(alias, url) {
    return m.request({
      method: 'POST',
      url: `${process.env.API_HOST}:${this.port}/oobi/${alias}`,
      body: {
        url,
      },
    });
  }

  static generateChallengeMessage(alias) {
    return m.request({
      method: 'GET',
      url: `${process.env.API_HOST}:${this.port}/challenge/${alias}`,
    });
  }
}

module.exports = KERI;
