import m from 'mithril';
import { Button, Card, TextField } from '../../../src/app/components';
import createIdentifier from '../../../src/assets/img/create-identifier.png';
import configureIdentifier from '../../../src/assets/img/configure-identifier.png';
import approveRequest from '../../../src/assets/img/approve-request.png';
import uploadImage from '../../../src/assets/img/upload-image.png';
import addNewContacts from '../../../src/assets/img/add-new-contacts.png';
import githubLogo from '../../../src/assets/img/github-logo.png';
import liOne from '../../../src/assets/img/li-one.png';
import liTwo from '../../../src/assets/img/li-two.png';
import liThree from '../../../src/assets/img/li-three.png';
import liFour from '../../../src/assets/img/li-four.png';
import liFive from '../../../src/assets/img/li-five.png';
class JoinVideoCall {
  constructor(vnode) {
    this.step = 0;
    this.steps = [
      <>
        <h3>GLEIF Genesis Event</h3>
        <p
          class="font-color--battleship"
          style={{ letterSpacing: '.15px', lineHeight: '1.38', margin: '4rem, 0 4rem 0' }}
        >
          This module will take you through the steps for GLEIF AID Genesis.
        </p>
        <h3>Steps to Create GLEIF Root AID</h3>
        <p
          class="font-color--battleship"
          style={{ letterSpacing: '.15px', lineHeight: '1.38', margin: '4rem, 0 4rem 0' }}
        >
          <div class="flex flex-column">
            <div class="flex" style={{ alignItems: 'center', margin: '0 0 0 2rem' }}>
              <img src={liOne} style={{ margin: '1rem 10px 1rem 0' }} />
              <p
                class="font-color--battleship"
                style={{ letterSpacing: '.15px', lineHeight: '1.38', margin: '4rem, 0 4rem 0' }}
              >
                Join a Video Call with all GLEIF Controllers.
              </p>
            </div>
            <div class="flex" style={{ alignItems: 'center', margin: '0 0 0 2rem' }}>
              <img src={liTwo} style={{ margin: '1rem 10px 1rem 0' }} />
              <p
                class="font-color--battleship"
                style={{ letterSpacing: '.15px', lineHeight: '1.38', margin: '4rem, 0 4rem 0' }}
              >
                Use an OOBI protocol to share your GLEIF Delegated AID and service endpoints with the other Controllers.
              </p>
            </div>
            <div class="flex" style={{ alignItems: 'center', margin: '0 0 0 2rem' }}>
              <img src={liThree} style={{ margin: '1rem 10px 1rem 0' }} />
              <p
                class="font-color--battleship"
                style={{ letterSpacing: '.15px', lineHeight: '1.38', margin: '4rem, 0 4rem 0' }}
              >
                Send a Challenge Response Message to the other Controllers.
              </p>
            </div>
            <div class="flex" style={{ alignItems: 'center', margin: '0 0 0 2rem' }}>
              <img src={liFour} style={{ margin: '1rem 10px 1rem 0' }} />
              <p
                class="font-color--battleship"
                style={{ letterSpacing: '.15px', lineHeight: '1.38', margin: '4rem, 0 4rem 0' }}
              >
                GLEIF Controllers sign and return Challenge Message.
              </p>
            </div>
            <div class="flex" style={{ alignItems: 'center', margin: '0 0 0 2rem' }}>
              <img src={liFive} style={{ margin: '1rem 10px 1rem 0' }} />
              <p
                class="font-color--battleship"
                style={{ letterSpacing: '.15px', lineHeight: '1.38', margin: '4rem, 0 4rem 0' }}
              >
                Each GLEIF Controller must verify all signatures.
              </p>
            </div>
          </div>
        </p>
        <div class="flex flex-justify-end">
          <Button
            class="button--big button--no-transform"
            raised
            label="Continue"
            onclick={() => {
              this.step++;
            }}
          />
        </div>
      </>,
      <>
        <h3>Join a Video Call</h3>
        <p
          class="font-color--battleship"
          style={{ letterSpacing: '.15px', lineHeight: '1.38', marginTop: '2rem', marginBottom: '2rem' }}
        >
          In order to start the authentication process, you will need to initiate an real-time OOBI session in which you
          and the other GRACs are present, You will accept all their text strings on a Video Call so that you can
          receive their identifying information.
          <br />
          <br />
        </p>
        <h3>Generate OOBI</h3>
        <br />
        <br />
        <div class="flex flex-justify-between">
          <Button
            class="button--gray-dk button--big button--no-transform"
            raised
            label="Go Back"
            onclick={() => {
              this.step--;
            }}
          />
          <Button
            class="button--big button--no-transform"
            raised
            label="Generate"
            onclick={() => {
              this.step++;
            }}
          />
        </div>
      </>,
      <>
        <img src={addNewContacts} style={{ width: '50%', margin: '4rem 0 0 0' }} />
        <h3>
          Send OOBI to <u>GRACs</u>
        </h3>
        <p
          class="font-color--battleship"
          style={{ letterSpacing: '.15px', lineHeight: '1.38', margin: '2rem 0 2rem 0' }}
        >
          Copy this OOBI (AID + URL) to share your identifying information with the GRACs, and paste it into the Video
          Call.
        </p>
        <h3>AID:</h3>
        <TextField outlined style={{ height: '3rem', width: '100%', margin: '0 0 4rem 0' }} />
        <h3>URL:</h3>
        <TextField outlined style={{ height: '3rem', width: '100%', margin: '0 0 4rem 0' }} />
        <div class="flex flex-justify-between">
          <Button
            class="button--gray-dk button--big button--no-transform"
            raised
            label="Go Back"
            onclick={() => {
              this.step--;
            }}
          />
          <Button
            class="button--big button--no-transform"
            raised
            label="Continue"
            onclick={() => {
              this.step++;
            }}
          />
        </div>
      </>,
      <>
        <h3>Review and Confirm</h3>
        <div class="flex flex-justify-between" style={{ alignItems: 'baseline' }}>
          <p
            class="font-color--battleship"
            style={{ letterSpacing: '.15px', lineHeight: '1.38', marginTop: '2rem', marginBottom: '2.5rem' }}
          >
            Alias:
          </p>
          <Button
            class="button--gray button--small button--no-transform"
            raised
            label="Edit"
            style={{ padding: '0 2rem 0 2rem', height: '2rem' }}
            onclick={() => {
              this.step = 3;
            }}
          />
        </div>
        <TextField outlined style={{ height: '3rem', width: '100%' }} />
        {/*<div class="flex flex-justify-between" style={{ alignItems: 'baseline' }}>
          <p
            class="font-color--battleship"
            style={{ letterSpacing: '.15px', lineHeight: '1.38', marginTop: '2rem', marginBottom: '2.5rem' }}
          >
            Witnesses:
          </p>
          <Button
            class="button--gray button--small button--no-transform"
            raised
            label="Edit"
            style={{ padding: '0 2rem 0 2rem', height: '2rem' }}
          />
        </div>
        <TextField outlined style={{ height: '3rem', width: '100%' }} />*/}
        <div class="flex flex-justify-between" style={{ alignItems: 'baseline' }}>
          <p
            class="font-color--battleship"
            style={{ letterSpacing: '.15px', lineHeight: '1.38', marginTop: '2rem', marginBottom: '2.5rem' }}
          >
            Alias Photo:
          </p>
          <Button
            class="button--gray button--small button--no-transform"
            raised
            label="Edit"
            style={{ padding: '0 2rem 0 2rem', height: '2rem' }}
          />
        </div>
        <img src={githubLogo} style={{ width: '20%', margin: '0 0 0 0' }} />
        <div class="flex flex-justify-end">
          <Button class="button--big button--no-transform" raised label="Continue" onclick={vnode.attrs.end} />
        </div>
      </>,
    ];
  }

  view() {
    return <>{this.steps[this.step]}</>;
  }
}

module.exports = JoinVideoCall;
