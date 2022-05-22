import KERI from './keri';
import Mail from './mail';

class Auth {
  static _isLoggedIn = false;

  constructor() {}

  static get isLoggedIn() {
    return this._isLoggedIn;
  }

  static set isLoggedIn(l) {
    this._isLoggedIn = l;
  }

  static setAgent(name) {
    sessionStorage.setItem('agent', name);
  }

  static removeAgent() {
    sessionStorage.removeItem('agent');
    this._isLoggedIn = false
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

  static login(passcode) {
    return new Promise((resolve, reject) => {
      KERI.unlockAgent(`keep-${process.env.USER_TYPE}-${process.env.API_PORT}`, passcode)
        .then((response) => {
          this.setAgent(response.name);
          this.isLoggedIn = true;
          setTimeout(() => {
            Mail.initEventSource();
          }, 1000);
          resolve(response);
        })
        .catch((err) => {
          console.log('unlockAgent', err);
          reject(err);
        });
    });
  }

  static logout() {
    this.removeAgent();
  }
}

module.exports = Auth;
