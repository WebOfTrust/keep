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

  static resolveOOBI(alias, oobialias, url) {
    return m.request({
      method: 'POST',
      url: `${process.env.API_HOST}:${this.port}/oobi/${alias}`,
      body: {
        oobialias,
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

  static signChallengeMessage(alias, recipient, words) {
    return m.request({
      method: 'POST',
      url: `${process.env.API_HOST}:${this.port}/challenge/${alias}`,
      body: {
        recipient,
        words,
      },
    });
  }

  // CONTACTS

  static getContacts() {
    return m.request({
      method: 'GET',
      url: `${process.env.API_HOST}:${this.port}/contacts`,
    });
  }

  static getContactsByAliases(aliases) {
    let valueParams = aliases
      .map((alias) => {
        return `&filter_value=${alias}`;
      })
      .join('');
    return m.request({
      method: 'GET',
      url: `${process.env.API_HOST}:${this.port}/contacts?filter_field=alias${valueParams}`,
    });
  }

  static getContact(prefix) {
    return m.request({
      method: 'GET',
      url: `${process.env.API_HOST}:${this.port}/contacts/${prefix}`,
    });
  }
}

module.exports = KERI;
