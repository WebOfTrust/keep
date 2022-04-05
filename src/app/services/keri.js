import m from 'mithril';

class KERI {
  static port = process.env.API_PORT;

  // CODES

  static generatePasscode() {
    return m.request({
      method: 'GET',
      url: `${process.env.API_HOST}:${this.port}/codes`,
    });
  }

  // BOOT

  static initializeAgent(name, passcode) {
    return m.request({
      method: 'POST',
      url: `${process.env.API_HOST}:${this.port}/boot`,
      body: {
        name,
        passcode,
      },
    });
  }

  static unlockAgent(name, passcode) {
    return m.request({
      method: 'PUT',
      url: `${process.env.API_HOST}:${this.port}/boot`,
      body: {
        name,
        passcode,
      },
    });
  }

  // IDENTIFIERS

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

  // OOBI

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

  // CHALLENGE/RESPONSE

  static generateChallengeMessage() {
    return m.request({
      method: 'GET',
      url: `${process.env.API_HOST}:${this.port}/challenge`,
    });
  }

  static signChallengeMessage(alias, words) {
    return m.request({
      method: 'POST',
      url: `${process.env.API_HOST}:${this.port}/challenge/${alias}`,
      body: {
        recipient: 'EA_rorjo4GvyObfp3D8dR_4lNmJ3tPYl5m0bRRQIaFLE', // TODO
        words,
      },
    });
  }
}

module.exports = KERI;
