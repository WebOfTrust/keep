import m from 'mithril';
import { Button } from '../../../src/app/components';
import {Profile, Participants, Tasks, KERI} from '../../../src/app/services';
import { EnterChallengesForm, EnterOOBIsForm, SendChallengeForm, SendOOBIForm } from './forms';

import addNewContacts from '../../../src/assets/img/add-new-contacts.svg';
import projectPlanning from '../../../src/assets/img/project-planning.svg';
import responseMessage from '../../../src/assets/img/response-message.svg';
import uploadFile from '../../../src/assets/img/upload-file.svg';

class VideoCallTask {
  constructor(config) {
    this._label = config.label;
    this.initiate = config.initiate;
    this.oneToOne = config.oneToOne;
    this.skip = config.skip
    this.acceptCredential = config.acceptCredential
    this.next = config.next;

    this.aidToSend = config.aidToSend;
    this.steps = config.steps;
    this.participants = new Participants();

    if (config.skipIntro) {
      this.currentState = this.initiate ? 'video-call' : 'join-call';
    } else {
      this.currentState = 'intro';
    }
    this._component = {
      view: (vnode) => {
        return <VideoCall end={vnode.attrs.end} parent={this} steps={this.steps}/>;
      },
    };
    this.sendOOBIPanel = {
      view: (vnode) => {
        return <SendOOBIPanel end={vnode.attrs.end} parent={this} />;
      },
    };
    this.copyChallengePanel = {
      view: (vnode) => {
        return <CopyChallengePanel parent={this} />;
      },
    };
  }

  get lead() {
    return this.initiate;
  }

  get imgSrc() {
    if (this.initiate === true) {
      return projectPlanning;
    } else {
      return addNewContacts;
    }
  }

  get label() {
    return this._label;
  }

  get component() {
    return this._component;
  }

  sendOobis() {
    let aid = Profile.getDefaultAID(this.aidToSend);
    KERI.sendOOBIs(aid.name, this.participants.oobis);
    this.currentState = 'event-complete';
  }

  get lcomponent() {
    switch (this.currentState) {
      case 'send-oobi':
        return this.sendOOBIPanel;
      case 'challenge-messages':
        return this.copyChallengePanel;
      default:
        return undefined;
    }
  }
}

class VideoCall {
  view(vnode) {
    return (
      <>
        {vnode.attrs.parent.currentState === 'intro' && (
          <>
            <h3>Identity Authentication</h3>
            <p className="p-tag" style={{ margin: '2rem 0' }}>
              {vnode.attrs.steps ? (
                vnode.attrs.steps.paragraph
              ) : (
                <>
                  This module will take you through the steps of how to authenticate a user's identity. Below are the
                  steps for how to complete the process:
                </>
              )}
            </p>
            <h3>Steps to Identity Authentication</h3>
            <ol className="styled-ol" style={{ margin: '2rem 0' }}>
              {vnode.attrs.steps ? (
                vnode.attrs.steps.list.map((element) => {
                  return <li>{element}</li>;
                })
              ) : (
                <>
                  <li>{vnode.attrs.parent.initiate ? 'Initiate' : 'Join'} a Video Call</li>
                  <li>Use an OOBI protocol to obtain the user's AID</li>
                  <li>Use an OOBI protocol to share your AID</li>
                  <li>Obtain and sign a Challenge Message</li>
                  <li>Generate and send a Challenge Message</li>
                  <li>User signs and returns Challenge Message</li>
                  {vnode.attrs.parent.acceptCredential && (
                      <li>Wait for credentials to be issued.</li>
                  )}
                  {vnode.attrs.parent.initiate && !vnode.attrs.parent.oneToOne && (
                    <li>You initiate the Multi-Sig Group for all participants</li>
                  )}
                  {!vnode.attrs.parent.initiate && !vnode.attrs.parent.oneToOne && (
                    <li>Wait for invitation to join Multi-Sig Group</li>
                  )}
                </>
              )}
            </ol>
            <div className="flex flex-justify-end" style={{ marginTop: '4rem' }}>
              {/* <Button class="button--gray-dk button--big button--no-transform" raised label="Skip" /> */}
              <Button
                class="button--big button--no-transform"
                raised
                label="Continue"
                onclick={() => {
                  if (vnode.attrs.parent.initiate) {
                    vnode.attrs.parent.currentState = 'video-call';
                  } else {
                    vnode.attrs.parent.currentState = 'join-call';
                  }
                }}
              />
            </div>
          </>
        )}
        {vnode.attrs.parent.currentState === 'video-call' && (
          <>
            <img src={projectPlanning} style={{ marginBottom: '2rem', width: '240px' }} />
            <h3>Initiate a Video Call</h3>
            <p class="p-tag" style={{ margin: '2rem 0' }}>
              In order to start the authentication process, you will need to initiate a real-time Out of Band
              Interaction (OOBI) session in which you and the other users are present. You will accept all their OOBI
              URLs on a Video Call so that you can receive their identifying information.
            </p>
            <div class="flex flex-justify-between" style={{ marginTop: '4rem' }}>
              <Button
                class="button--gray-dk button--big button--no-transform"
                raised
                label="Go Back"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'intro';
                }}
              />
              <Button
                class="button--big button--no-transform"
                raised
                label="Continue"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'send-oobi';
                }}
              />
            </div>
          </>
        )}
        {vnode.attrs.parent.currentState === 'join-call' && (
          <>
            <img src={responseMessage} style={{ marginBottom: '2rem', width: '240px' }} />
            <h3>Join a Video Call</h3>
            <p class="p-tag" style={{ margin: '2rem 0' }}>
              In order to participate in the authentication process, you will need to join a real-time Out of Band
              Interaction (OOBI) session initiated by the Lead in which you and the other users are present. You will
              accept all their OOBI URLs on a Video Call so that you can receive their identifier information.
            </p>
            <div class="flex flex-justify-between" style={{ marginTop: '4rem' }}>
              <Button
                class="button--gray-dk button--big button--no-transform"
                raised
                label="Go Back"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'intro';
                }}
              />
              <Button
                class="button--big button--no-transform"
                raised
                label="Continue"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'send-oobi';
                }}
              />
            </div>
          </>
        )}
        {vnode.attrs.parent.currentState === 'send-oobi' && (
          <>
            <h3>Accept OOBI from other person{vnode.attrs.parent.oneToOne ? '' : 's'}</h3>
            <EnterOOBIsForm
              participants={vnode.attrs.parent.participants}
              oneToOne={vnode.attrs.parent.oneToOne}
            />
            <div class="flex flex-justify-between" style={{ marginTop: '4rem' }}>
              <Button
                  class="button--gray-dk button--big button--no-transform"
                  raised
                  label="Go Back"
                  onclick={() => {
                    vnode.attrs.parent.currentState = 'join-call';
                  }}
              />
              <Button
                class="button--big button--no-transform"
                raised
                label="Continue"
                disabled={!vnode.attrs.parent.participants.oobisResolved()}
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
            <EnterChallengesForm  aidToSend={vnode.attrs.parent.aidToSend} participants={vnode.attrs.parent.participants} />
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
                disabled={false
                  // !(vnode.attrs.parent.participants.oobisVerified() && vnode.attrs.parent.participants.oobisConfirmed())
                }
                onclick={() => {
                  let aid = Profile.getDefaultAID(vnode.attrs.parent.aidToSend);
                  if (aid.group) {
                    vnode.attrs.parent.sendOobis();
                  }
                  if (vnode.attrs.parent.next !== undefined) {
                    vnode.attrs.parent.next.recipient = vnode.attrs.parent.participants.oobis[0];
                    Tasks.active = vnode.attrs.parent.next;
                  } else {
                    vnode.attrs.parent.currentState = 'waiting-for-multisig';
                  }
                }}
              />
            </div>
          </>
        )}
        {vnode.attrs.parent.currentState === 'waiting-for-multisig' && (
          <>
            <img src={uploadFile} style={{ width: '240px', margin: '1.5rem 0 2rem 0' }} />
            <h3>Waiting for Multi-Sig Group Inception</h3>
            <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
              You will be notified when the Lead initiates the creation of the Multi-Sig Group. Clicking on the
              notification will allow you to participate in the inception event.
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
      </>
    );
  }
}

class SendOOBIPanel {
  constructor() {}

  view(vnode) {
    return (
      <>
        <img src={addNewContacts} style={{ width: '200px', margin: '0 0 1rem 0' }} alt="" />
        <h3>Send OOBI for your {} AID</h3>
        <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
          Copy this OOBI URL for your default AID and paste it into the Video Call to share your identifying
          information. To use another AID for this transaction, go to your profile and set another default AID before
          continuing.
        </p>
        <SendOOBIForm aidToSend={vnode.attrs.parent.aidToSend} />
      </>
    );
  }
}

class CopyChallengePanel {
  constructor(vnode) {
    this.signers = vnode.attrs.signers;
  }

  view(vnode) {
    return (
      <>
        <div className="flex flex-align-center flex-justify-between">
          <img src={addNewContacts} style={{ width: '120px', margin: '1.5rem 0 1rem 0' }} />
          <h3>Challenge Message Recipients</h3>
        </div>
        <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
          Paste the message into the video chat so that your contact{vnode.attrs.parent.oneToOne ? '' : 's'} can be
          verified
          <br />
          <br />
          <strong>
            Important! Don't use a challenge message from another session, it should be unique to this session taking
            place today.
          </strong>
        </p>
        <SendChallengeForm participants={vnode.attrs.parent.participants} />
        <div className="flex flex-align-center flex-justify-between">
          <p class="font-color--battleship">Participant</p>
          <p class="font-color--battleship">Status</p>
        </div>
        {vnode.attrs.parent.participants.oobis.map((signer, index) => {
          return (
            <>
              <div className="flex flex-align-center flex-justify-between">
                <p>{signer.alias}</p>
                {!signer.verified && <p class="font-color--blue">In Progress</p>}
                {signer.verified && <p class="font-color--green">Verified!</p>}
              </div>
            </>
          );
        })}
      </>
    );
  }
}

module.exports = VideoCallTask;
