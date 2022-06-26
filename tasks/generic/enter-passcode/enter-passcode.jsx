import m from 'mithril';
import { Button, TextField } from '../../../src/app/components';
import { Auth } from '../../../src/app/services';
import passcodeImg from '../../../src/assets/img/passcode.svg';

class EnterPasscodeTask {
  constructor(config) {
    this._label = config.label;
    this._component = {
      view: (vnode) => {
        return <EnterPasscode end={vnode.attrs.end} parent={this} />;
      },
    };
  }

  get imgSrc() {
    return passcodeImg;
  }

  get label() {
    return this._label;
  }

  get component() {
    return this._component;
  }
}

class EnterPasscode {
  constructor() {
    this.passcode = '';
    this.showPasscode = false;
    this.error = '';
    this.submitting = false;
  }

  login(vnode) {
    this.error = '';
    this.submitting = true;
    Auth.login(this.passcode)
      .then(() => {
          setTimeout(() => {
              vnode.attrs.end();
          }, 3000)
      })
      .catch(() => {
        this.error = 'Unlock failed';
      })
      .finally(() => {
        this.submitting = false;
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
        {this.error && <p class="error">{this.error}</p>}
        <div class="flex flex-justify-end" style={{ marginTop: '4rem' }}>
          <Button
            raised
            class="button--no-transform button--big"
            label="Login"
            disabled={!this.passcode || this.submitting}
            onclick={() => {
              this.login(vnode);
            }}
          />
        </div>
      </>
    );
  }
}

module.exports = EnterPasscodeTask;
