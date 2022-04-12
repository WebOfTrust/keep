import KERI from './keri';
import Mail from './mail';

class Auth {
  static isLoggedIn() {
    return !!sessionStorage.getItem('agent');
  }

  static setAgent(name) {
    sessionStorage.setItem('agent', name);
  }

  static removeAgent() {
    sessionStorage.removeItem('agent');
  }

  static login(passcode) {
    let promise = new Promise((resolve, reject) => {
      KERI.unlockAgent(`keep${KERI.port}`, passcode)
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
