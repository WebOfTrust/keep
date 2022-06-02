import m from 'mithril';
import { Button, Modal, TextField, Card, Checkbox } from '../../../src/app/components';
import { KERI } from '../../../src/app/services';
import createYourPasscode from '../../../src/assets/img/create-your-passcode.svg';
import passcodeImg from '../../../src/assets/img/passcode.svg';
import wait from '../../../src/assets/img/wait.svg';

class CreatePasscodeTask {
  constructor(config) {
    this._label = config.label;
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
    KERI.initializeAgent(`keep-${process.env.USER_TYPE}-${process.env.API_PORT}`, this.enterPasscode)
      .then(vnode.attrs.end)
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
        {/* {vnode.attrs.parent.currentState === 'welcome' && (
          <>
            // Confirmed Outgoing Challenge Requests
            <h3>Outgoing Challenge Requests</h3>

            <div style={{ maxHeight: '350px', overflowY: 'scroll', margin: '2rem 0 1rem 0' }}>
              <p class="p-tag" style={{ margin: '0 0 2rem 0' }}>
                Others Challenging You
              </p>
              <p class="p-tag">In progress: 1/1 confirmed</p>
              <Card style={{ margin: '0 0 2rem 0' }}>
                <div class="flex" style={{ flexDirection: 'column' }}>
                  <div class="flex flex-justify-between" style={{ margin: '.5rem 0 .5rem 0' }}>
                    <p class="p-tag-bold">Alias</p>
                    <TextField outlined fluid placeholder="Jane Smith" style={{ width: '70%' }} />
                  </div>
                  <div class="flex flex-justify-between" style={{ margin: '.5rem 0 .5rem 0' }}>
                    <p class="p-tag-bold">Message:</p>
                    <TextField
                      textarea
                      outlined
                      fluid
                      placeholder="this is a message you could type."
                      style={{ width: '70%', height: '90px' }}
                    />
                  </div>
                  <div class="flex flex-justify-between" style={{ marginTop: '10px' }}>
                    <div class="flex">
                      <label
                        class="font-color--battleship"
                        style={{ marginTop: '1rem', fontWeight: 'bold', textDecoration: 'underline' }}
                      >
                        Confirmed?
                      </label>
                      <Checkbox />
                    </div>

                    <Button
                      class="button--no-transform button--big"
                      raised
                      label="Resend"
                      onclick={() => {
                        vnode.attrs.parent.currentState = 'create-passcode';
                      }}
                    />
                  </div>
                </div>
              </Card>
            </div>
            <div class="flex flex-justify-between" style={{ marginTop: '2rem' }}>
              <Button
                raised
                class="button--no-transform button--gray-dk button--big"
                label="Go Back"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'welcome';
                }}
              />
              <Button
                class="button--no-transform button--big"
                raised
                label="In Progress"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'create-passcode';
                }}
              />
            </div>
          </>
        )} */}

        {/* {vnode.attrs.parent.currentState === 'welcome' && (
          <>
            // ENTER OOBIs
            <h3>Enter OOBIs</h3>

            <div style={{ maxHeight: '350px', overflowY: 'scroll', margin: '2rem 0 1rem 0' }}>
              <p class="p-tag">
                Enter AIDs, URLs and Aliases you received on the Video Call from all participants below:{' '}
              </p>
              <Card style={{ margin: '0 0 2rem 0' }}>
                <div class="flex" style={{ flexDirection: 'column' }}>
                  <div class="flex flex-justify-between" style={{ margin: '.5rem .5rem .5rem .5rem' }}>
                    <p class="p-tag-bold">AID:</p>
                    <TextField outlined fluid placeholder="Jane Smith" style={{ width: '70%' }} />
                  </div>
                  <div class="flex flex-justify-between" style={{ margin: '.5rem .5rem .5rem .5rem' }}>
                    <p class="p-tag-bold">URL:</p>
                    <TextField outlined fluid placeholder="Jane Smith" style={{ width: '70%' }} />
                  </div>
                  <div class="flex flex-justify-between" style={{ margin: '.5rem .5rem .5rem .5rem' }}>
                    <p class="p-tag-bold">Alias:</p>
                    <TextField outlined fluid placeholder="Jane Smith" style={{ width: '70%' }} />
                  </div>
                </div>
              </Card>
            </div>
            <div class="flex flex-justify-between" style={{ marginTop: '2rem' }}>
              <Button
                raised
                class="button--no-transform button--gray-dk button--big"
                label="Go Back"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'welcome';
                }}
              />
              <Button
                class="button--no-transform button--big"
                raised
                label="Continue"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'create-passcode';
                }}
              />
            </div>
          </>
        )} */}
        {/* {vnode.attrs.parent.currentState === 'welcome' && (
          <>
          // LEAD CHALLENGE WITH ENTERNAL GAR QAR
            <h3>Enter Challenge Messages Below</h3>

            <div style={{ maxHeight: '350px', overflowY: 'scroll', margin: '2rem 0 1rem 0' }}>
              <p class="p-tag">In progress: 2/12 confirmed</p>
              <Card style={{ margin: '0 0 2rem 0' }}>
                <div class="flex" style={{ flexDirection: 'column' }}>
                  <div class="flex flex-justify-between" style={{ margin: '.5rem 0 .5rem 0' }}>
                    <p class="p-tag-bold">Alias</p>
                    <TextField outlined fluid placeholder="Jane Smith" style={{ width: '70%' }} />
                  </div>
                  <div class="flex flex-justify-between" style={{ margin: '.5rem 0 .5rem 0' }}>
                    <p class="p-tag-bold">Message:</p>
                    <TextField
                      textarea
                      outlined
                      fluid
                      placeholder="this is a message you could type."
                      style={{ width: '70%', height: '90px' }}
                    />
                  </div>
                  <div class="flex flex-justify-end" style={{ marginTop: '10px' }}>
                    <Button
                      class="button--no-transform button--big"
                      raised
                      label="Send"
                      onclick={() => {
                        vnode.attrs.parent.currentState = 'create-passcode';
                      }}
                    />
                  </div>
                </div>
              </Card>
              <Card style={{ margin: '0 0 2rem 0' }}>
                <div class="flex" style={{ flexDirection: 'column' }}>
                  <div class="flex flex-justify-between" style={{ margin: '.5rem 0 .5rem 0' }}>
                    <p class="p-tag-bold">Alias</p>
                    <TextField outlined fluid placeholder="Jane Smith" style={{ width: '70%' }} />
                  </div>
                  <div class="flex flex-justify-between" style={{ margin: '.5rem 0 .5rem 0' }}>
                    <p class="p-tag-bold">Message:</p>
                    <TextField
                      textarea
                      outlined
                      fluid
                      placeholder="this is a message you could type"
                      style={{ width: '70%', height: '90px' }}
                    />
                  </div>
                  <div class="flex flex-justify-end" style={{ marginTop: '10px' }}>
                    <label
                      class="font-color--battleship"
                      style={{ marginTop: '1rem', fontWeight: 'bold', textDecoration: 'underline' }}
                    >
                      Out of Band Confirmation
                    </label>
                    <Checkbox />
                  </div>
                </div>
              </Card>
            </div>
            <div class="flex flex-justify-between" style={{ marginTop: '2rem' }}>
              <Button
                raised
                class="button--no-transform button--gray-dk button--big"
                label="Go Back"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'welcome';
                }}
              />
              <Button
                class="button--no-transform button--big"
                raised
                label="In Progress"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'create-passcode';
                }}
              />
            </div>
          </>
        )} */}
        {vnode.attrs.parent.currentState === 'welcome' && (
          <>
            <h3>Welcome to KEEP</h3>
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
                class="button--no-transform button--big"
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
                        vnode.attrs.parent.currentState = 'enter-passcode';
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
              Generate your passcode here or in your password management app such as 1Password or Last Pass to encrypt
              your desktop software and then copy into the following screen.
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
                onclick={() => {
                  vnode.attrs.parent.currentState = 'welcome';
                }}
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
        )}
        {vnode.attrs.parent.currentState === 'enter-passcode' && (
          <>
            <h3>Please Enter Your Passcode</h3>
            <div class="flex flex-justify-center" style={{ margin: '5rem 0' }}>
              <img src={passcodeImg} style={{ width: '205px' }} />
            </div>
            <p class="p-tag" style={{ margin: '0 0 3rem 0' }}>
              You can find your 22-character passcode by referring back to your storage spot (1Password, Last Pass, Safe
              Deposit Box) and entering it into the box below.
            </p>
            <TextField
              outlined
              fluid
              type={this.showEnterPasscode ? 'text' : 'password'}
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
                class="button--no-transform button--gray-dk button--big"
                label="Go Back"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'create-passcode';
                }}
              />
              <Button
                raised
                class="button--no-transform button--big"
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
