import m from 'mithril';
import { Button, TextField } from '../../../src/app/components';
import { Auth } from '../../../src/app/services';
import passcodeImg from '../../../src/assets/img/passcode.png';

class Login {
  constructor() {
    this.passcode = '';
    this.showPasscode = false;
  }

  login(vnode) {
    Auth.login(this.passcode)
      .then(() => {
        vnode.attrs.end();
      })
      .catch((err) => {
        console.log('login', err);
      });
  }

  view(vnode) {
    return (
      <>
        <h3>Welcome Back</h3>
        <div class="flex flex-justify-center" style={{ margin: '5rem 0' }}>
          <img src={passcodeImg} style={{ width: '192px' }} />
        </div>
        <p class="p-tag" style={{ margin: '0 0 3rem 0' }}>
          Enter your 22 character passcode to login to the portal.
        </p>
        <TextField
          outlined
          fluid
          type={this.showPasscode ? 'text' : 'password'}
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
        <div class="flex flex-justify-end" style={{ marginTop: '9rem' }}>
          <Button
            raised
            class="button--no-transform button--big"
            label="Login"
            onclick={() => {
              this.login(vnode);
            }}
          />
        </div>
      </>
    );
  }
}

module.exports = Login;
