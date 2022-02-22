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
import githubLogo from '../../../src/assets/img/github-logo.png';
import liOne from '../../../src/assets/img/li-one.png';
import liTwo from '../../../src/assets/img/li-two.png';
import liThree from '../../../src/assets/img/li-three.png';
import liFour from '../../../src/assets/img/li-four.png';
import liFive from '../../../src/assets/img/li-five.png';
import tempProfPic from '../../../src/assets/img/temp-prof-pic.jpg';
class InitiateVideoCall {
  tempNotiArray = [
    {
      type: 'You may now configure Multi-Sig Set',
      displayPic: liFive,
      linkText: 'View',
    },
    {
      type: 'New Verified Contact',
      displayPic: tempProfPic,
      linkText: 'View',
    },
    {
      type: 'New Verified Contact',
      displayPic: tempProfPic,
      linkText: 'View',
    },
    {
      type: 'New Verified Contact',
      displayPic: tempProfPic,
      linkText: 'View',
    },
    {
      type: 'New Verified Contact',
      displayPic: tempProfPic,
      linkText: 'View',
    },
  ];

  tempOOBIArray = [
    {
      AID: '',
      URL: '',
      Alias: '',
    },
    {
      AID: '',
      URL: '',
      Alias: '',
    },
    {
      AID: '',
      URL: '',
      Alias: '',
    },
    {
      AID: '',
      URL: '',
      Alias: '',
    },
    {
      AID: '',
      URL: '',
      Alias: '',
    },
    {
      AID: '',
      URL: '',
      Alias: '',
    },
    {
      AID: '',
      URL: '',
      Alias: '',
    },
    {
      AID: '',
      URL: '',
      Alias: '',
    },
    {
      AID: '',
      URL: '',
      Alias: '',
    },
    {
      AID: '',
      URL: '',
      Alias: '',
    },
    {
      AID: '',
      URL: '',
      Alias: '',
    },
    {
      AID: '',
      URL: '',
      Alias: '',
    },
  ];
  constructor(vnode) {
    this.step = 0;
    this.steps = [
      <>
        <h3>GLEIF Genesis Event</h3>
        <p class="p-tag">This module will take you through the steps for GLEIF AID Genesis.</p>
        <h3>Steps to Create GLEIF Root AID</h3>
        <p class="p-tag">
          <div class="flex flex-column">
            <div class="flex" style={{ alignItems: 'center', margin: '0 0 0 0' }}>
              <img src={liOne} style={{ margin: '1rem 10px 1rem 0' }} />
              <p class="p-tag-bold" style={{ margin: '0 0 0  0' }}>
                Initiate a Video Call with all GLEIF Controllers.
              </p>
            </div>
            <div class="flex" style={{ alignItems: 'center', margin: '0 0 0 0' }}>
              <img src={liTwo} style={{ margin: '1rem 10px 1rem 0' }} />
              <p class="p-tag-bold">
                Use an OOBI protocol to share your GLEIF Delegated AID and service endpoints with the other Controllers.
              </p>
            </div>
            <div class="flex" style={{ alignItems: 'center', margin: '0 0 0 0' }}>
              <img src={liThree} style={{ margin: '1rem 10px 1rem 0' }} />
              <p class="p-tag-bold">Send a Challenge Message to the other Controllers.</p>
            </div>
            <div class="flex" style={{ alignItems: 'center', margin: '0 0 0 0' }}>
              <img src={liFour} style={{ margin: '1rem 10px 1rem 0' }} />
              <p class="p-tag-bold">GLEIF Controllers sign and return Challenge Message.</p>
            </div>
            <div class="flex" style={{ alignItems: 'center', margin: '0 0 0 0' }}>
              <img src={liFive} style={{ margin: '1rem 10px 1rem 0' }} />
              <p class="p-tag-bold">Each Controller must verify all signatures.</p>
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
        <h3>Initiate a Video Call</h3>
        <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
          In order to start the authentication process, you will need to initiate an real-time Out of Band Interaction
          (OOBI) session in which you and the other GRACs (GLEIF Root AID Controllers) are present, You will accept all
          their text strings on a Video Call so that you can receive their identifying information.
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
            label="Continue"
            onclick={() => {
              this.step++;
            }}
          />
        </div>
      </>,
      <>
        <img src={projectPlanning} style={{ width: '50%', margin: '0 0 0 0' }} />
        <h3>Initiate Video Call</h3>
        <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
          Prior to Initiating the Video Call, make sure that you have all GRACs ready to attend, either in person or
          over Video Call.
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
            label="Get Started"
            onclick={() => {
              this.step++;
            }}
          />
        </div>
      </>,
      <>
        <img src={uploadFile} style={{ width: '50%', margin: '0 0 0 0' }} />
        <h3>
          Accept the <u>OOBIs</u>
        </h3>
        <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
          While on the Video Call, make sure to obtain each GLEIF Controller’s <strong>URL and OOBI.</strong> When you
          have both for each party, please press continue.
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
            label="Continue"
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
        <div style={{ height: '350px', overflowY: 'scroll', margin: '0 0 1rem 0' }}>
          {this.tempOOBIArray.map((Controller) => {
            return (
              <Card class="card--fluid" style={{ margin: '0 0 1.5rem 0', height: '200px' }}>
                <div class="flex flex-align-center flex-justify-between" style={{ flexDirection: 'column' }}>
                  <div class="flex flex-align-center flex-justify-between">
                    <h5>AID:</h5>
                    <TextField style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)', height: '2rem', width: '80%' }} />
                  </div>
                  <div class="flex flex-align-center flex-justify-between">
                    <h5>URL:</h5>
                    <TextField style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)', height: '2rem', width: '80%' }} />
                  </div>
                  <div class="flex flex-align-center flex-justify-between">
                    <h5>Alias:</h5>
                    <TextField style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)', height: '2rem', width: '80%' }} />
                  </div>
                </div>
              </Card>
            );
          })}
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
          <Button
            class="button--big button--no-transform"
            raised
            label="Close(temp next)"
            onclick={() => {
              this.step++;
            }}
          />
        </div>
      </>,
      <>
        <h3 style={{ margin: '0 0 3rem 0' }}>Notifications</h3>
        {this.tempNotiArray.map((noti) => {
          return (
            <div
              class="flex flex-justify-between divider"
              style={{ alignItems: 'center', margin: '0', height: '40px' }}
            >
              <div class="flex" style={{ alignItems: 'center', marginBottom: '-9px' }}>
                <img src={noti.displayPic} style={{ width: '28px', height: '28px', borderRadius: '50%' }} />
                <h5 style={{ margin: '0 0 0 1rem' }}>{noti.type}</h5>
              </div>

              <h5 style={{ color: '#3c64b1', margin: '0 0 -9px 0', alignItems: 'center' }}>
                <u>{noti.linkText}</u>
              </h5>
            </div>
          );
        })}
        <div class="flex flex-justify-end" style={{ margin: '4rem 0 0 0' }}>
          <Button class="button--big button--no-transform" raised label="Close" onclick={vnode.attrs.end} />
        </div>
      </>,
    ];
  }

  view() {
    return <>{this.steps[this.step]}</>;
  }
}

module.exports = InitiateVideoCall;
