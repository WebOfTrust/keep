import m from 'mithril';
import { TextField } from '../../src/app/components';
import { KERI, Participants } from '../../src/app/services';

class SendChallengeForm {
  constructor() {
    this.challengeMessage = '';
    this.copied = false
  }

  copyMessage() {
    navigator.clipboard.writeText(this.challengeMessage).then(
        () => {
          this.copied = true;
          Participants.updateWords(this.challengeMessage.split(" "))
          m.redraw();
        },
        () => {
          this.copied = false;
          m.redraw();
        }
    );
  }

  oninit() {
    KERI.generateChallengeMessage()
      .then((res) => {
        this.challengeMessage = res.words.join(' ');
      })
      .catch((err) => {
        console.log('generateChallengeMessage', err);
      });
  }

  view(vnode) {
    return (
      <>
        <h4>Copy Challenge Message</h4>
        <TextField
          outlined
          textarea
          rows={2}
          fluid
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)', margin: '0 0 0 0' }}
          value={this.challengeMessage}
          iconTrailing={{
            icon: 'content_copy',
            onclick: (e) => {
              this.copyMessage();
            },
          }}
        />
        <p className="font-color--green font-weight--medium">{this.copied ? 'Challenge message copied!' : <br/>}</p>
      </>
    );
  }
}

module.exports = SendChallengeForm;
