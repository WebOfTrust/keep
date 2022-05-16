import KERI from './keri';

class Profile {
  static _isLead = false;
  static _default = undefined;
  static _identifiers = [];

  constructor() {}

  static get isLead() {
    return this._isLead;
  }

  static set isLead(lead) {
    this._isLead = lead;
  }

  static get identifiers() {
    return this._identifiers;
  }

  static filterIdentifiersById(id) {
    return this._identifiers.filter((identifier) => {
      return identifier.id === id;
    });
  }

  static loadIdentifiers() {
    KERI.listIdentifiers()
      .then((identifiers) => {
        this._identifiers = identifiers;
        this._default = this._identifiers.find((aid) => {
          return 'metadata' in aid && 'default' in aid.metadata;
        });

        if (this._default === undefined && this._identifiers.length > 0) {
          this._default = this._identifiers[0];
        }
      })
      .catch((err) => {
        this._identifiers = [];
        console.log('listIdentifiers', err);
      });
  }

  static clearDefaultAID() {}

  static setDefaultAID(aid) {
    KERI.updateIdentifier(aid.name, {
      default: 'true',
    });
  }

  static getDefaultAID() {
    return this._default;
  }
}

module.exports = Profile;
