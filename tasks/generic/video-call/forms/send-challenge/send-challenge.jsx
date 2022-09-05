import m from 'mithril';
import { Button, Modal } from '../../../../../src/app/components';
import { KERI } from '../../../../../src/app/services';
import './send-challenge.scss';

class SendChallengeForm {
  constructor() {
    this.challengeWords = [];
    this.copyOpen = false;
    this.copied = false;
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

  view(vnode) {
    return (
      <>
        <h4>Challenge Message:</h4>
        <div class="challenge-words">
          {this.challengeWords.map((word) => {
            return <div class="challenge-words-word">{word}</div>;
          })}
        </div>
        <div class="flex flex-align-center margin-v-1">
          <Button
            raised
            class="button--no-transform button--gray"
            label="Copy"
            iconLeading="content_copy"
            onclick={() => {
              this.copyOpen = true;
              this.copied = false;
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
          <h3>Paste the URL below into the Video Call Chat</h3>
          <div
            class="uneditable-value"
            onclick={() => {
              this.copyMessage(vnode);
            }}
          >
            {this.challengeWords.join(' ')}
          </div>
          <p class="font-color--green font-weight--medium">
            {this.copied ? 'Words copied to clipboard. Paste this into the video call chat!' : <br />}
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

module.exports = SendChallengeForm;
