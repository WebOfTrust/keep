import m from 'mithril';
import { Button, TextField } from '../../../../../src/app/components';
import { KERI } from '../../../../../src/app/services';
import './send-challenge.scss';

class SendChallengeForm {
  constructor() {
    this.challengeWords = [];
    this.copied = false;
  }

  copyMessage(vnode) {
    navigator.clipboard.writeText(this.challengeWords.join(' ')).then(
      () => {
        this.copied = true;
        vnode.attrs.participants.updateWords(this.challengeWords);
        m.redraw();
      },
      () => {
        this.copied = false;
        m.redraw();
      }
    );
  }

  oninit(vnode) {
    KERI.generateChallengeMessage()
      .then((res) => {
        this.challengeWords = res.words;
        vnode.attrs.participants.updateWords(res.words);
      })
      .catch((err) => {
        console.log('generateChallengeMessage', err);
      });
  }

  view(vnode) {
    return (
      <>
        <h4>Challenge Message:</h4>
        <div class="challenge-words">
          {this.challengeWords.map((word) => {
            return <div class="challenge-words-word">{word}</div>;
          })}
        </div>
        {/* <TextField
          outlined
          textarea
          rows={2}
          fluid
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)', margin: '0 0 0 0' }}
          value={this.challengeMessage}
        /> */}
        <div class="flex flex-align-center flex-justify-between" style={{ margin: '1rem 0' }}>
          <Button
            raised
            class="button--no-transform button--gray"
            label="Copy"
            iconLeading="content_copy"
            onclick={(e) => {
              this.copyMessage(vnode);
            }}
          />
          <p class="font-color--green font-weight--medium">{this.copied ? 'Challenge message copied!' : <br />}</p>
        </div>
      </>
    );
  }
}

module.exports = SendChallengeForm;
