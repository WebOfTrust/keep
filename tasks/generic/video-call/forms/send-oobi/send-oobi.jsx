import m from 'mithril';
import { Button, Modal, TextField } from '../../../../../src/app/components';
import { KERI, Profile } from '../../../../../src/app/services';

class SendOOBIForm {
  constructor(vnode) {
    this.copied = false;
    this.aidToSend = Profile.getDefaultAID(vnode.attrs.aidToSend);

    this.oobi = {
      alias: '',
      prefix: '',
      url: '',
    };
  }

  oninit(vnode) {
    this.oobi.alias = this.aidToSend.name;
    this.oobi.prefix = this.aidToSend.prefix;
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
        <p>Alias: {this.oobi.alias}</p>
        <p>{this.oobi.prefix}</p>
        <Button
          raised
          class="button--no-transform"
          label="Generate & Copy"
          onclick={() => {
            this.copyOpen = true;
          }}
        />

        <Modal
          isOpen={this.copyOpen}
          onClose={() => {
            this.copyOpen = false;
          }}
          style={{
            width: '512px',
          }}
        >
          <h3>Paste the URL below into the Video Call Chat</h3>
          <TextField
            textarea
            outlined
            fluid
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)', margin: '0' }}
            value={this.oobi.url}
            onclick={() => {
              this.copyURL();
            }}
          />
          <p class="font-color--green font-weight--medium">{this.copied ? 'OOBI copied!' : <br />}</p>
          <Button raised label="I Pasted It Into The Chat" />
        </Modal>
      </>
    );
  }
}

module.exports = SendOOBIForm;
