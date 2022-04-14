import m from 'mithril';
import { Button } from '../../../src/app/components';
import { KERI } from '../../../src/app/services';
import { EnterChallengesForm, EnterOOBIsForm, SendChallengeForm, SendOOBIForm } from '../../../forms';

import addNewContacts from '../../../src/assets/img/add-new-contacts.png';
import projectPlanning from '../../../src/assets/img/project-planning.png';
import responseMessage from '../../../src/assets/img/response-message.png';
import uploadFile from '../../../src/assets/img/upload-file.png';

class InitiateVideoCall {
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
            <p class="p-tag">This module will take you through the steps for AID Delegation.</p>
            <h3>Steps to AID Delegation</h3>
            <p class="p-tag">
              <div class="flex flex-column">
                <ol class="styled-ol" style={{ margin: '2rem 0' }}>
                  <li>Initiate a Video Call</li>
                  <li>Send your OOBI over video call and receive the other user's OOBI.</li>
                  <li>Send a Challenge Message</li>
                  <li>You will sign and return Challenge Message.</li>
                  <li>Once you have signed, you must verify signatures of all participants.</li>
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
            <img src={projectPlanning} style={{ marginBottom: '2rem', width: '240px' }} />
            <h3>Initiate a Video Call</h3>
            <p class="p-tag" style={{ margin: '2rem 0 6rem 0' }}>
              In order to start the authentication process, you will need to initiate an real-time Out of Band
              Interaction (OOBI) session in which you and the other users are present. You will accept all their OOBIs
              (Alias + URL) on a Video Call so that you can receive their identifying information.
            </p>
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
                label="Continue"
                onclick={() => {
                  this.currentState = 'start-video-call';
                }}
              />
            </div>
          </>
        )}
        {this.currentState === 'start-video-call' && (
          <>
            <img src={projectPlanning} style={{ marginBottom: '2rem', width: '240px' }} />
            <h3>Initiate Video Call</h3>
            <p class="p-tag" style={{ margin: '2rem 0 6rem 0' }}>
              Prior to Initiating the Video Call, make sure that you have everyone in the signing group ready to attend,
              either in person or over Video Call.
            </p>
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
                label="Get Started"
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
              Copy this OOBI (Alias + URL) and paste it into the Video Call to share your identifying information.
            </p>
            <SendOOBIForm identifiers={this.identifiers} />
            <div class="flex flex-justify-between">
              <Button
                class="button--gray-dk button--big button--no-transform"
                raised
                label="Go Back"
                onclick={() => {
                  this.currentState = 'start-video-call';
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
                  this.currentState = 'waiting-for-signatures';
                }}
              />
            </div>
          </>
        )}
        {this.currentState === 'waiting-for-signatures' && (
          <>
            <img src={uploadFile} style={{ width: '240px', margin: '1.5rem 0 2rem 0' }} />
            <h3>Waiting for Signatures</h3>
            <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
              You will be notified when all participents sign and return the Challenge Message, after which you may
              configure the multi-sig set.
            </p>
            <div class="flex flex-justify-between">
              <Button
                class="button--gray-dk button--big button--no-transform"
                raised
                label="Go Back"
                onclick={() => {
                  this.currentState = 'enter-challenge-messages';
                }}
              />
              <Button class="button--big button--no-transform" raised label="Close" onclick={vnode.attrs.end} />
            </div>
          </>
        )}
        {/* {this.currentState === 'notifications' && (
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
          </>
        )} */}
      </>
    );
  }
}

module.exports = InitiateVideoCall;
