import KERI from './keri';
import Mail from './mail';

class Auth {
  static _isLoggedIn = false

  constructor() {
  }

  static
  get isLoggedIn() {
    return this._isLoggedIn
  }

  static
  set isLoggedIn(l) {
    this._isLoggedIn = l
  }

  static setAgent(name) {
    sessionStorage.setItem('agent', name);
  }

  static removeAgent() {
    sessionStorage.removeItem('agent');
  }

  static title() {
    switch (process.env.USER_TYPE) {
      case "lead-external-gar":
        return "Lead External GAR"
      case "external-gar":
        return "External GAR"
      default:
        return ""
    }
  }

  static login(passcode) {
    let promise = new Promise((resolve, reject) => {
      KERI.unlockAgent(`keep${process.env.API_PORT}`, passcode)
        .then((response) => {
          this.setAgent(response.name);
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
    return promise;
  }

  static logout() {
    this.removeAgent();
  }
}

module.exports = Auth;
