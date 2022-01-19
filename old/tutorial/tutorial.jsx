import { Button, Container, Steps } from '../../components';
import './tutorial.scss';
import addNewContacts from '../../../assets/img/add-new-contacts.png';
import configureIdentifier from '../../../assets/img/configure-identifier.png';
import createYourPasscode from '../../../assets/img/create-your-passcode.png';
import verifyCredentials from '../../../assets/img/verify-credentials.png';

import m from 'mithril';

class Tutorial {
  constructor() {
    this.secondsPerStep = 5;
    this.steps = [
      {
        header: `Create Your Passcode`,
        subheader: `Getting started is easy, first we need to secure your new software with a passcode. `,
        image: createYourPasscode,
      },
      {
        header: `Establish an Identifier`,
        subheader: `Create an identifier that is yours going forward that you can utilize to connect with and verify others.`,
        image: configureIdentifier,
      },
      {
        header: `Verify Connections`,
        subheader: `Add connections after obtaining their contact card. Verify your contacts over a short zoom call.`,
        image: addNewContacts,
      },
      {
        header: `Receive Credentials`,
        subheader: `Store and manage credentials in your digital wallet.`,
        image: verifyCredentials,
      },
    ];
    this.stepSelectedIdx = 0;
    this.stepSelected = this.steps[0];
  }

  oninit() {
    this.startTimer();
  }

  onremove() {
    this.stopTimer();
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.stepSelectedIdx >= 3) {
        this.stepSelectedIdx = 0;
      } else {
        this.stepSelectedIdx++;
      }
      this.stepSelected = this.steps[this.stepSelectedIdx];
      m.redraw();
    }, 1000 * this.secondsPerStep);
  }

  stopTimer() {
    clearInterval(this.interval);
  }

  view() {
    return (
      <>
        <Container>
          <div class="headspace text--center">
            <h1>Welcome to KEEP</h1>
            <p class="font-color--light">
              Getting started is easy, after the sign-up process, you can add and verify connections, request your own
              credentials and store contact information for later use.
            </p>
          </div>
          {this.stepSelected && (
            <div class="headspace tutorial">
              <div class="tutorial__info">
                <h1>{this.stepSelected.header}</h1>
                <h3 class="font-weight--normal font-color--light">{this.stepSelected.subheader}</h3>
                <Steps
                  count={this.steps.length}
                  selected={this.stepSelectedIdx}
                  selectedChange={(idx) => {
                    this.stepSelectedIdx = idx;
                    this.stepSelected = this.steps[this.stepSelectedIdx];
                    // Restart the timer
                    this.stopTimer();
                    this.startTimer();
                  }}
                  style={{ marginBottom: '1rem' }}
                ></Steps>
                <Button
                  ripple
                  raised
                  class="button--big"
                  label="Get Started"
                  onclick={() => {
                    m.route.set('/auth/create-passcode');
                  }}
                />
              </div>
              <div class="tutorial__image__container">
                <img class="tutorial__image" src={this.stepSelected.image} />
              </div>
            </div>
          )}
        </Container>
      </>
    );
  }
}

module.exports = Tutorial;
