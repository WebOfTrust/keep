import m from 'mithril';
import { Button, TextField } from '../../../../../src/app/components';
import { KERI } from '../../../../../src/app/services';

class SendChallengeForm {
  constructor() {
    this.challengeMessage = '';
    this.copied = false;
  }

  copyMessage(vnode) {
    navigator.clipboard.writeText(this.challengeMessage).then(
      () => {
        this.copied = true;
        vnode.attrs.participants.updateWords(this.challengeMessage.split(' '));
        m.redraw();
      },
      () => {
        this.copied = false;
        m.redraw();
      }
    );
  }

  oninit(vnode) {

  }

  view(vnode) {
    return (
      <>
        <h4>Paste Challenge Message</h4>
        <TextField
          outlined
          textarea
          rows={2}
          fluid
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)', margin: '0 0 0 0' }}
          value={this.challengeMessage}
          oninput={(e) => {
              this.challengeMessage = e.target.value;
              vnode.attrs.participants.updateWords(this.challengeMessage.split(' '));
          }}
        />
        <div class="flex flex-align-center flex-justify-between" style={{ margin: '1rem 0' }}>

        </div>
      </>
    );
  }
}

module.exports = SendChallengeForm;
