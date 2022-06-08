import m from 'mithril';
import Notify from './notify';
import Participants from './oobis';
import Toaster from './toaster';
import KERI from './keri';
import Profile from './profile';

class Mail {
  static MINSNIFFSIZE = 30;
  static _port = process.env.API_PORT;

  static groupName = '';
  static messages = [];
  static presentations = [];
  static source = null;

  static sniff = (raw) => {
    let size = '';
    if (raw.length < this.MINSNIFFSIZE) {
      throw new Error('"Need more bytes."');
    }

    const versionPattern = Buffer.from(
      'KERI(?<major>[0-9a-f])(?<minor>[0-9a-f])(?<kind>[A-Z]{4})(?<size>[0-9a-f]{6})_',
      'binary'
    );
    const regex = RegExp(versionPattern);
    const response = regex.exec(raw);

    if (!response || response.kind > 12) throw new Error(`Invalid version string in raw = ${raw}`);
    size = response.groups.size;

    return parseInt(size, 16);
  };

  // NOTE: Keeping these here just for reference later, these are the old message handlers from KIWI

  // static displayMultisig = (e) => {
  //   let data = JSON.parse(e.data);
  //   this.messages.unshift(data);
  //   m.redraw();
  // };

  // static displayDelegateNotices = (e) => {
  //   let size = this.sniff(e.data);

  //   let evt = e.data.slice(0, size);
  //   let ked = JSON.parse(evt);

  //   this.messages.unshift(ked);
  //   m.redraw();
  // };

  // static displayData = (e) => {
  //   let size = this.sniff(e.data);

  //   let evt = e.data.slice(0, size);
  //   let ked = JSON.parse(evt);
  //   this.messages.unshift(ked['d']);
  //   this.messages = this.messages.filter(
  //     (msg, index, self) => index === self.findIndex((m) => m.vc.i === msg.vc.i && m.status === msg.status)
  //   );
  //   m.redraw();
  // };

  // static displayPresentation = (e) => {
  //   let size = this.sniff(e.data);

  //   let evt = e.data.slice(0, size);
  //   let ked = JSON.parse(evt);
  //   this.presentations.unshift(ked['d']);
  //   m.redraw();
  // };

  static challengeHandler = (e) => {
    let data = JSON.parse(e.data);
    const participantInstances = Participants.instances;
    participantInstances.forEach((instance) => {
      const oobi = instance.oobis.find((oobi) => {
        return data.signer === oobi.id;
      });
      if (oobi !== undefined) {
        if (data.words.length === instance.words.length && data.words.every((v, i) => v === instance.words[i])) {
          oobi.verified = true;
          m.redraw();
          const aid = Profile.getDefaultAID();
          KERI.updateContact(aid.name, oobi.id, { verified: 'true' });
        }
      }
    });
    Notify.push({
      type: 'challenge',
      data,
    });
    m.redraw();
  };

  static delegateHandler = (e) => {
    let data = JSON.parse(e.data);
    Notify.push({
      type: 'delegate',
      data,
    });
    m.redraw();
  };

  static multisigHandler = (e) => {
    let data = JSON.parse(e.data);
    Notify.push({
      type: 'multisig',
      data,
    });
    m.redraw();
  };

  static credentialHandler = (e) => {
    console.log('credential', e);
    Toaster.success(`credential: ${e}`);
    m.redraw();
  };

  static receiptHandler = (e) => {
    console.log('receipt', e);
    Toaster.success(`receipt: ${e}`);
    m.redraw();
  };

  static replayHandler = (e) => {
    console.log('replay', e);
    Toaster.success(`replay: ${e}`);
    m.redraw();
  };

  static initEventSource = () => {
    if (this.source || this.messages.length > 0) {
      return;
    }
    this.source = new EventSource(
      `${process.env.API_HOST}:${process.env.API_PORT}/mbx?pre=E59KmDbpjK0tRf9Rmc7OlueZVz7LB94DdD3cjQVvPcng&topics=%2Fchallenge%3D0&topics=%2Fdelegate%3D0&topics=%2Fmultisig%3D0&topics=%2Fcredential%3D0&topics=%2Freceipt%3D0&topics=%2Freplay%3D0`
    );
    this.source.addEventListener('/challenge', this.challengeHandler, false);
    this.source.addEventListener('/delegate', this.delegateHandler, false);
    this.source.addEventListener('/multisig', this.multisigHandler, false);
    this.source.addEventListener('/credential', this.credentialHandler, false);
    this.source.addEventListener('/receipt', this.receiptHandler, false);
    this.source.addEventListener('/replay', this.replayHandler, false);
  };

  static closeEventSource = () => {
    this.messages = [];
    this.source.removeEventListener('/challenge', this.challengeHandler, false);
    this.source.removeEventListener('/delegate', this.delegateHandler, false);
    this.source.removeEventListener('/multisig', this.multisigHandler, false);
    this.source.removeEventListener('/credential', this.credentialHandler, false);
    this.source.removeEventListener('/receipt', this.receiptHandler, false);
    this.source.removeEventListener('/replay', this.replayHandler, false);
    this.source.close();
    this.source = null;
  };

  // NOTE: Keeping these here just for reference later, these are the old static methods from KIWI

  // static joinGroup = (msg) => {
  //   xhring
  //     .multisigInceptPost({
  //       group: this.groupName,
  //       aids: msg.aids,
  //       witnesses: msg.witnesses,
  //       toad: msg.toad,
  //       isith: msg.isith,
  //       nsith: msg.nsith,
  //       notify: false,
  //     })
  //     .then((res) => {
  //       alert('Multisig Group Join Initiated');
  //     })
  //     .catch((err) => {
  //       console.log('caught', err);
  //     });
  // };

  // static joinIssue = (schema, data, typ, recipient, source) => {
  //   xhring
  //     .exnRequest({
  //       credentialData: data,
  //       schema: schema,
  //       type: typ,
  //       registry: UserTypes.getUserType(),
  //       recipient: recipient,
  //       source: source,
  //       notify: false,
  //     })
  //     .then((res) => {
  //       Toaster.success(typ + ' signed and submitted');
  //     })
  //     .catch((err) => {
  //       console.log('caught', err);
  //       Toaster.error('Failed to issue ' + typ);
  //     });
  // };

  // static rotateGroup = (group) => {
  //   xhring
  //     .multisigRotatePost({
  //       group: group,
  //     })
  //     .then((res) => {})
  //     .catch((err) => {
  //       console.log('caught', err);
  //     });
  // };

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
