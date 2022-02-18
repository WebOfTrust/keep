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
}

module.exports = KERI;
