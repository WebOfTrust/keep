import m from 'mithril';
import API from './api';

class KERI {
  static generatePasscode() {
    return API.Code.read();
  }

  static initializeAgent(name, passcode) {
    return API.Boot.create({
      name,
      passcode,
    });
  }

  static unlockAgent(name, passcode) {
    return API.Boot.update({
      name,
      passcode,
    });
  }

  static createIdentifier(alias, witnesses) {
    return m.request({
      method: 'POST',
      url: `${process.env.API_HOST}/ids/${alias}`,
      body: {
        wits: witnesses,
      },
    });
  }
}

module.exports = KERI;
