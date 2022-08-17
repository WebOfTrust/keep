import m from 'mithril';
import Notify from './notify';
import Participants from './oobis';
import KERI from './keri';
import Profile from './profile';
import Registry from './registry';

class Mail {
  static MINSNIFFSIZE = 30;
  static _port = process.env.API_PORT;

  static groupName = '';
  static source = null;

  static notificationHandler = () => {
    Notify.requestList().then(() => {
      m.redraw();
    });
  };

  static challengeHandler = (e) => {
    let data = JSON.parse(e.data);
    const participantInstances = Participants.instances;
    participantInstances.forEach((instance) => {
      const oobi = instance.oobis.find((oobi) => {
        return data.a.signer === oobi.id;
      });
      if (oobi !== undefined) {
        if (data.a.words.length === instance.words.length && data.a.words.every((v, i) => v === instance.words[i])) {
          oobi.verified = true;
          const aid = Profile.getDefaultAID();
          KERI.updateContact(oobi.id, { verified: 'true' });
          m.redraw();
        }
      }
    });
  };

  static multisigInceptHandler = () => {
    Profile.loadIdentifiers().then(() => {
      let aid = Profile.getDefaultMultiAID();
      Registry.ensureRegistry(aid.name, aid.name, aid.prefix);
      m.redraw();
    });
  };

  static initEventSource = () => {
    if (this.source) {
      return;
    }
    this.source = new EventSource(`${KERI.keriURL}/mbx?`);
    this.source.addEventListener('/notification', this.notificationHandler, false);
    this.source.addEventListener('/challenge', this.challengeHandler, false);
    this.source.addEventListener('/multisig/icp/complete', this.multisigInceptHandler, false);
  };

  static closeEventSource = () => {
    this.source.removeEventListener('/notification', this.notificationHandler, false);
    this.source.removeEventListener('/challenge', this.challengeHandler, false);
    this.source.removeEventListener('/multisig/icp/complete', this.multisigInceptHandler, false);
    this.source.close();
    this.source = null;
  };

  static get port() {
    return this._port;
  }

  static set port(port) {
    this._port = port;
    if (this.source) {
      this.closeEventSource();
      this.initEventSource();
    }
  }
}

module.exports = Mail;
