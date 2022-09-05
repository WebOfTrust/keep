import m from 'mithril';
import { Button, Modal } from '../../../../../src/app/components';
import { KERI, Profile } from '../../../../../src/app/services';

class SendOOBIForm {
  constructor(vnode) {
    this.copied = false;
    this.aidToSend = Profile.getDefaultAID();

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
          style={{ width: '100%' }}
          onclick={() => {
            this.copied = false;
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
          <div
            class="uneditable-value"
            onclick={() => {
              this.copyURL();
            }}
          >
            {this.oobi.url}
          </div>
          <p class="font-color--green font-weight--medium">
            {this.copied ? 'URL copied to clipboard. Paste this into the video call chat!' : <br />}
          </p>
          <Button
            raised
            class="button--big"
            style={{ width: '100%' }}
            label="I Pasted It Into The Chat"
            onclick={() => {
              this.copyOpen = false;
            }}
          />
        </Modal>
      </>
    );
  }
}

module.exports = SendOOBIForm;
