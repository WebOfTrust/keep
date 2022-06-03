import KERI from './keri';

class Profile {
  static _isLead = false;
  static _default = undefined;
  static _defaultSingle = undefined;
  static _defaultMulti = undefined;
  static _identifiers = [];
  static _singleSigs = [];
  static _multiSigs = [];

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

  static get singleSigs() {
    return this._singleSigs;
  }

  static get multiSigs() {
    return this._multiSigs;
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
        this._singleSig = this.identifiers.filter((aid) => {
            return !("group" in aid);
        });
        this._multiSig = this.identifiers.filter((aid) => {
            return "group" in aid;
        });
        this._default = this._identifiers.find((aid) => {
          return 'metadata' in aid && 'default' in aid.metadata;
        });
        this._defaultSingle = this._singleSig.find((aid) => {
          return 'metadata' in aid && 'default' in aid.metadata;
        });
        this._defaultMulti = this._multiSig.find((aid) => {
          return 'metadata' in aid && 'default' in aid.metadata;
        });

        if (this._default === undefined && this._identifiers.length > 0) {
          this._default = this._identifiers[0];
        }
        if (this._defaultSingle === undefined && this._singleSig.length > 0) {
          this._default = this._singleSig[0];
        }
        if (this._default === undefined && this._multiSig.length > 0) {
          this._default = this._multiSigs[0];
        }
      })
      .catch((err) => {
        this._identifiers = [];
        console.log('listIdentifiers', err);
      });
  }

  static setDefaultAID(aid) {
    KERI.updateIdentifier(aid.name, {
      default: 'true',
    });
  }

  static getDefaultAID() {
    return this._default;
  }

  static getDefaultSingleAID() {
    return this._defaultSingle;
  }

  static getDefaultMultiAID() {
    return this._defaultMulti;
  }
}

module.exports = Profile;
