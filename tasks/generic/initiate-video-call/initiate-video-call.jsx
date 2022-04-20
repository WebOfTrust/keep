import m from 'mithril';
import { Button } from '../../../src/app/components';
import { KERI, Profile } from '../../../src/app/services';
import { EnterChallengesForm, EnterOOBIsForm, SendChallengeForm } from '../../../forms';

import addNewContacts from '../../../src/assets/img/add-new-contacts.png';
import projectPlanning from '../../../src/assets/img/project-planning.png';
import responseMessage from '../../../src/assets/img/response-message.png';
import uploadFile from '../../../src/assets/img/upload-file.png';
import { SendOOBIForm } from '../../../forms';


class InitiateVideoCallTask {
  constructor() {
    this.currentState = 'intro';
    this._component = {
      view: (vnode) => {
        return <InitiateVideoCall end={vnode.attrs.end} parent={this}/>;
      }
    }
    this.sendOOBIPanel = {
      view: (vnode) => {
        return <SendOOBIPanel end={vnode.attrs.end} identifiers={Profile.identifiers} parent={this}/>;
      }
    }
    this.copyChallengePanel = {
      view: (vnode) => {
        return <CopyChallengePanel />
      }
    }
  }

  get imgSrc() {
    return addNewContacts;
  }

  get label() {
    return 'Initiate Video Call';
  }

  get component() {
    return this._component
  }

  get lcomponent() {
    switch(this.currentState) {
      case 'send-oobi':
        return this.sendOOBIPanel;
      case 'challenge-messages':
        return this.copyChallengePanel;
      default:
        return undefined;
    }
  }
}


class InitiateVideoCall {
  constructor() {
    Profile.isLead = true;
    this.oobis = [
      {
        alias: '',
        url: '',
      }
    ];
  }

  view(vnode) {
    return (
      <>
        {vnode.attrs.parent.currentState === 'intro' && (
          <>
            <h3>Identity Authentication</h3>
            <p className="p-tag">
              {vnode.attrs.steps ? (
                  vnode.attrs.steps.paragraph
              ) : (
                  <>
                    This module will take you through the steps of how to authenticate a user's identity. Below are the
                    steps
                    for how to complete the process:
                  </>
              )}
            </p>
            <h3>Steps to Identity Authentication</h3>
            <ol className="styled-ol" style={{margin: '2rem 0'}}>
              {vnode.attrs.steps ? (
                  vnode.attrs.steps.list.map((element) => {
                    return <li>{element}</li>;
                  })
              ) : (
                  <>
                    <li>Initiate a Video Call</li>
                    <li>Use an OOBI protocol to obtain the user's AID</li>
                    <li>Use an OOBI protocol to share your AID</li>
                    <li>Obtain and sign a Challenge Message</li>
                    <li>Generate and send a Challenge Message</li>
                    <li>User signs and returns Challenge Message</li>
                    <li>You verify signature and issue credentials</li>
                  </>
              )}
            </ol>
            <div className="flex flex-justify-end">
              {/* <Button class="button--gray-dk button--big button--no-transform" raised label="Skip" /> */}
              <Button class="button--big button--no-transform" raised label="Continue"
                      onclick={() => {
                        vnode.attrs.parent.currentState = 'video-call';
                      }}
              />
            </div>
          </>
        )}
        {vnode.attrs.parent.currentState === 'video-call' && (
          <>
            <img src={responseMessage} style={{ marginBottom: '2rem', width: '240px' }} />
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
                  vnode.attrs.parent.currentState = 'delegating-aids';
                }}
              />
              <Button
                class="button--big button--no-transform"
                raised
                label="Continue"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'start-video-call';
                }}
              />
            </div>
          </>
        )}
        {vnode.attrs.parent.currentState === 'start-video-call' && (
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
                  vnode.attrs.parent.currentState = 'video-call';
                }}
              />
              <Button
                class="button--big button--no-transform"
                raised
                label="Get Started"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'send-oobi';
                }}
              />
            </div>
          </>
        )}
        {vnode.attrs.parent.currentState === 'send-oobi' && (
          <>
            <h3>Accept OOBI from other person(s)</h3>
            <EnterOOBIsForm
              identifiers={Profile.identifiers}
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
                  vnode.attrs.parent.currentState = 'generate-challenge';
                }}
              />
            </div>
          </>
        )}
        {vnode.attrs.parent.currentState === 'generate-challenge' && (
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
                  vnode.attrs.parent.currentState = 'send-oobi';
                }}
              />
              <Button
                class="button--big button--no-transform"
                raised
                label="Generate"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'challenge-messages';
                }}
              />
            </div>
          </>
        )}
        {vnode.attrs.parent.currentState === 'challenge-messages' && (
          <>
            <EnterChallengesForm identifiers={Profile.identifiers} oobis={this.oobis} />
            <div class="flex flex-justify-between">
              <Button
                class="button--gray-dk button--big button--no-transform"
                raised
                label="Go Back"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'generate-challenge';
                }}
              />
              <Button
                class="button--big button--no-transform"
                raised
                label="Next"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'waiting-for-signatures';
                }}
              />
            </div>
          </>
        )}
        {vnode.attrs.parent.currentState === 'waiting-for-signatures' && (
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
                  vnode.attrs.parent.currentState = 'challenge-messages';
                }}
              />
              <Button class="button--big button--no-transform" raised label="Close" onclick={vnode.attrs.end} />
            </div>
          </>
        )}
        {/* {vnode.attrs.parent.currentState === 'notifications' && (
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

class SendOOBIPanel {

  constructor() {
  }

  view(vnode) {
    return (
        <>
          <img src={addNewContacts} style={{width: '200px', margin: '0 0 1rem 0'}} alt=""/>
          <h3>Send OOBI for your {vnode.attrs.identifiers[0].name} AID</h3>
          <p class="p-tag" style={{margin: '2rem 0 2rem 0'}}>
            Copy this OOBI URL for your default AID and paste it into the Video Call to share your identifying
            information.
            To use another AID for this transaction, go to your profile and set another default AID before
            continuing.
          </p>
          <SendOOBIForm identifiers={vnode.attrs.identifiers}/>
        </>
    )
  }
}

class CopyChallengePanel {

  constructor() {
  }

  view(vnode) {
    return (
        <>
          <img src={responseMessage} style={{width: '240px', margin: '1.5rem 0 2rem 0'}}/>
          <h3>Paste Challenge Message in Video Call</h3>
          <p class="p-tag" style={{margin: '2rem 0 2rem 0'}}>
            Generate a message for each participant then direct message everyone in the video call.
            <br/>
            <br/>
            <strong>
              Important! Don't use a challenge message from another session, it should be unique to this
              session
              taking place today.
            </strong>
          </p>
          <SendChallengeForm/>

        </>
    )
  }
}

module.exports = InitiateVideoCallTask;
