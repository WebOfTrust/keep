import m from 'mithril';
import { TextField } from '../../src/app/components';
import { KERI } from '../../src/app/services';

class SendChallengeForm {
  constructor() {
    this.challangeMessage = '';
  }

  oninit() {
    KERI.generateChallengeMessage()
      .then((res) => {
        this.challangeMessage = res.words.join(' ');
      })
      .catch((err) => {
        console.log('generateChallengeMessage', err);
      });
  }

  view(vnode) {
    return (
      <>
        <TextField
          outlined
          textarea
          fluid
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)', margin: '0 0 4rem 0' }}
          value={this.challangeMessage}
        />
      </>
    );
  }
}

module.exports = SendChallengeForm;
