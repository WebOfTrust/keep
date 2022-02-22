import m from 'mithril';
import { Button, Card, TextField } from '../../../src/app/components';

import uploadFile from '../../../src/assets/img/upload-file.png';

import responseMessage from '../../../src/assets/img/response-message.png';

class ViewMultiSig {
  tempMultiSigArray = [
    {
      number: 1,
      name: 'Jane Smith',
      signed: true,
    },
    {
      number: 2,
      name: 'Michael Williams',
      signed: true,
    },
    {
      number: 3,
      name: 'ZG4jvw9bTmVd5X92iKYmfT',
      signed: true,
    },
    {
      number: 4,
      name: 'OG8jvw9bTmUd5J92iKYmfU',
      signed: true,
    },
    {
      number: 5,
      name: 'Joe Roberts',
      signed: false,
    },
    {
      number: 6,
      name: 'OG8jvw9bTmUd5J92iKYmfU',
      signed: false,
    },
  ];

  constructor(vnode) {
    this.step = 0;
    this.steps = [
      <>
        <h3>Event #130</h3>
        <h4 class="p-tag" style={{ margin: '0 0 0 0' }}>
          Status: Multi-Sig Verification in Progress
        </h4>

        <div class="flex flex-justify-between">
          <p class="p-tag" style={{ margin: '2rem 0 1rem 4rem' }}>
            Name:
          </p>
          <p class="p-tag" style={{ margin: '2rem 0 1rem 5rem' }}>
            Signed?
          </p>
        </div>
        <div style={{ height: '350px', overflowY: 'scroll', margin: '0 0 1rem 0' }}>
          {this.tempMultiSigArray.map((sig) => {
            return (
              <div
                class="flex flex-justify-evenly "
                style={{ alignItems: 'center', margin: '0 0 1rem 0', width: '100%' }}
              >
                <h4 class="p-tag" style={{ margin: '0 0 0 0' }}>
                  {`#${sig.number}`}
                </h4>
                <div
                  class="flex flex-align-center"
                  style={{ width: '65%', backgroundColor: 'white', height: '40px', borderRadius: '3px' }}
                >
                  <p class="p-tag" style={{ margin: '0 0 0 .5rem' }}>
                    {sig.name}
                  </p>
                </div>

                <h4 class="p-tag" style={{ margin: '0 0 0 0' }}>
                  {sig.signed ? <p>Y</p> : <p>N</p>}
                </h4>
              </div>
            );
          })}
        </div>

        {/* member scroll & select end*/}
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
          <p class="p-tag" style={{ margin: '2rem 0 2.5rem 0' }}>
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

module.exports = ViewMultiSig;
