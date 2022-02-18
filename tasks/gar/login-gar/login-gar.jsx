import m from 'mithril';
import { Button, Container, Modal, TextField } from '../../../src/app/components';
import { API } from '../../../src/app/services';
import passcodeImg from '../../../src/assets/img/passcode.png';

class EnterPasscode {
  constructor() {
    this.passcode = '';
    this.showPasscode = false;
  }

  view(vnode) {
    return (
      <>
        <h3>Welcome Back</h3>
        <div class="flex flex-justify-center" style={{ margin: '4.5rem 0' }}>
          <img src={passcodeImg} style={{ width: '192px' }} />
        </div>
        <p class="font-color--battleship" style={{ margin: '0 0 3rem 0', lineHeight: '1.38', letterSpacing: '0.15px' }}>
          Enter your 22 character passcode to login to the portal.
        </p>
        <TextField
          outlined
          fluid
          type={this.showPasscode ? 'text' : 'password'}
          maxlength="22"
          pattern={'^[a-zA-Z0-9]{22}$'}
          value={this.passcode}
          oninput={(e) => {
            this.passcode = e.target.value;
          }}
          iconTrailing={{
            icon: this.showPasscode ? 'visibility' : 'visibility_off',
            onclick: () => {
              this.showPasscode = !this.showPasscode;
            },
          }}
        />
        <div class="flex flex-justify-between" style={{ marginTop: '9rem' }}>
          <Button
            raised
            class="button--no-transform button--gray-dk button--big"
            label="Go Back"
            onclick={vnode.attrs.back}
          />
          <Button
            raised
            class="button--no-transform button--big"
            label="Continue"
            onclick={() => {
              API.Habery.create(JSON.stringify({ passcode: this.passcode }))
                .then(vnode.attrs.continue)
                .catch((err) => {
                  console.log(err);
                });
            }}
          />
        </div>
      </>
    );
  }
}

class LoginGar {
  constructor() {
    this.currentState = 'enter-passcode';
  }

  view(vnode) {
    return (
      <>
        {this.currentState === 'enter-passcode' && (
          <EnterPasscode
            back={() => {
              this.currentState = 'create-passcode';
            }}
            continue={vnode.attrs.end}
          />
        )}
      </>
    );
  }
}

module.exports = LoginGar;
