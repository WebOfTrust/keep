import m from 'mithril';
import createYourPasscode from '../../../../assets/img/create-your-passcode.svg';
import passcodeImg from '../../../../assets/img/passcode.svg';
import { Button, TextField } from '../../../components';
import { KERI } from '../../../../app/services';

class ChangingPasscode {
  view(vnode) {
    return (
      <>
        <div>
          <h3>Changing Your Passcode</h3>
          <div class="flex flex-justify-center" style={{ margin: '4.5rem 0' }}>
            <img src={createYourPasscode} style={{ width: '192px' }} />
          </div>
          <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
            Before you change your passcode, remember that your passcode is your only way to enter the software, and
            that if you lose it, you cannot get back in..
            <br></br>
            <br></br>
            Make sure to store your password somewhere safe: a password management app, or printed and in a safe deposit
            box.
          </p>
          <div class="flex flex-justify-end">
            <Button class="button--no-transform button--big" raised label="Continue" onclick={vnode.attrs.continue} />
          </div>
        </div>
      </>
    );
  }
}
class GeneratePasscode {
  constructor() {
    this.passcode = '';
    this.copied = false;
    // this.savePassModalOpen = false;
    this.generatePasscode();
  }

  copyPasscode() {
    this.copied = false;
    navigator.clipboard.writeText(this.passcode).then(
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

  generatePasscode() {
    this.copied = false;
    KERI.generatePasscode()
      .then((resp) => {
        this.passcode = resp.passcode;
        console.log(this.passcode);
      })
      .catch((err) => {
        console.log('generatePasscode', err);
      });
  }

  view(vnode) {
    return (
      <>
        <h3>Generate Your Passcode</h3>
        <div class="flex flex-justify-center" style={{ margin: '4.5rem 0' }}>
          <img src={createYourPasscode} style={{ width: '192px' }} />
        </div>
        <p class="p-tag" style={{ margin: '0 0 2.5rem 0' }}>
          Generate your passcode here or in your password management app such as 1Password or Last Pass to encrypt your
          desktop software and then copy into the following screen.
        </p>
        <TextField
          outlined
          fluid
          placeholder="xxxx-xxxxx-xxxxx-xxxx-xxxxx"
          value={this.passcode}
          oninput={(e) => {
            this.passcode = e.target.value;
          }}
          iconTrailing={{
            icon: 'content_copy',
            onclick: () => {
              this.copyPasscode();
            },
          }}
        />
        <div class="flex flex-justify-between" style={{ margin: '1rem 0 4rem' }}>
          <p class="font-color--green font-weight--medium">{this.copied ? 'Passcode copied!' : <br />}</p>
          <Button
            raised
            class="button--no-transform button--gray button--big"
            label="Generate New"
            onclick={() => {
              this.generatePasscode();
            }}
          />
        </div>
        <div class="flex flex-justify-between">
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
            // onclick={() => {
            //   this.savePassModalOpen = true;
            // }}
            onclick={vnode.attrs.continue}
          />
        </div>
      </>
    );
  }
}
class EnterPasscode {
  constructor() {
    this.passcode = '';
    this.showPasscode = false;
  }

  initializeAgent(vnode) {
    KERI.initializeAgent('keep', this.passcode)
      .then(() => {
        KERI.unlockAgent('keep', this.passcode)
          .then(vnode.attrs.continue)
          .catch((err) => {
            console.log('unlockAgent err: ', err);
          });
      })
      .catch((err) => {
        console.log('initializeAgent err: ', err);
      });
  }

  view(vnode) {
    return (
      <>
        <h3>Please Enter Your Passcode</h3>
        <div class="flex flex-justify-center" style={{ margin: '5rem 0' }}>
          <img src={passcodeImg} style={{ width: '192px' }} />
        </div>
        <p class="p-tag" style={{ margin: '0 0 3rem 0' }}>
          You can find your 22-character passcode by referring back to your storage spot (1Password, Last Pass, Safe
          Deposit Box) and entering it into the box below.
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
        <div class="flex flex-justify-between" style={{ marginTop: '4rem' }}>
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
            // onclick={() => {
            //   this.initializeAgent(vnode);
            // }}
            onclick={vnode.attrs.continue}
          />
        </div>
      </>
    );
  }
}

class PasscodeFinished {
  view(vnode) {
    return (
      <>
        <h3>You are All Set!</h3>
        <div class="flex flex-justify-center" style={{ margin: '4.5rem 0' }}>
          <img src={passcodeImg} style={{ width: '50%' }} />
        </div>
        <p class="p-tag" style={{ margin: '2rem 0 0 0' }}>
          Your passcode has been changed. You are no longer able to use the old passcode to enter the software..
        </p>
        <div class="flex flex-justify-end" style={{ margin: '4rem 0 0 0' }}>
          <Button class="button--no-transform button--big" raised label="Close" onclick={vnode.attrs.continue} />
        </div>
      </>
    );
  }
}

class ManagePasscode {
  constructor() {
    this.currentState = 'changing-your-passcode';
  }
  view(vnode) {
    return (
      <>
        {this.currentState === 'changing-your-passcode' && (
          <ChangingPasscode
            continue={() => {
              this.currentState = 'generate-passcode';
            }}
          />
        )}
        {this.currentState === 'generate-passcode' && (
          <GeneratePasscode
            back={() => {
              this.currentState = 'changing-your-passcode';
            }}
            continue={() => {
              this.currentState = 'confirm-passcode';
            }}
          />
        )}
        {this.currentState === 'confirm-passcode' && (
          <EnterPasscode
            back={() => {
              this.currentState = 'generate-passcode';
            }}
            continue={() => {
              this.currentState = 'passcode-finished';
            }}
          />
        )}
        {this.currentState === 'passcode-finished' && (
          <PasscodeFinished
            continue={() => {
              this.currentState = 'changing-your-passcode';
            }}
          />
        )}
      </>
    );
  }
}

module.exports = ManagePasscode;
