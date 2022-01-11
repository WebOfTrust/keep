import m from 'mithril';
import { Button, Container, Modal } from '../../../components';
import './create-passcode.scss';
import createYourPasscode from '../../../../assets/img/create-your-passcode.png';
import wait from '../../../../assets/img/wait.png';
import { API } from '../../../services';

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

    API.Passcode.create()
      .then((resp) => {
        console.log(resp);
        this.passcode = resp;
      })
      .catch((err) => {
        // do something
        console.log(err);
      });
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
          header={<h1 class="font-weight--medium">Wait! Did you save your passcode?</h1>}
          content={
            <>
              <div class="flex flex-align-center flex-justify-center">
                <img style={{ marginRight: '2rem' }} src={wait} />
                <h3 class="font-weight--light font-color--light" style={{ maxWidth: '280px' }}>
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
        <Container class="headspace flex">
          <div class="flex-2">
            <img src={createYourPasscode} />
          </div>
          <div class="flex-3" style="padding: 0 1rem">
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
                <span class="material-icons">content_copy</span>
              </div>
              <Button
                raised
                ripple
                class="button__gray button__big"
                label="Generate New"
                onclick={() => {
                  this.generateNewPasscode();
                }}
              />
            </div>
            <p class="font-color--green font-weight--medium">{this.copied ? 'Passcode copied!' : <br />}</p>
            {/*<div class="flex flex-justify-between" style={{ marginTop: '2rem' }}>
              <Button label="Use 1Password" />
              <Button label="Use Last Pass" />
            </div>*/}
            <div class="flex flex-justify-end">
              <Button
                raised
                class="button__big"
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
