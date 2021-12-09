import m from 'mithril';
import { Button, Container, TextField } from '../../../components';
import passcodeImg from '../../../../assets/img/passcode.png';

class EnterPasscode {
  constructor() {
    this.passcode = '';
  }

  continueDisabled() {
    let passcodeValid = /^[a-zA-Z0-9]{22}$/.test(this.passcode);
    return !passcodeValid;
  }

  view() {
    return (
      <>
        <Container class="headspace flex flex-align-center">
          <div class="flex-2">
            <img src={passcodeImg} />
          </div>
          <div class="flex-3" style="padding: 1rem">
            <h1>Please enter your passcode.</h1>
            <p class="font-color--light">
              You can find your 22-character passcode by referring back to your storage spot (1Password, Last Pass, Safe
              Deposit Box) and entering it into the box below.
            </p>
            <div class="flex flex-align-center">
              <TextField
                filled
                label="Passcode"
                oninput={(e) => {
                  this.passcode = e.target.value;
                }}
                pattern={'^[a-zA-Z0-9]{22}$'}
                placeholder="xxxxx-xxxx-xxxxx-xxxx-xxxx"
              />
              <Button
                raised
                label="Continue"
                style={{
                  marginLeft: '1rem',
                }}
                onclick={() => {
                  m.route.set('/auth/configure-identifier');
                }}
              />
            </div>
          </div>
        </Container>
      </>
    );
  }
}

module.exports = EnterPasscode;
