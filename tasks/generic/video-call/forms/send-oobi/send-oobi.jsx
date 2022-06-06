import m from 'mithril';
import { TextField } from '../../../../../src/app/components';
import { KERI, Profile } from '../../../../../src/app/services';

/*
 * SendOOBIForm
 *
 * attrs
 * identifiers - an array of agent identifiers
 */

class SendOOBIForm {
  constructor(vnode) {
    this.copied = false;
    this.aidToSend = Profile.getDefaultAID(vnode.attrs.aidToSend);

    this.oobi = {
      alias: '',
      url: '',
    };
  }

  oninit(vnode) {
    this.oobi.alias = this.aidToSend.name;
    KERI.getOOBI(this.aidToSend.name, 'witness')
      .then((oobi) => {
        this.oobi.url = oobi.oobis[0];
      })
      .catch((err) => {
        console.log('getOOBI', err);
      });
  }

  copyURL() {
    navigator.clipboard.writeText(this.oobi.url).then(
      () => {
        this.copied = true;
        m.redraw();
      },
      () => {
        this.copied = false;
        m.redraw();
      }
    );
  }

  view(vnode) {
    return (
      <>
        <h3>URL:</h3>
        <TextField
          outlined
          fluid
          style={{ margin: '0 0 2rem 0', backgroundColor: 'rgba(0, 0, 0, 0.04)' }}
          value={this.oobi.url}
          iconTrailing={{
            icon: 'content_copy',
            onclick: (e) => {
              this.copyURL();
            },
          }}
        />
        <p className="font-color--green font-weight--medium">{this.copied ? 'OOBI copied!' : <br />}</p>
      </>
    );
  }
}

module.exports = SendOOBIForm;
