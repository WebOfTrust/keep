import m from 'mithril';
import { Button, Checkbox, Modal } from '../../../../../src/app/components';
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
        <p class="font-weight--semi-bold">Alias: {this.oobi.alias}</p>
        <p class="mono-aid font-weight--bold font-color--battleship">{this.oobi.prefix}</p>
        <Button
          raised
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
            class="copy-value margin-bottom-1"
            onclick={() => {
              this.copyURL();
            }}
          >
            {this.oobi.url}
          </div>
          {this.copied && (
            <div class="flex margin-bottom-1">
              <Checkbox checked={this.copied} />
              <p class="copied-label">
                URL copied to clipboard.
                <br />
                Paste this into the video call chat!
              </p>
            </div>
          )}
          <Button
            raised
            style={{ width: '100%' }}
            label="I Pasted It Into The Chat"
            disabled={!this.copied}
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
