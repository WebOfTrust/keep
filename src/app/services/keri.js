import m from 'mithril';

class KERI {
  static keriURL = `${process.env.API_ENDPOINT}`;

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
      method: 'POST',
      url: `${this.keriURL}/lock`,
    });
  }

  static resetPasscode(current, passcode) {
    return m.request({
      method: 'POST',
      url: `${this.keriURL}/codes`,
      body: {
        current,
        passcode,
      },
    });
  }

  // IDENTIFIERS

  static createIdentifier(alias, wits, toad, estOnly, DnD) {
    return m.request({
      method: 'POST',
      url: `${this.keriURL}/ids/${alias}`,
      body: {
        wits,
        toad,
        estOnly,
        DnD,
      },
    });
  }

  static updateIdentifierMetadata(alias, body) {
    return m.request({
      method: 'PUT',
      url: `${this.keriURL}/ids/${alias}/metadata`,
      body: body,
    });
  }

  static replaceIdentifierMetadata(alias, body) {
    return m.request({
      method: 'POST',
      url: `${this.keriURL}/ids/${alias}/metadata`,
      body: body,
    });
  }

  static rotateIdentifier(alias, wits, toad) {
    return m.request({
      method: 'PUT',
      url: `${this.keriURL}/ids/${alias}/rot`,
      body: {
        wits,
        toad,
      },
    });
  }

  static listIdentifiers() {
    return m.request({
      method: 'GET',
      url: `${this.keriURL}/ids`,
    });
  }

  static findEvent(pubkey) {
    return m.request({
      method: 'GET',
      url: `${this.keriURL}/keystate/pubkey/${pubkey}`,
    });
  }

  static listCredentials(alias, type) {
    return m.request({
      method: 'GET',
      url: `${this.keriURL}/credentials/${alias}?type=${type}`,
    });
  }

  static listSchema() {
    return m.request({
      method: 'GET',
      url: `${this.keriURL}/schema`,
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

  static resolveOOBI(oobialias, url) {
    return m.request({
      method: 'POST',
      url: `${this.keriURL}/oobi`,
      body: {
        oobialias,
        url,
      },
    });
  }

  static sendOOBIs(alias, oobis) {
    let body = oobis.map((oobi) => {
      return oobi.url + '?name=' + oobi.alias;
    });
    return m.request({
      method: 'POST',
      url: `${this.keriURL}/oobi/groups/${alias}/share`,
      body: { oobis: body },
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

  static acceptChallengeMessage(alias, body) {
    return m.request({
      method: 'POST',
      url: `${this.keriURL}/challenge/accept/${alias}`,
      body: body,
    });
  }

  // NOTIFICATIONS
  static getNotifications() {
    return m.request({
      method: 'GET',
      url: `${this.keriURL}/notifications`,
    });
  }

  static deleteNotification(rid) {
    return m.request({
      method: 'DELETE',
      url: `${this.keriURL}/notifications/${rid}`,
    });
  }

  static putNotification(rid) {
    return m
      .request({
        method: 'PUT',
        url: `${this.keriURL}/notifications/${rid}`,
      })
      .catch((e) => {});
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

  static getContactsFiltered(filters = {}) {
    let filterParams = Object.keys(filters)
      .map((filterKey, index) => {
        return `${index !== 0 ? '&' : ''}filter_field=${filterKey}&filter_value=${filters[filterKey]}`;
      })
      .join('');
    return m.request({
      method: 'GET',
      url: `${this.keriURL}/contacts?${filterParams}`,
    });
  }

  static getContactsGrouped(groupBy, filters = {}) {
    let filterParams = Object.keys(filters)
      .map((filterKey, index) => {
        return `${index !== 0 ? '&' : ''}filter_field=${filterKey}&filter_value=${filters[filterKey]}`;
      })
      .join('');
    let groupParam = `&group=${groupBy}`;
    return m.request({
      method: 'GET',
      url: `${this.keriURL}/contacts?${filterParams}${groupParam}`,
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

  static getKeyStateForIdentifier(prefix) {
    return m.request({
      method: 'GET',
      url: `${this.keriURL}/keystate/${prefix}`,
    });
  }

  static getEvent(prefix, said) {
    return m.request({
      method: 'GET',
      url: `${this.keriURL}/escrows/${prefix}/${said}`,
    });
  }

  static updateContact(aid, body) {
    return m.request({
      method: 'PUT',
      url: `${this.keriURL}/contacts/${aid}`,
      body: body,
    });
  }

  static overwriteContact(aid, body) {
    return m.request({
      method: 'POST',
      url: `${this.keriURL}/contacts/${aid}`,
      body: body,
    });
  }

  // GROUPS

  static initiateGroupInception(alias, { aids, isith, nsith, toad, wits, delpre, estOnly }) {
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
        estOnly,
      },
    });
  }

  static participateGroupInception(alias, { aids, isith, nsith, toad, wits, delpre, estOnly }) {
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
        estOnly,
      },
    });
  }

  static initiateGroupRotation(alias, { aids, wits, toad, isith, data }) {
    return m.request({
      method: 'POST',
      url: `${this.keriURL}/groups/${alias}/rot`,
      body: {
        aids,
        wits,
        toad,
        isith,
        data,
      },
    });
  }

  static participateGroupRotation(alias, { aids, wits, toad, isith, data }) {
    return m.request({
      method: 'PUT',
      url: `${this.keriURL}/groups/${alias}/rot`,
      body: {
        aids,
        wits,
        toad,
        isith,
        data,
      },
    });
  }

  static initiateGroupInteraction(alias, { aids, data }) {
    return m.request({
      method: 'POST',
      url: `${this.keriURL}/groups/${alias}/ixn`,
      body: {
        aids,
        data,
      },
    });
  }

  static participateGroupInteraction(alias, { aids, data }) {
    return m.request({
      method: 'PUT',
      url: `${this.keriURL}/groups/${alias}/ixn`,
      body: {
        aids,
        data,
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

  static multisigIssueCredential(alias, { credentialData, recipient, registry, schema, source, rules }) {
    return m.request({
      method: 'POST',
      url: `${this.keriURL}/groups/${alias}/credentials`,
      body: {
        credentialData,
        recipient,
        registry,
        schema,
        source,
        rules,
      },
    });
  }

  static approveIssueCredential(alias, credential) {
    return m.request({
      method: 'PUT',
      url: `${this.keriURL}/groups/${alias}/credentials`,
      body: {
        credential,
      },
    });
  }

  static listCredentialRegistries() {
    return m.request({
      method: 'GET',
      url: `${this.keriURL}/registries`,
    });
  }

  static createCredentialRegistry({ alias, name, nonce }) {
    return m.request({
      method: 'POST',
      url: `${this.keriURL}/registries`,
      body: {
        alias,
        nonce,
        baks: [],
        estOnly: false,
        name: name,
        noBackers: true,
        toad: 0,
      },
    });
  }

  // EXPORT

  static exportCredential(alias, said) {
    return m.request({
      method: 'GET',
      url: `${this.keriURL}/credentials/${alias}/${said}`,
      responseType: 'application/json+cesr',
    });
  }

  // UTILITIES
  static arrayEquals(ar1, ar2) {
    return (
      Array.isArray(ar1) &&
      Array.isArray(ar2) &&
      ar1.length === ar2.length &&
      ar1.every((val, index) => val === ar2[index])
    );
  }

  static recommendedThold(numWits) {
    switch (numWits) {
      case 1:
        return 1;
      case 2:
      case 3:
        return 2;
      case 4:
        return 3;
      case 5:
      case 6:
        return 4;
      case 7:
        return 5;
      case 8:
      case 9:
        return 7;
      case 10:
        return 8;
    }
  }

  static parseAIDFromUrl(url) {
    let indexStart = url.indexOf('/oobi/') + 6;
    let indexEnd = url.indexOf('/witness/');
    if (indexStart > -1 && indexEnd > -1) {
      return url.substring(indexStart, indexEnd);
    }
    return null;
  }
}

module.exports = KERI;
