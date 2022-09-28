import m from 'mithril';

import { Button, Progress } from '../../../src/app/components';
import { Profile, KERI, Contacts, Participants } from '../../../src/app/services';
import { EnterChallengesForm, EnterOOBIsForm, SendChallengeForm, SendOOBIForm } from './forms';
import './video-call.scss';

import addNewContacts from '../../../src/assets/img/add-new-contacts.svg';
import projectPlanning from '../../../src/assets/img/project-planning.svg';

class SpotCheckTask {
  constructor(config) {
    this.config = config;
    this.reset();
  }

  reset() {
    this._id = 'spot-check';
    this._label = this.config.label;
    this.variables = this.config.variables;

    this.currentState = 'intro';

    this._component = {
      view: (vnode) => {
        return <SpotCheck end={vnode.attrs.end} parent={this} steps={this.steps} />;
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

class SpotCheck {
  constructor(vnode) {
    this.contact = Contacts.selected;
    this.participants = new Participants(1);
    this.participants.oobis[0].alias = this.contact.alias;
    this.aid = KERI.parseAIDFromUrl(this.contact.oobi);
  }

  view(vnode) {
    return (
      <>
        {vnode.attrs.parent.currentState === 'intro' && (
          <>
            <h4 class="text--underline margin-bottom-2">
              Perform Identifiy Authentication Spot Check with {this.contact.alias}
            </h4>
            <p class="steps-header">Steps to Spot Check a Contact:</p>
            <ol className="styled-ol margin-v-2">
              <li>Join a Video Call with a {this.contact.alias} to spot check.</li>
              <li>Send your OOBI over video call.</li>
              <li>Receive their OOBI over video call.</li>
              <li>Send challenge message to other.</li>
              <li>Receive challenge messages.</li>
              <li>{this.contact.alias} will be marked as authenticated.</li>
            </ol>
            <div class="flex flex-align-center flex-justify-end margin-top-4">
              <Button
                raised
                label="Continue"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'join-video-call';
                }}
              />
            </div>
          </>
        )}
        {vnode.attrs.parent.currentState === 'join-video-call' && (
          <>
            <Progress stepNum={1} totalSteps={6} stepLabel={'Join'} />
            <img src={projectPlanning} style={{ width: '100px' }} />
            <h4>Join a Video Call</h4>
            <p class="font-color--battleship font-size--14">
              In order to spot check another AID, you will need to initiate an real-time Out of Band Interaction (OOBI)
              session in which you and the other user is present, You will accept their OOBI (URL + AID) on a Video Call
              so that you can complete 2-factor identity authentication.
            </p>
            <p class="font-weight--semi-bold"></p>
            <div class="flex flex-justify-end margin-top-4">
              <Button
                class="button--secondary margin-right-1"
                raised
                label="Go Back"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'intro';
                }}
              />
              <Button
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
          <div class="send-oobi">
            <Progress stepNum={2} totalSteps={6} stepLabel={'Send OOBI'} />
            <h4>Generate Out Of Band Introduction</h4>
            <SendOOBIForm aidToSend={Profile.getDefaultAID()} />
            <div class="flex flex-justify-end margin-top-4">
              <Button
                class="button--secondary margin-right-1"
                raised
                label="Go Back"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'join-video-call';
                }}
              />
              <Button
                raised
                label="Continue"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'receive-oobi';
                }}
              />
            </div>
          </div>
        )}
        {vnode.attrs.parent.currentState === 'receive-oobi' && (
          <>
            <Progress stepNum={3} totalSteps={6} stepLabel={'Receive OOBI'} />
            <EnterOOBIsForm participants={this.participants} oneToOne={true} aliasDisabled={true} aid={this.aid} />
            <div class="flex flex-justify-end margin-top-4">
              <Button
                class="button--secondary margin-right-1"
                raised
                label="Go Back"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'send-oobi';
                }}
              />
              <Button
                raised
                label="Continue"
                disabled={!this.participants.oobisResolved()}
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
            <SendChallengeForm participants={this.participants} />
            <div class="flex flex-justify-end margin-top-4">
              <Button
                class="button--secondary margin-right-1"
                raised
                label="Go Back"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'receive-oobi';
                }}
              />
              <Button
                raised
                label="Continue"
                disabled={!this.participants.oobisResolved()}
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
            <EnterChallengesForm aidToSend={Profile.getDefaultAID()} participants={this.participants} />
            <div class="flex flex-justify-end">
              <Button
                class="button--secondary margin-right-1"
                raised
                label="Go Back"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'send-challenge';
                }}
              />
              <Button
                raised
                label="Next"
                disabled={!(this.participants.oobisVerified() && this.participants.oobisConfirmed())}
                onclick={() => {
                  vnode.attrs.parent.currentState = 'authorized';
                }}
              />
            </div>
          </>
        )}
        {vnode.attrs.parent.currentState === 'authorized' && (
          <>
            <Progress stepNum={6} totalSteps={6} stepLabel={'Authenticated'} />
            <img src={projectPlanning} style={{ width: '120px' }} />
            <h4>{this.contact.alias} Has been Authenticated</h4>
            <p class="font-size--14 font-color--battleship">
              The contact for {this.contact.alias} has been authenticated will now appear in your Contacts list as an
              authrozied contact.
            </p>
            <div class="flex flex-align-center flex-justify-end margin-top-4">
              <Button
                raised
                label="Finished"
                onclick={() => {
                  vnode.attrs.end();
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
        <img src={projectPlanning} style={{ width: '120px', margin: '0 0 1rem 0' }} alt="" />
        <h4>Stay in the Video Call</h4>
        <p class="font-size--14 font-color--battleship">
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
        <img src={projectPlanning} style={{ width: '120px', margin: '0 0 1rem 0' }} alt="" />
        <h4>Accepting Out Of Band Introductions</h4>
        <p class="font-size--14 font-color--battleship">
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
        <img src={projectPlanning} style={{ width: '120px', margin: '0 0 1rem 0' }} />
        <h4>Copy Challenge Message</h4>
        <p class="font-size--14 font-color--battleship">
          Click the copy button to copy your challenge message to your clipboard and then paste it into the video call
          chat.
        </p>
        <p class="font-size--14 font-color--battleship">
          The other participants in the group will use Keep to send this back to you as a challenge response.
        </p>
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
        <p class="font-size--14 font-color--battleship margin-v-2">
          Paste the message into the video chat so that your contact{vnode.attrs.parent.oneToOne ? '' : 's'} can be
          verified
          <br />
          <br />
          <strong>
            Important! Don't use a challenge message from another session, it should be unique to this session taking
            place today.
          </strong>
        </p>
        <div class="flex flex-align-center flex-justify-between">
          <p class="font-size--14 font-weight--bold font-color--battleship">Participant</p>
          <p class="font-size--14 font-weight--bold font-color--battleship">Status</p>
        </div>
        {Participants.instance.oobis.map((signer, index) => {
          return (
            <>
              <div class="flex flex-align-center flex-justify-between">
                <p class="font-size--14 font-weight--semi-bold">{signer.alias}</p>
                {!signer.verified && <p class="font-size--14 font-color--blue">In Progress</p>}
                {signer.verified && <p class="font-size--14 font-color--green">Verified!</p>}
              </div>
            </>
          );
        })}
      </>
    );
  }
}

module.exports = SpotCheckTask;
