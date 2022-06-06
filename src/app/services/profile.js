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
        this._singleSigs = this.identifiers.filter((aid) => {
            return !("group" in aid);
        });
        this._multiSigs = this.identifiers.filter((aid) => {
            return "group" in aid;
        });
        this._default = this._identifiers.find((aid) => {
          return 'metadata' in aid && 'default' in aid.metadata;
        });
        this._defaultSingle = this._singleSigs.find((aid) => {
          return 'metadata' in aid && 'default' in aid.metadata;
        });
        this._defaultMulti = this._multiSigs.find((aid) => {
          return 'metadata' in aid && 'default' in aid.metadata;
        });

        if (this._default === undefined && this._identifiers.length > 0) {
          this._default = this._identifiers[0];
        }
        if (this._defaultSingle === undefined && this._singleSigs.length > 0) {
          // this._defaultSingle = this._singleSigs[0];
          this._defaultSingle = this._singleSig[0];
        }

        if (this._defaultMulti === undefined && this._multiSigs.length > 0) {
          // this._defaultMulti = this._multiSig[0];
          this._defaultMulti = this._multiSig[0];
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

  static getDefaultAID(type) {
      if (type === 'single' || this._defaultMulti === undefined) {
          return this._defaultSingle
      } else {
          return this._defaultMulti
      }
  }

  static getDefaultSingleAID() {
    return this._defaultSingle;
  }

  static getDefaultMultiAID() {
    return this._defaultMulti;
  }
}

module.exports = Profile;
