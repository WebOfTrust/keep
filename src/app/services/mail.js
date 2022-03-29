import m from 'mithril';
import KERI from './keri';
import Toaster from './toaster';

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
    console.log('challenge', e);
    m.redraw();
  };

  static multisigHandler = (e) => {
    console.log('multisig', e);
    m.redraw();
  };

  static receiptHandler = (e) => {
    console.log('receipt', e);
    m.redraw();
  };

  static replayHandler = (e) => {
    console.log('replay', e);
    m.redraw();
  };

  static replyHandler = (e) => {
    console.log('reply', e);
    m.redraw();
  };

  static initEventSource = () => {
    this.source = new EventSource(
      `http://localhost:${this.port}/mbx?i=E59KmDbpjK0tRf9Rmc7OlueZVz7LB94DdD3cjQVvPcng&topics=%2Fchallenge%3D0&topics=%2Fmultisig%3D0&topics=%2Freceipt%3D0&topics=%2Freplay%3D0&topics=%2Freply%3D0`
    );
    this.source.addEventListener('/challenge', this.challengeHandler, false);
    this.source.addEventListener('/multisig', this.multisigHandler, false);
    this.source.addEventListener('/receipt', this.receiptHandler, false);
    this.source.addEventListener('/replay', this.replayHandler, false);
    this.source.addEventListener('/reply', this.replyHandler, false);
  };

  static closeEventSource = () => {
    this.messages = [];
    this.source.removeEventListener('/challenge', this.challengeHandler, false);
    this.source.removeEventListener('/multisig', this.multisigHandler, false);
    this.source.removeEventListener('/receipt', this.receiptHandler, false);
    this.source.removeEventListener('/replay', this.replayHandler, false);
    this.source.removeEventListener('/reply', this.replyHandler, false);
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
    this.closeEventSource();
    this.initEventSource();
  }
}

module.exports = Mail;
