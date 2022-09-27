import m from 'mithril';
import { Button, Modal, TextField } from '../../../src/app/components';
import { KERI, Keep, Profile } from '../../../src/app/services';
import createYourPasscode from '../../../src/assets/img/create-your-passcode.svg';
import passcodeImg from '../../../src/assets/img/passcode.svg';
import wait from '../../../src/assets/img/wait.svg';

class CreatePasscodeTask {
  constructor(config) {
    this.config = config;
    this.reset();
  }

  reset() {
    this._id = this.config.id;
    this._label = this.config.label;
    this._component = {
      view: (vnode) => {
        return <CreatePasscode end={vnode.attrs.end} parent={this} />;
      },
    };
    this.currentState = 'welcome';
  }

  get imgSrc() {
    return createYourPasscode;
  }

  get id() {
    return this._id;
  }

  get label() {
    return this._label;
  }

  get component() {
    return this._component;
  }
}

class CreatePasscode {
  constructor() {
    this.passcode = '';
    this.copied = false;
    this.savePassModalOpen = false;
    this.enterPasscode = '';
    this.showEnterPasscode = false;
    this.error = '';
    this.submitting = false;

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

  initializeAgent(vnode) {
    this.submitting = true;
    KERI.initializeAgent(Keep.getName(), this.enterPasscode)
      .then(() => {
        Profile.created = true;
        vnode.attrs.end();
      })
      .catch((err) => {
        console.log('initializeAgent', err);
        this.error = 'Error creating keystore with passcode entered.';
      })
      .finally(() => {
        this.submitting = false;
      });
  }

  view(vnode) {
    return (
      <>
        {vnode.attrs.parent.currentState === 'welcome' && (
          <>
            <h3 id="welcome">Welcome to KEEP</h3>
            <div class="flex flex-justify-center" style={{ margin: '4.5rem 0' }}>
              <img src={createYourPasscode} style={{ width: '205px' }} />
            </div>
            <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
              To get started and enter the software, you will need to generate a passcode.
              <br />
              <br />
              Make sure to store your password somewhere safe: a password management app, or printed and in a safe
              deposit box.
            </p>
            <div class="flex flex-justify-end">
              <Button
                id="continue"
                raised
                label="Continue"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'create-passcode';
                }}
              />
            </div>
          </>
        )}
        {vnode.attrs.parent.currentState === 'create-passcode' && (
          <>
            <Modal
              id="wait"
              isOpen={this.savePassModalOpen}
              onClose={() => {
                this.savePassModalOpen = false;
              }}
              style={{ width: '680px' }}
              header={<h1 class="font-weight--medium">Wait! Did you save your passcode?</h1>}
              footer={
                <>
                  <div class="flex flex-justify-center" style={{ marginTop: '2rem' }}>
                    <Button
                      id="passcode-saved"
                      raised
                      label="I Saved My Passcode"
                      onclick={() => {
                        this.savePassModalOpen = false;
                        vnode.attrs.parent.currentState = 'enter-passcode';
                      }}
                    />
                  </div>
                </>
              }
            >
              <div class="flex flex-align-center flex-justify-center">
                <img style={{ marginRight: '2rem' }} src={wait} />
                <h3 class="font-weight--light font-color--battleship" style={{ maxWidth: '280px' }}>
                  If you forget your passcode, you lose access to your wallet. Make sure that you store it someplace
                  safe.
                </h3>
              </div>
            </Modal>
            <h3 id="generate-passcode">Generate Your Passcode</h3>
            <div class="flex flex-justify-center" style={{ margin: '3rem 0 2rem 0' }}>
              <img src={createYourPasscode} style={{ width: '205px' }} />
            </div>
            <p class="p-tag" style={{ margin: '0 0 2.5rem 0' }}>
              Generate your passcode here or in your password management app such as 1Password or Last Pass to encrypt
              your desktop software and then copy into the following screen.
            </p>
            <TextField
              id="passcode"
              outlined
              fluid
              placeholder="xxxx-xxxxx-xxxxx-xxxx-xxxxx"
              autocomplete="off"
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
                id="generate"
                raised
                class="button--gray"
                label="Generate New"
                onclick={() => {
                  this.generatePasscode();
                }}
              />
            </div>
            <div class="flex flex-justify-between">
              <Button
                raised
                class="button--gray-dk"
                label="Go Back"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'welcome';
                }}
              />
              <Button
                id="continue"
                raised
                label="Continue"
                onclick={() => {
                  this.savePassModalOpen = true;
                }}
              />
            </div>
          </>
        )}
        {vnode.attrs.parent.currentState === 'enter-passcode' && (
          <>
            <h3 id="">Please Enter Your Passcode</h3>
            <div class="flex flex-justify-center" style={{ margin: '5rem 0' }}>
              <img src={passcodeImg} style={{ width: '205px' }} />
            </div>
            <p class="p-tag" style={{ margin: '0 0 3rem 0' }}>
              You can find your 21 character passcode by referring back to your storage spot (1Password, Last Pass, Safe
              Deposit Box) and entering it into the box below.
            </p>
            <TextField
              id="confirm-passcode"
              outlined
              fluid
              type={this.showEnterPasscode ? 'text' : 'password'}
              autocomplete="off"
              value={this.enterPasscode}
              oninput={(e) => {
                this.enterPasscode = e.target.value;
              }}
              iconTrailing={{
                icon: this.showEnterPasscode ? 'visibility' : 'visibility_off',
                onclick: () => {
                  this.showEnterPasscode = !this.showEnterPasscode;
                },
              }}
            />
            {this.error && <p class="error">{this.error}</p>}
            <div class="flex flex-justify-between" style={{ marginTop: '4rem' }}>
              <Button
                raised
                class="button--gray-dk"
                label="Go Back"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'create-passcode';
                }}
              />
              <Button
                id="initialize"
                raised
                label="Continue"
                disabled={!this.enterPasscode || this.submitting}
                onclick={() => {
                  this.initializeAgent(vnode);
                }}
              />
            </div>
          </>
        )}
      </>
    );
  }
}

module.exports = CreatePasscodeTask;
