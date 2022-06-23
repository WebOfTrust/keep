import m from 'mithril';
import { Button, TextField } from '../../../../../src/app/components';
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
        <h3>OOBI URL:</h3>
        <TextField
          textarea
          outlined
          fluid
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)', margin: '0' }}
          value={this.oobi.url}
        />
        <div class="flex flex-align-center flex-justify-between" style={{ margin: '1rem 0' }}>
          <Button
            raised
            class="button--no-transform button--gray"
            label="Copy"
            iconLeading="content_copy"
            onclick={(e) => {
              this.copyURL();
            }}
          />
          <p class="font-color--green font-weight--medium">{this.copied ? 'OOBI copied!' : <br />}</p>
        </div>
      </>
    );
  }
}

module.exports = SendOOBIForm;
