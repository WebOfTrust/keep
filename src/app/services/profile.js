import KERI from './keri';
import Keep from './keep';

class Profile {
  static _locked = true;
  static _created = undefined;
  static _default = undefined;
  static _identifiers = undefined;
  static _singleSigs = [];
  static _multiSigs = [];

  constructor() {}

  static setAgent(name) {
    sessionStorage.setItem('agent', name);
  }

  static removeAgent() {
    sessionStorage.removeItem('agent');
  }

  static get isLoggedIn() {
    return !this._locked;
  }

  static get locked() {
    return this._locked;
  }

  static set locked(_locked) {
    this._locked = _locked;
  }

  static get created() {
    return this._created;
  }

  static set created(_created) {
    this._created = _created;
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

  static check() {
    return new Promise((resolve, reject) => {
      Profile.loadIdentifiers().then(
        () => {
          if (Profile.isLoggedIn) {
            resolve();
          } else {
            reject();
          }
        },
        () => {
          reject();
        }
      );
    });
  }

  static login(passcode) {
    return new Promise((resolve, reject) => {
      KERI.unlockAgent(Keep.getName(), passcode)
        .then((response) => {
          Profile.statusPoll().then(() => {
            Profile.setAgent(response.name);
            resolve();
          });
        })
        .catch((err) => {
          console.log('unlockAgent', err);
          reject(err);
        });
    });
  }

  static statusRetry(resolve) {
    this.check()
      .then(() => {
        resolve();
      })
      .catch(() => {
        setTimeout(() => {
          Profile.statusRetry(resolve);
        }, 2000);
      });
  }

  static statusPoll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.statusRetry(resolve);
      }, 2000);
    });
  }

  static filterIdentifiersById(id) {
    let ids = this._identifiers.filter((identifier) => {
      return identifier.prefix === id;
    });
    if (ids.length === 0) {
      return undefined;
    } else {
      return ids[0];
    }
  }

  static createIdentifier(alias, wits, toad, estOnly, DnD) {
    return new Promise((resolve, reject) => {
      KERI.createIdentifier(alias, wits, toad, estOnly, DnD)
        .then(() => {
          Profile.loadIdentifiers()
            .then((ids) => {
              let aid = ids.find((id) => {
                return id.name === alias;
              });
              resolve(aid);
            })
            .catch((err) => {
              console.log('listIdentfiers', err);
              reject();
            });
        })
        .catch((err) => {
          console.log('createIdentifier', err);
          reject();
        });
    });
  }

  static loadIdentifiers() {
    return new Promise((resolve, reject) => {
      KERI.listIdentifiers()
        .then((identifiers) => {
          Profile._identifiers = identifiers;
          Profile._singleSigs = Profile.identifiers.filter((aid) => {
            return !('group' in aid);
          });
          Profile._multiSigs = Profile.identifiers.filter((aid) => {
            return 'group' in aid;
          });
          Profile._default = Profile._identifiers.find((aid) => {
            return 'metadata' in aid && 'default' in aid.metadata && aid.metadata.default === 'true';
          });

          Profile._locked = false;
          Profile.created = true;
          resolve(identifiers);
        })
        .catch(() => {
          KERI.status(Keep.getName())
            .then(() => {
              Profile.created = true;
            })
            .catch(() => {
              Profile.created = false;
            })
            .finally(() => {
              Profile._locked = true;
              Profile._identifiers = undefined;
              reject(undefined);
            });
        });
    });
  }

  static setDefaultAID(aid) {
    return KERI.updateIdentifierMetadata(aid.name, {
      default: 'true',
    }).then(() => {
      if (Profile._default !== undefined) {
        KERI.updateIdentifierMetadata(Profile._default.name, {
          default: 'false',
        }).then(Profile.loadIdentifiers);
      } else {
        return Profile.loadIdentifiers();
      }
      this._default = aid;
    });
  }

  static getDefaultAID() {
    return this._default;
  }

  static title() {
    switch (process.env.USER_TYPE) {
      case 'external-gar':
        return 'External GAR';
      case 'generic':
        return 'Generic';
      case 'internal-gar':
        return 'Internal GAR';
      case 'lar':
        return 'LAR';
      case 'lead-external-gar':
        return 'Lead External GAR';
      case 'person':
        return 'Person';
      case 'qar':
        return 'QAR';
      case 'root-gar':
        return 'Root GAR';
      default:
        return '';
    }
  }
}

module.exports = Profile;
