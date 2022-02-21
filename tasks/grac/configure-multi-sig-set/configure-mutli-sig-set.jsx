import m from 'mithril';
import { Button, Card, TextField } from '../../../src/app/components';
import createIdentifier from '../../../src/assets/img/create-identifier.png';
import configureIdentifier from '../../../src/assets/img/configure-identifier.png';
import approveRequest from '../../../src/assets/img/approve-request.png';
import uploadImage from '../../../src/assets/img/upload-image.png';
import uploadFile from '../../../src/assets/img/upload-file.png';
import projectPlanning from '../../../src/assets/img/project-planning.png';
import addNewContacts from '../../../src/assets/img/add-new-contacts.png';
import responseMessage from '../../../src/assets/img/response-message.png';
import secureMessaging from '../../../src/assets/img/secure-messaging.png';
import githubLogo from '../../../src/assets/img/github-logo.png';
import liOne from '../../../src/assets/img/li-one.png';
import liTwo from '../../../src/assets/img/li-two.png';
import liThree from '../../../src/assets/img/li-three.png';
import liFour from '../../../src/assets/img/li-four.png';
import liFive from '../../../src/assets/img/li-five.png';
class ConfigureMultiSig {
  tempConfigureArray = [
    {
      number: 1,
      name: 'Jane Smith',
      date: '1/3',
    },
    {
      number: 2,
      name: 'Michael Williams',
      date: '1/3',
    },
    {
      number: 3,
      name: 'ZG4jvw9bTmVd5X92iKYmfT',
      date: '1/3',
    },
    {
      number: 4,
      name: 'OG8jvw9bTmUd5J92iKYmfU',
      date: '1/3',
    },
    {
      number: 5,
      name: 'Joe Roberts',
      date: '1/7',
    },
    {
      number: 6,
      name: 'OG8jvw9bTmUd5J92iKYmfU',
      date: '1/7',
    },
  ];

  constructor(vnode) {
    this.step = 0;
    this.steps = [
      <>
        <img src={secureMessaging} style={{ width: '50%', margin: '4rem 0 1rem 0' }} />
        <h3>Configure Multi-Sig Set as GLEIF Genesis Controller</h3>
        <br />

        <p class="p-tag">
          If you are seeing this, it is because you have a sufficient number and correct combination of verified
          contacts to configure the multi-sig set. Make sure that all members of the multi-sig group are available for
          an OOBI exchange.
        </p>
        <br />
        <br />

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
        <h3>Select Multi-Sig Group Members</h3>
        <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
          Please select in order the multi-sig group members you’d like to add. The order is determined by the multi-sig
          threshold.
        </p>
        <br />

        <div style={{ height: '350px', overflowY: 'scroll', margin: '0 0 1rem 0' }}>
          {this.tempConfigureArray.map((sig) => {
            return (
              <div
                class="flex flex-justify-evenly "
                style={{ alignItems: 'center', margin: '0 0 1.5rem 0', width: '100%' }}
              >
                <h4 class="p-tag" style={{ margin: '0 0 0 0' }}>
                  {`#${sig.number}`}
                </h4>
                <div
                  class="flex flex-align-center"
                  style={{ width: '68%', backgroundColor: 'white', height: '40px', borderRadius: '3px' }}
                >
                  <p
                    class="font-color--battleship"
                    style={{
                      letterSpacing: '.15px',
                      lineHeight: '1.38',
                      margin: '0 0 0 .5rem',
                    }}
                  >
                    {sig.name}
                  </p>
                </div>
                <h4 class="p-tag" style={{ margin: '0 0 0 0' }}>
                  {sig.date}
                </h4>
              </div>
            );
          })}
        </div>
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
        <img src={uploadFile} style={{ width: '50%', margin: '4rem 0 0 0' }} />
        <h3>Multi-Signature Verification in Progress</h3>
        <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
          You will be notified when the GRACs verify that the Root AID witnesses their signature on the Root AID
          Inception Event.
        </p>
        <div class="flex flex-justify-end">
          <Button
            class="button--big button--no-transform"
            raised
            label="View Progress"
            onclick={() => {
              this.step++;
            }}
          />
        </div>
      </>,
      <>
        <h3>Accept OOBIs</h3>
        <div class="flex flex-justify-between" style={{ alignItems: 'baseline' }}>
          <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
            Enter AIDs, URLs and Aliases you received on the Video Call from the Controllers below:
          </p>
        </div>
        <div style={{ height: '350px', overflowY: 'scroll' }}>
          <Card class="card--fluid" style={{ margin: '0 0 1.5rem 0', height: '200px' }}>
            <div class="flex flex-align-center flex-justify-between" style={{ flexDirection: 'column' }}>
              <div class="flex flex-align-center flex-justify-between">
                <h4>AID:</h4>
                <TextField style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)', height: '2rem', width: '80%' }} />
              </div>
              <div class="flex flex-align-center flex-justify-between">
                <h4>URL:</h4>
                <TextField style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)', height: '2rem', width: '80%' }} />
              </div>
              <div class="flex flex-align-center flex-justify-between">
                <h4>Alias:</h4>
                <TextField style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)', height: '2rem', width: '80%' }} />
              </div>
            </div>
          </Card>
          <Card class="card--fluid" style={{ margin: '0 0 1.5rem 0', height: '200px' }}>
            <div class="flex flex-align-center flex-justify-between" style={{ flexDirection: 'column' }}>
              <div class="flex flex-align-center flex-justify-between">
                <h4>AID:</h4>
                <TextField style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)', height: '2rem', width: '80%' }} />
              </div>
              <div class="flex flex-align-center flex-justify-between">
                <h4>URL:</h4>
                <TextField style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)', height: '2rem', width: '80%' }} />
              </div>
              <div class="flex flex-align-center flex-justify-between">
                <h4>Alias:</h4>
                <TextField style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)', height: '2rem', width: '80%' }} />
              </div>
            </div>
          </Card>
        </div>

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
        <img src={responseMessage} style={{ width: '50%', margin: '1.5rem 0 2rem 0' }} />
        <h3>Generate Challenge Message</h3>
        <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
          The Challenge Response Message generated will be sent to all the GLEIF Controllers in the order you provided.
          <br />
          <br />
        </p>

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
        <img src={responseMessage} style={{ width: '50%', margin: '1.5rem 0 2rem 0' }} />
        <h3>Copy Challenge Message</h3>
        <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
          Generate a message for each controller then direct message each GLEIF Controller in the video call.
          <br />
          <br />
          <strong>
            Important! Don’t use a challenge message from another session, it should be unique to this session taking
            place today with the GLEIF Controllers.
          </strong>
          <br />
          <br />
        </p>
        <TextField
          textarea
          style={{ height: '5rem', width: '100%', margin: '0 0 4rem 0', backgroundColor: 'rgba(0, 0, 0, 0.04)' }}
        />
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
        <img src={uploadFile} style={{ width: '60%', margin: '1.5rem 0 2rem 0' }} />
        <h3>Challenge Message in Progress</h3>
        <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
          You will be notified when the GRACs sign and return the Challenge Message, after which you may configure the
          multi-sig set as the GLEIF Genesis Controller.
          <br />
          <br />
        </p>

        <div class="flex flex-justify-between">
          <Button
            class="button--gray-dk button--big button--no-transform"
            raised
            label="Go Back"
            onclick={() => {
              this.step--;
            }}
          />
          <Button class="button--big button--no-transform" raised label="close" onclick={vnode.attrs.end} />
        </div>
      </>,
    ];
  }

  view() {
    return <>{this.steps[this.step]}</>;
  }
}

module.exports = ConfigureMultiSig;
