import m from 'mithril';

class KERI {
  // CODES

  static generatePasscode() {
    return m.request({
      method: 'GET',
      url: `${process.env.API_HOST}:${process.env.API_PORT}/codes`,
    });
  }

  // BOOT

  static initializeAgent(name, passcode) {
    return m.request({
      method: 'POST',
      url: `${process.env.API_HOST}:${process.env.API_PORT}/boot`,
      body: {
        name,
        passcode,
      },
    });
  }

  static unlockAgent(name, passcode) {
    return m.request({
      method: 'PUT',
      url: `${process.env.API_HOST}:${process.env.API_PORT}/boot`,
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
      url: `${process.env.API_HOST}:${process.env.API_PORT}/ids/${alias}`,
      body: {
        wits: witnesses,
      },
    });
  }

  static listIdentifiers() {
    return m.request({
      method: 'GET',
      url: `${process.env.API_HOST}:${process.env.API_PORT}/ids`,
    });
  }

  // OOBI

  static getOOBI(alias, role) {
    return m.request({
      method: 'GET',
      url: `${process.env.API_HOST}:${process.env.API_PORT}/oobi/${alias}`,
      params: {
        role,
      },
    });
  }

  static resolveOOBI(alias, oobialias, url) {
    return m.request({
      method: 'POST',
      url: `${process.env.API_HOST}:${process.env.API_PORT}/oobi/${alias}`,
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
      url: `${process.env.API_HOST}:${process.env.API_PORT}/challenge`,
    });
  }

  static signChallengeMessage(alias, recipient, words) {
    return m.request({
      method: 'POST',
      url: `${process.env.API_HOST}:${process.env.API_PORT}/challenge/${alias}`,
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
      url: `${process.env.API_HOST}:${process.env.API_PORT}/contacts`,
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
      url: `${process.env.API_HOST}:${process.env.API_PORT}/contacts?filter_field=alias${valueParams}`,
    });
  }

  static getContact(prefix) {
    return m.request({
      method: 'GET',
      url: `${process.env.API_HOST}:${process.env.API_PORT}/contacts/${prefix}`,
    });
  }

  static updateContact(alias, aid, body) {
    return m.request({
      method: 'PUT',
      url: `${process.env.API_HOST}:${process.env.API_PORT}/contacts/${aid}/${alias}`,
      body: body,
    });
  }


  // GROUPS

  static initiateGroupInception(alias, { aids, isith, nsith, toad, wits }) {
    return m.request({
      method: 'POST',
      url: `${process.env.API_HOST}:${process.env.API_PORT}/groups/${alias}/icp`,
      body: {
        aids,
        isith,
        nsith,
        toad,
        wits,
      },
    });
  }

  static participateGroupInception(alias, { aids, isith, nsith, toad, wits }) {
    return m.request({
      method: 'PUT',
      url: `${process.env.API_HOST}:${process.env.API_PORT}/groups/${alias}/icp`,
      body: {
        aids,
        isith,
        nsith,
        toad,
        wits,
      },
    });
  }
}

module.exports = KERI;
