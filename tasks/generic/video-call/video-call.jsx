import m from 'mithril';
import { Button, Progress } from '../../../src/app/components';
import { Profile, Participants, Tasks, KERI } from '../../../src/app/services';
import { EnterChallengesForm, EnterOOBIsForm, SendChallengeForm, SendOOBIForm } from './forms';

import addNewContacts from '../../../src/assets/img/add-new-contacts.svg';
import projectPlanning from '../../../src/assets/img/project-planning.svg';

class VideoCallTask {
  constructor(config) {
    this._id = 'video-call';
    this._label = config.label;
    this.oneToOne = config.oneToOne;
    this.acceptCredential = config.acceptCredential;
    this.next = config.next;

    this.aidToSend = config.aidToSend;
    this.steps = config.steps;
    this.participants = new Participants(config.initialParticipants || 1);

    if (config.skipIntro) {
      this.currentState = 'join-video-call';
    } else {
      this.currentState = 'intro';
    }
    this._component = {
      view: (vnode) => {
        return <VideoCall end={vnode.attrs.end} parent={this} steps={this.steps} />;
      },
    };
    this.stayInCallPanel = {
      view: (vnode) => {
        return <StayInCallPanel parent={this} />;
      },
    };
    this.acceptingIntroductionsPanel = {
      view: (vnode) => {
        return <AcceptingIntroductionsPanel parent={this} />;
      },
    };
    this.copyChallengePanel = {
      view: (vnode) => {
        return <CopyChallengePanel parent={this} />;
      },
    };
    this.receiveChallengePanel = {
      view: (vnode) => {
        return <ReceiveChallengePanel parent={this} />;
      },
    };
  }

  get imgSrc() {
    return projectPlanning;
  }

  get id() {
    return this._id;
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
        return this.stayInCallPanel;
      case 'receive-oobi':
        return this.acceptingIntroductionsPanel;
      case 'send-challenge':
        return this.copyChallengePanel;
      case 'receive-challenge':
        return this.receiveChallengePanel;
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
            <h3>Create GLEIF RoOT Multi-sig AID</h3>
            <p>Steps to create:</p>
            <ol class="styled-ol margin-v-2">
              <li>Join a Video Call with Root GARs.</li>
              <li>Send your OOBI over video call.</li>
              <li>Receive OOBIs over video call.</li>
              <li>Send challenge message to others.</li>
              <li>Receive challenge messages.</li>
              <li>Configure RoOT (optional).</li>
            </ol>
            <div
              class={`flex flex-align-center margin-top-4 ${
                vnode.attrs.parent.next ? 'flex-justify-between' : 'flex-justify-end'
              }`}
            >
              {vnode.attrs.parent.next && (
                <>
                  <Button
                    class="button--gray-dk button--big button--no-transform"
                    raised
                    label="Skip"
                    onclick={() => {
                      vnode.attrs.parent.currentState = 'skip-identity-authentication';
                    }}
                  />
                </>
              )}
              <Button
                class="button--big button--no-transform"
                raised
                label="Continue"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'join-video-call';
                }}
              />
            </div>
          </>
        )}
        {vnode.attrs.parent.currentState === 'skip-identity-authentication' && (
          <>
            <h3>Skip Identity Authentication</h3>
            <p class="p-tag margin-v-2">
              If you have already completed Identity Authentication with all participants you may continue to initiating
              a Multi-Sig Group.
            </p>
            <div class="flex flex-align-center flex-justify-between margin-top-4">
              <Button
                raised
                class="button--gray-dk button--big button--no-transform"
                label="Go Back"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'intro';
                }}
              />
              <Button
                raised
                class="button--big button--no-transform"
                label="Skip"
                onclick={() => {
                  Tasks.active = vnode.attrs.parent.next;
                }}
              />
            </div>
          </>
        )}
        {vnode.attrs.parent.currentState === 'join-video-call' && (
          <>
            <Progress stepNum={1} totalSteps={6} stepLabel={'Join'} />
            <img src={projectPlanning} style={{ marginBottom: '2rem', width: '240px' }} />
            <h3>Join a Video Call</h3>
            <p class="p-tag">
              In order to start the creation of the multisig AID process, you will need to initiate an real-time Out of
              Band Interaction (OOBI) session in which you and the other users are present, You will accept all their
              OOBIs (URL + AID) on a Video Call so that you can create the GLEIF RoOT.
            </p>
            <p class="p-tag-bold">
              The ecosystem governance framework requires 11 additional GARs to join this process (total of 12
              participants).
            </p>
            <div class="flex flex-justify-between margin-top-4">
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
            <Progress stepNum={2} totalSteps={6} stepLabel={'Send OOBI'} />
            <h3>Generate Out Of Band Introduction</h3>
            <SendOOBIForm aidToSend={vnode.attrs.parent.aidToSend} />
            <div class="flex flex-justify-between margin-top-4">
              <Button
                class="button--gray-dk button--big button--no-transform"
                raised
                label="Go Back"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'join-video-call';
                }}
              />
              <Button
                class="button--big button--no-transform"
                raised
                label="Continue"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'receive-oobi';
                }}
              />
            </div>
          </>
        )}
        {vnode.attrs.parent.currentState === 'receive-oobi' && (
          <>
            <Progress stepNum={3} totalSteps={6} stepLabel={'Receive OOBI'} />
            <EnterOOBIsForm participants={vnode.attrs.parent.participants} oneToOne={vnode.attrs.parent.oneToOne} />
            <div class="flex flex-justify-between margin-top-4">
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
                label="Continue"
                disabled={!vnode.attrs.parent.participants.oobisResolved()}
                onclick={() => {
                  vnode.attrs.parent.currentState = 'send-challenge';
                }}
              />
            </div>
          </>
        )}
        {vnode.attrs.parent.currentState === 'send-challenge' && (
          <>
            <Progress stepNum={4} totalSteps={6} stepLabel={'Send Challenge'} />
            <SendChallengeForm participants={vnode.attrs.parent.participants} />
            <div class="flex flex-justify-between margin-top-4">
              <Button
                class="button--gray-dk button--big button--no-transform"
                raised
                label="Go Back"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'receive-oobi';
                }}
              />
              <Button
                class="button--big button--no-transform"
                raised
                label="Continue"
                disabled={!vnode.attrs.parent.participants.oobisResolved()}
                onclick={() => {
                  vnode.attrs.parent.currentState = 'receive-challenge';
                }}
              />
            </div>
          </>
        )}
        {vnode.attrs.parent.currentState === 'receive-challenge' && (
          <>
            <Progress stepNum={5} totalSteps={6} stepLabel={'Receive Challenge'} />
            <EnterChallengesForm
              aidToSend={vnode.attrs.parent.aidToSend}
              participants={vnode.attrs.parent.participants}
            />
            <div class="flex flex-justify-between">
              <Button
                class="button--gray-dk button--big button--no-transform"
                raised
                label="Go Back"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'send-challenge';
                }}
              />
              <Button
                class="button--big button--no-transform"
                raised
                label="Next"
                disabled={
                  !(vnode.attrs.parent.participants.oobisVerified() && vnode.attrs.parent.participants.oobisConfirmed())
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
      </>
    );
  }
}

class StayInCallPanel {
  view(vnode) {
    return (
      <>
        <img src={projectPlanning} style={{ width: '200px', margin: '0 0 1rem 0' }} alt="" />
        <h3>Stay in the Video Call</h3>
        <p>
          Stay in the Video Call after you have received introductions from the other participants because there will be
          more steps coming up.
        </p>
      </>
    );
  }
}

class AcceptingIntroductionsPanel {
  view() {
    return (
      <>
        <img src={projectPlanning} style={{ width: '200px', margin: '0 0 1rem 0' }} alt="" />
        <h3>Accepting Out Of Band Introductions</h3>
        <p>
          For each of the N people in your multisig group, create an alias for them and verify their OOBI URL copied
          from the video call chat using the right panel.
        </p>
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
        <img src={projectPlanning} style={{ width: '200px', margin: '0 0 1.5rem 0' }} />
        <h3>Copy Challenge Message</h3>
        <p>
          Click the copy button to copy your challenge message to your clipboard and then paste it into the video call
          chat.
        </p>
        <p>The other participants in the group will use Keep to send this back to you as a challenge response.</p>
      </>
    );
  }
}

class ReceiveChallengePanel {
  view(vnode) {
    return (
      <>
        <div class="flex flex-align-center flex-justify-between">
          <img src={addNewContacts} style={{ width: '120px', margin: '1.5rem 0 1rem 0' }} />
          <h3>Challenge Message Recipients</h3>
        </div>
        <div class="flex flex-align-center flex-justify-between">
          <p class="font-color--battleship">Participant</p>
          <p class="font-color--battleship">Status</p>
        </div>
        <p class="p-tag margin-v-2">
          Paste the message into the video chat so that your contact{vnode.attrs.parent.oneToOne ? '' : 's'} can be
          verified
          <br />
          <br />
          <strong>
            Important! Don't use a challenge message from another session, it should be unique to this session taking
            place today.
          </strong>
        </p>
        {vnode.attrs.parent.participants.oobis.map((signer, index) => {
          return (
            <>
              <div class="flex flex-align-center flex-justify-between">
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
