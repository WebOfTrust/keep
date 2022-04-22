import m from 'mithril';
import { Button, Modal, TextField } from '../../../src/app/components';
import { KERI } from '../../../src/app/services';
import createYourPasscode from '../../../src/assets/img/create-your-passcode.png';
import passcodeImg from '../../../src/assets/img/passcode.png';
import wait from '../../../src/assets/img/wait.png';

class WelcomeToKEEP {
  view(vnode) {
    return (
      <>
        <h3>Welcome to KEEP</h3>
        <div class="flex flex-justify-center" style={{ margin: '4.5rem 0' }}>
          <img src={createYourPasscode} style={{ width: '205px' }} />
        </div>
        <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
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
      })
      .catch((err) => {
        console.log('generatePasscode', err);
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
        <div class="flex flex-justify-center" style={{ margin: '3rem 0 2rem 0' }}>
          <img src={createYourPasscode} style={{ width: '205px' }} />
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
        <div class="flex flex-justify-between" style={{ margin: '2.5rem 0 3rem 0' }}>
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

  initializeAgent(vnode) {
    KERI.initializeAgent(`keep${process.env.API_PORT}`, this.passcode)
      .then(vnode.attrs.continue)
      .catch((err) => {
        console.log('initializeAgent', err);
      });
  }

  view(vnode) {
    return (
      <>
        <h3>Please Enter Your Passcode</h3>
        <div class="flex flex-justify-center" style={{ margin: '5rem 0 4rem 0' }}>
          <img src={passcodeImg} style={{ width: '205px' }} />
        </div>
        <p class="p-tag" style={{ margin: '0 0 4rem 0' }}>
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
            onclick={() => {
              this.initializeAgent(vnode);
            }}
          />
        </div>
      </>
    );
  }
}

class CreateYourPasscode {
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

module.exports = CreateYourPasscode;
