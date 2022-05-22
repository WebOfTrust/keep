import m from 'mithril';

class KERI {
  static keriURL = `${process.env.API_HOST}:${process.env.API_PORT}`;

  // CODES

  static generatePasscode() {
    return m.request({
      method: 'GET',
      url: `${this.keriURL}/codes`,
    });
  }

  // BOOT

  static status(name) {
    return m.request({
      method: 'GET',
      url: `${this.keriURL}/boot/${name}`,
    });
  }

  static initializeAgent(name, passcode) {
    return m.request({
      method: 'POST',
      url: `${this.keriURL}/boot`,
      body: {
        name,
        passcode,
      },
    });
  }

  static unlockAgent(name, passcode) {
    return m.request({
      method: 'PUT',
      url: `${this.keriURL}/boot`,
      body: {
        name,
        passcode,
      },
    });
  }

  // LOCK

  static lockAgent() {
    return m.request({
      method: 'GET',
      url: `${this.keriURL}/lock`,
    });
  }

  // IDENTIFIERS

  static createIdentifier(alias, witnesses) {
    return m.request({
      method: 'POST',
      url: `${this.keriURL}/ids/${alias}`,
      body: {
        wits: witnesses,
      },
    });
  }

  static updateIdentifier(alias, body) {
    return m.request({
      method: 'PUT',
      url: `${this.keriURL}/ids/${alias}`,
      body: body,
    });
  }

  static listIdentifiers() {
    return m.request({
      method: 'GET',
      url: `${this.keriURL}/ids`,
    });
  }

  // OOBI

  static getOOBI(alias, role) {
    return m.request({
      method: 'GET',
      url: `${this.keriURL}/oobi/${alias}`,
      params: {
        role,
      },
    });
  }

  static resolveOOBI(alias, oobialias, url) {
    return m.request({
      method: 'POST',
      url: `${this.keriURL}/oobi/${alias}`,
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
      url: `${this.keriURL}/challenge`,
    });
  }

  static signChallengeMessage(alias, recipient, words) {
    return m.request({
      method: 'POST',
      url: `${this.keriURL}/challenge/${alias}`,
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
      url: `${this.keriURL}/contacts`,
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
      url: `${this.keriURL}/contacts?filter_field=alias${valueParams}`,
    });
  }

  static getContact(prefix) {
    return m.request({
      method: 'GET',
      url: `${this.keriURL}/contacts/${prefix}`,
    });
  }

  static getEscrowsForIdentifier(prefix) {
    return m.request({
      method: 'GET',
      url: `${this.keriURL}/escrows?pre=${prefix}`,
    });
  }

  static updateContact(alias, aid, body) {
    return m.request({
      method: 'PUT',
      url: `${this.keriURL}/contacts/${aid}/${alias}`,
      body: body,
    });
  }

  // GROUPS

  static initiateGroupInception(alias, { aids, isith, nsith, toad, wits, delpre }) {
    return m.request({
      method: 'POST',
      url: `${this.keriURL}/groups/${alias}/icp`,
      body: {
        aids,
        isith,
        nsith,
        toad,
        wits,
        delpre,
      },
    });
  }

  static participateGroupInception(alias, { aids, isith, nsith, toad, wits, delpre }) {
    return m.request({
      method: 'PUT',
      url: `${this.keriURL}/groups/${alias}/icp`,
      body: {
        aids,
        isith,
        nsith,
        toad,
        wits,
        delpre,
      },
    });
  }

  // ISSUE

  static issueCredential(alias, { credentialData, recipient, registry, schema, source }) {
    return m.request({
      method: 'POST',
      url: `${this.keriURL}/credentials/${alias}`,
      body: {
        credentialData,
        recipient,
        registry,
        schema,
        source,
      },
    });
  }
}

module.exports = KERI;
