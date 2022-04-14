import m from 'mithril';
import { Button, TextTooltip } from '../../../src/app/components';
import { KERI } from '../../../src/app/services';
import { EnterChallengesForm, EnterOOBIsForm, SendChallengeForm, SendOOBIForm } from '../../../forms';

import addNewContacts from '../../../src/assets/img/add-new-contacts.png';
import responseMessage from '../../../src/assets/img/response-message.png';
import uploadFile from '../../../src/assets/img/upload-file.png';

class JoinVideoCall {
  constructor() {
    this.currentState = 'delegating-aids';
    this.identifiers = [];
    this.oobis = [
      {
        alias: '',
        url: '',
      },
      {
        alias: '',
        url: '',
      },
      {
        alias: '',
        url: '',
      },
    ];
    KERI.listIdentifiers()
      .then((identifiers) => {
        this.identifiers = identifiers;
      })
      .catch((err) => {
        console.log('listIdentifiers', err);
      });
  }

  view(vnode) {
    return (
      <>
        {this.currentState === 'delegating-aids' && (
          <>
            <h3>Delegating AIDs</h3>
            <p class="p-tag">This module will take you through the steps for AID Delegation. </p>
            <h3>Steps to AID Delegation</h3>
            <p class="p-tag">
              <div class="flex flex-column">
                <ol class="styled-ol" style={{ margin: '2rem 0' }}>
                  <li>Initiate a Video Call</li>
                  <li>Send your OOBI over video call and receive the other user's OOBI.</li>
                  <li>Send a Challenge Message</li>
                  <li>You will sign and return Challenge Message.</li>
                  <li>Once you have signed, you must verify all signatures of the other users.</li>
                </ol>
              </div>
            </p>
            <div class="flex flex-justify-end">
              <Button
                class="button--big button--no-transform"
                raised
                label="Continue"
                onclick={() => {
                  this.currentState = 'video-call';
                }}
              />
            </div>
          </>
        )}
        {this.currentState === 'video-call' && (
          <>
            <img src={addNewContacts} style={{ width: '224px', margin: '0 0 1rem 0' }} />
            <h3>Join a Video Call</h3>
            <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
              In order to start the authentication process, you will need to initiate an real-time OOBI session in which
              everyone is present, You will accept all their AID and URL on a Video Call so that you can receive their
              identifying information.
            </p>
            <h3 style={{ marginBottom: '4rem' }}>
              <TextTooltip
                label={
                  <b>
                    Generate <u>OOBI</u>
                  </b>
                }
              >
                <b>OOBI</b> is an Out Of Band Introduction that connects an AID with a service endpoint URL.
              </TextTooltip>
            </h3>
            <div class="flex flex-justify-between">
              <Button
                class="button--gray-dk button--big button--no-transform"
                raised
                label="Go Back"
                onclick={() => {
                  this.currentState = 'delegating-aids';
                }}
              />
              <Button
                class="button--big button--no-transform"
                raised
                label="Generate"
                onclick={() => {
                  this.currentState = 'send-oobi';
                }}
              />
            </div>
          </>
        )}
        {this.currentState === 'send-oobi' && (
          <>
            <img src={addNewContacts} style={{ width: '200px', margin: '0 0 1rem 0' }} />
            <h3>Send OOBI</h3>
            <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
              Copy this OOBI (Alias + URL) and paste it into the Video Call to share your identifying information with
              all parties on the call.
            </p>
            <SendOOBIForm identifiers={this.identifiers} />
            <div class="flex flex-justify-between">
              <Button
                class="button--gray-dk button--big button--no-transform"
                raised
                label="Go Back"
                onclick={() => {
                  this.currentState = 'video-call';
                }}
              />
              <Button
                class="button--big button--no-transform"
                raised
                label="Continue"
                onclick={() => {
                  this.currentState = 'enter-oobis';
                }}
              />
            </div>
          </>
        )}
        {this.currentState === 'enter-oobis' && (
          <>
            <h3>Enter OOBIs</h3>
            <EnterOOBIsForm
              identifiers={this.identifiers}
              oobis={this.oobis}
              oobisChange={(oobis) => {
                this.oobis = oobis;
              }}
            />
            <div class="flex flex-justify-end" style={{ marginTop: '2rem' }}>
              <Button
                class="button--big button--no-transform"
                raised
                label="Continue"
                onclick={() => {
                  this.currentState = 'generate-challenge';
                }}
              />
            </div>
          </>
        )}
        {this.currentState === 'generate-challenge' && (
          <>
            <img src={responseMessage} style={{ width: '240px', margin: '1.5rem 0 2rem 0' }} />
            <h3>Generate and Send Challenge Message</h3>
            <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
              Click the Generate Button to create a Challenge Messages to each member of the signing group.
            </p>
            <div class="flex flex-justify-between">
              <Button
                class="button--gray-dk button--big button--no-transform"
                raised
                label="Go Back"
                onclick={() => {
                  this.currentState = 'enter-oobis';
                }}
              />
              <Button
                class="button--big button--no-transform"
                raised
                label="Generate"
                onclick={() => {
                  this.currentState = 'copy-challenge';
                }}
              />
            </div>
          </>
        )}
        {this.currentState === 'copy-challenge' && (
          <>
            <img src={responseMessage} style={{ width: '240px', margin: '1.5rem 0 2rem 0' }} />
            <h3>Paste Challenge Message in Video Call</h3>
            <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
              Generate a message for each participant then direct message everyone in the video call.
              <br />
              <br />
              <strong>
                Important! Don't use a challenge message from another session, it should be unique to this session
                taking place today.
              </strong>
            </p>
            <SendChallengeForm />
            <div class="flex flex-justify-between">
              <Button
                class="button--gray-dk button--big button--no-transform"
                raised
                label="Go Back"
                onclick={() => {
                  this.currentState = 'generate-challenge';
                }}
              />
              <Button
                class="button--big button--no-transform"
                raised
                label="Continue"
                onclick={() => {
                  this.currentState = 'enter-challenge-messages';
                }}
              />
            </div>
          </>
        )}
        {this.currentState === 'enter-challenge-messages' && (
          <>
            <EnterChallengesForm identifiers={this.identifiers} oobis={this.oobis} />
            <div class="flex flex-justify-between">
              <Button
                class="button--gray-dk button--big button--no-transform"
                raised
                label="Go Back"
                onclick={() => {
                  this.currentState = 'copy-challenge';
                }}
              />
              <Button
                class="button--big button--no-transform"
                raised
                label="Next"
                onclick={() => {
                  this.currentState = 'verification-progress';
                }}
              />
            </div>
          </>
        )}
        {this.currentState === 'verification-progress' && (
          <>
            <img src={uploadFile} style={{ width: '240px', margin: '1.5rem 0 2rem 0' }} />
            <h3>Your Verification is Under Review</h3>
            <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
              You will be notified when the initiator verifies your signature and you will resume on a Video Call to
              configure the multi-sig set.
            </p>
            <div class="flex flex-justify-end">
              <Button class="button--big button--no-transform" raised label="Close" onclick={vnode.attrs.end} />
            </div>
          </>
        )}
      </>
    );
  }
}

module.exports = JoinVideoCall;
