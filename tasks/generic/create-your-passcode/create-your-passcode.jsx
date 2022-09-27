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
            <img class="task-img task-img--centered" src={createYourPasscode} />
            <p class="p-tag">To get started, you will need to generate a passcode.</p>
            <p class="p-tag">
              Make sure to store your password somewhere safe: a password management app, or printed and in a safe
              deposit box.
            </p>
            <div class="flex flex-justify-end margin-top-2">
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
              style={{ width: '480px' }}
            >
              <h3>Wait! Did you save your passcode?</h3>
              <div class="flex flex-justify-center">
                <img class="margin-right-2" style={{ width: '90px' }} src={wait} />
                <p class="p-tag">
                  If you forget your passcode, you lose access to Keep. Make sure that you store it someplace safe.
                </p>
              </div>
              <div class="flex flex-justify-center margin-top-2">
                <Button
                  id="passcode-saved"
                  raised
                  label="I saved my passcode"
                  onclick={() => {
                    this.savePassModalOpen = false;
                    vnode.attrs.parent.currentState = 'enter-passcode';
                  }}
                />
              </div>
            </Modal>
            <h3 id="generate-passcode">Generate Your Passcode</h3>
            <img class="task-img task-img--centered" src={createYourPasscode} />
            <p class="p-tag">
              Generate your passcode here or in your password management app such as 1Password or Last Pass to encrypt
              your desktop software. After you have generated your passcode, copy the text to paste into the next
              screen.
            </p>
            <TextField
              id="passcode"
              outlined
              fluid
              placeholder="xxxx-xxxxx-xxxxx-xxxx-xxx"
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
            <div class="flex flex-justify-end flex-align-center margin-top-1">
              <p class="font-size--12 font-color--green font-weight--semi-bold margin-right-2">
                {this.copied ? 'Passcode copied!' : <br />}
              </p>
              <Button
                id="generate"
                outlined
                label="Generate"
                onclick={() => {
                  this.generatePasscode();
                }}
              />
            </div>
            <div class="flex flex-justify-between margin-top-2">
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
            <img class="task-img task-img--centered" src={passcodeImg} />
            <p class="p-tag">Paste your passcode below or retrieve it from your password management app.</p>
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
            <div class="info">
              <span class="info-icon material-icons-outlined">info</span>
              <p class="body-text-2">Make sure this passcode matches the one you stored.</p>
            </div>
            <div class="flex flex-justify-between margin-top-2">
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
                label="Login"
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
