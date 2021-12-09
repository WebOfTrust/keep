import m from 'mithril';
import { Button, Container, IconButton, Modal } from '../../../components';
import './create-passcode.scss';
import createYourPasscode from '../../../../assets/img/create-your-passcode.png';
import wait from '../../../../assets/img/wait.png';

class CreatePasscode {
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
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 22; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    this.passcode = result;
  }

  view() {
    return (
      <>
        <Modal
          isOpen={this.savePassModalOpen}
          onClose={() => {
            this.savePassModalOpen = false;
          }}
          style={{ width: '680px' }}
          header={<h1>Wait! Did you save your passcode?</h1>}
          content={
            <>
              <div class="flex flex-align-center flex-justify-center">
                <img style={{ marginRight: '2rem' }} src={wait} />
                <h3 class="font-color--light" style={{ maxWidth: '280px' }}>
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
                  class="button__big button__extraPadding"
                  label="I Saved My Passcode"
                  onclick={() => {
                    this.savePassModalOpen = false;
                    m.route.set('/auth/enter-passcode');
                  }}
                />
              </div>
            </>
          }
        />
        <Container class="headspace flex flex-align-center">
          <div class="flex-2">
            <img src={createYourPasscode} />
          </div>
          <div class="flex-3" style="padding: 1rem">
            <h1>Create a Passcode</h1>
            <p class="font-color--light">
              Generate your passcode here to encrypt your desktop software and then copy into the following screen. Make
              sure to store your password somewhere safe: either in 1Password, Last Pass, a comparable app, or printed
              and in a safe deposit box.
            </p>
            <div class="passcodeInput">
              <div
                class="passcode"
                onclick={() => {
                  this.copyPasscode();
                }}
              >
                <span>{this.passcode}</span>
                <i class="fas fa-copy"></i>
              </div>
              <Button
                raised
                ripple
                class="button__gray"
                label="Generate New"
                onclick={() => {
                  this.generateNewPasscode();
                }}
              />
            </div>
            {this.copied ? <p class="font-color--green font-weight--medium">Passcode is copied!</p> : null}
            {/*<div class="flex flex-justify-between" style={{ marginTop: '2rem' }}>
              <Button label="Use 1Password" />
              <Button label="Use Last Pass" />
            </div>*/}
            <div class="flex flex-justify-end" style={{ marginTop: '2rem' }}>
              <Button
                raised
                label="Continue"
                onclick={() => {
                  this.savePassModalOpen = true;
                }}
              />
            </div>
          </div>
        </Container>
      </>
    );
  }
}

module.exports = CreatePasscode;
