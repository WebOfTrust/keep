import m from 'mithril';
import { Button, Container, Modal, TextField } from '../../../src/app/components';
import { API } from '../../../src/app/services';
import createYourPasscode from '../../../src/assets/img/create-your-passcode.png';
import passcodeImg from '../../../src/assets/img/passcode.png';
import wait from '../../../src/assets/img/wait.png';

class WelcomeToKEEP {
  view(vnode) {
    return (
      <>
        <h3>Welcome to KEEP</h3>
        <div class="flex flex-justify-center" style={{ margin: '4.5rem 0' }}>
          <img src={createYourPasscode} style={{ width: '192px' }} />
        </div>
        <p class="font-color--battleship" style={{ margin: '0 0 8rem 0', lineHeight: '1.38', letterSpacing: '0.15px' }}>
          To get started and enter the software, you will need to generate a passcode.
          <br />
          <br />
          Make sure to store your password somewhere safe: a password management app, or printed and in a safe deposit
          box.
        </p>
        <div class="flex flex-justify-end">
          <Button class="button--no-transform button--big" raised label="Continue" onclick={vnode.attrs.continue} />
        </div>
      </>
    );
  }
}

class GeneratePasscode {
  constructor() {
    this.passcode = '';
    this.copied = false;
    this.savePassModalOpen = false;
    this.generateNewPasscode();
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

  generateNewPasscode() {
    this.copied = false;
    API.Passcode.create()
      .then((resp) => {
        this.passcode = resp;
        console.log(this.passcode);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  view(vnode) {
    return (
      <>
        <Modal
          isOpen={this.savePassModalOpen}
          onClose={() => {
            this.savePassModalOpen = false;
          }}
          style={{ width: '680px' }}
          header={<h1 class="font-weight--medium">Wait! Did you save your passcode?</h1>}
          content={
            <>
              <div class="flex flex-align-center flex-justify-center">
                <img style={{ marginRight: '2rem' }} src={wait} />
                <h3 class="font-weight--light font-color--battleship" style={{ maxWidth: '280px' }}>
                  If you forget your passcode, you lose access to your wallet. Make sure that you store it someplace
                  safe.
                </h3>
              </div>
            </>
          }
          footer={
            <>
              <div class="flex flex-justify-center" style={{ marginTop: '2rem' }}>
                <Button
                  raised
                  class="button--big button--extraPadding"
                  label="I Saved My Passcode"
                  onclick={() => {
                    this.savePassModalOpen = false;
                    vnode.attrs.continue();
                  }}
                />
              </div>
            </>
          }
        />
        <h3>Generate Your Passcode</h3>
        <div class="flex flex-justify-center" style={{ margin: '4.5rem 0' }}>
          <img src={createYourPasscode} style={{ width: '192px' }} />
        </div>
        <p
          class="font-color--battleship"
          style={{ margin: '0 0 2.5rem 0', lineHeight: '1.38', letterSpacing: '0.15px' }}
        >
          Generate your passcode here or in your password management app such as 1Password or Last Pass to encrypt your
          desktop software and then copy into the following screen.
        </p>
        <TextField
          outlined
          fluid
          placeholder="xxxx-xxxxx-xxxxx-xxxx-xxxxx"
          iconTrailing={{
            icon: 'content_copy',
            onclick: () => {
              this.copyPasscode();
            },
          }}
        />
        <div class="flex flex-justify-between" style={{ margin: '1rem 0 5.5rem' }}>
          <p class="font-color--green font-weight--medium">{this.copied ? 'Passcode copied!' : <br />}</p>
          <Button
            raised
            class="button--no-transform button--gray button--big"
            label="Generate New"
            onclick={() => {
              this.generateNewPasscode();
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
            onclick={() => {
              this.savePassModalOpen = true;
            }}
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

  view(vnode) {
    return (
      <>
        <h3>Please Enter Your Passcode</h3>
        <div class="flex flex-justify-center" style={{ margin: '4.5rem 0' }}>
          <img src={passcodeImg} style={{ width: '192px' }} />
        </div>
        <p class="font-color--battleship" style={{ margin: '0 0 3rem 0', lineHeight: '1.38', letterSpacing: '0.15px' }}>
          You can find your 22-character passcode by referring back to your storage spot (1Password, Last Pass, Safe
          Deposit Box) and entering it into the box below.
        </p>
        <TextField
          outlined
          fluid
          pattern={'^[a-zA-Z0-9]{22}$'}
          maxlength="22"
          iconTrailing={{
            icon: this.showPasscode ? 'visibility_off' : 'visibility',
            onclick: () => {
              this.showPasscode = !this.showPasscode;
            },
          }}
          oninput={(e) => {
            this.passcode = e.target.value;
          }}
          type={this.showPasscode ? 'text' : 'password'}
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

class CreatePasscode {
  constructor() {
    this.currentState = 'welcome';
  }

  view(vnode) {
    return (
      <>
        {this.currentState === 'welcome' && (
          <WelcomeToKEEP
            continue={() => {
              this.currentState = 'create-passcode';
            }}
          />
        )}
        {this.currentState === 'create-passcode' && (
          <GeneratePasscode
            back={() => {
              this.currentState = 'welcome';
            }}
            continue={() => {
              this.currentState = 'enter-passcode';
            }}
          />
        )}
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

module.exports = CreatePasscode;
