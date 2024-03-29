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
        <p class="font-color--battleship">Alias: {this.oobi.alias}</p>
        <p class="mono-aid font-color--battleship">{this.oobi.prefix}</p>
        <div class="flex flex-justify-end margin-top-2">
          <Button
            outlined
            label="Generate & Copy"
            onclick={() => {
              this.copied = false;
              this.copyOpen = true;
            }}
          />
        </div>
        <Modal
          isOpen={this.copyOpen}
          onClose={() => {
            this.copyOpen = false;
          }}
          style={{
            width: '512px',
          }}
        >
          <h3>Click the URL below to copy</h3>
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
                <b>Paste this into the video call chat!</b>
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
