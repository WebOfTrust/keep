import m from 'mithril';

import { Button, Counter, Progress, TextField } from '../../../src/app/components';
import { Profile, Participants, KERI, MultiSig } from '../../../src/app/services';
import { Tasks } from '../../../src/app/services/tasks';
import { EnterChallengesForm, EnterOOBIsForm, SendChallengeForm, SendOOBIForm } from './forms';
import './video-call.scss';

import toDoList from '../../../src/assets/img/to-do-list.svg';
import addNewContacts from '../../../src/assets/img/add-new-contacts.svg';
import projectPlanning from '../../../src/assets/img/project-planning.svg';
import verifyCredentials from '../../../src/assets/img/verify-credentials.svg';

class VideoCallTask {
  constructor(config) {
    this.config = config;
    this.reset();
  }

  reset() {
    this._id = 'video-call';
    this._label = this.config.label;
    this.oneToOne = this.config.oneToOne;
    this.acceptCredential = this.config.acceptCredential;
    this.next = this.config.next;
    this.nextOptional = 'nextOptional' in this.config ? this.config.nextOptional : true;
    this.variables = this.config.variables;

    this.aidToSend = this.config.aidToSend;
    this.steps = this.config.steps;
    this.participants = new Participants(this.config.initialParticipants || 1);

    this.currentState = 'skip';

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
        return <AcceptingIntroductionsPanel parent={this}
                                            aidToSend={Profile.getDefaultAID()}
                                            initialParticipants={this.config.initialParticipants} />;
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

  sendOobis(vnode) {
    let aid = Profile.getDefaultAID(this.aidToSend);
    KERI.sendOOBIs(aid.name, this.participants.oobis).then(() => {
      if (this.nextOptional) {
        this.currentState = 'configure-group';
      } else if (this.next !== undefined) {
        this.next.recipient = this.participants.oobis[0];
        Tasks.active = this.next;
      } else {
        vnode.attrs.end();
      }
    });
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
        {vnode.attrs.parent.currentState === 'skip' && (
          <>
            <img class="task-img task-img--small" src={verifyCredentials} />
            <h4>{vnode.attrs.parent.variables.shouldSkipTitle}</h4>
            <p class="font-color--battleship">{vnode.attrs.parent.variables.shouldSkipIntro}</p>
            <div class="task-actions">
              <Button
                class="button--secondary margin-right-1"
                raised
                label="No"
                onclick={() => {
                  Participants.instance.oobis = [];
                  Tasks.active = vnode.attrs.parent.next;
                  vnode.attrs.parent.reset();
                }}
              />
              <Button
                raised
                label="Yes"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'intro';
                }}
              />
            </div>
          </>
        )}
        {vnode.attrs.parent.currentState === 'intro' && (
          <>
            <h3 class="margin-bottom-2">{vnode.attrs.parent.variables.title}</h3>
            <p class="steps-header">
              {vnode.attrs.parent.variables.subtitle ? vnode.attrs.parent.variables.subtitle : 'Steps to Create:'}
            </p>
            {vnode.attrs.parent.variables.steps}
            <div class="task-actions">
              {vnode.attrs.parent.next && (
                <Button
                  class="button--secondary margin-right-1"
                  raised
                  label="Go Back"
                  onclick={() => {
                    vnode.attrs.parent.currentState = 'skip';
                  }}
                />
              )}
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
            <img class="task-img task-img--small" src={projectPlanning} />
            <h4>Join a Video Call</h4>
            <p class="font-color--battleship font-size--12">{vnode.attrs.parent.variables.joinCallIntro}</p>
            <h4>{vnode.attrs.parent.variables.joinCallSubIntro}</h4>
            <p class="font-weight--semi-bold">{vnode.attrs.parent.variables.howManyParticipantsPrompt}</p>
            <Counter
              min={1}
              value={vnode.attrs.parent.participants.length}
              onchange={(value) => {
                vnode.attrs.parent.participants = new Participants(value);
              }}
            />
            <div class="task-actions">
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
            <SendOOBIForm aidToSend={vnode.attrs.parent.aidToSend} />
            <div class="task-actions">
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
            <EnterOOBIsForm participants={vnode.attrs.parent.participants} oneToOne={vnode.attrs.parent.oneToOne} />
            <div class="task-actions">
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
            <div class="task-actions">
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
            <div class="task-actions">
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
                disabled={
                  !(vnode.attrs.parent.participants.oobisVerified() && vnode.attrs.parent.participants.oobisConfirmed())
                }
                onclick={() => {
                  let aid = Profile.getDefaultAID();
                  if (aid.group) {
                    vnode.attrs.parent.currentState = 'share-oobis';
                  } else if (vnode.attrs.parent.nextOptional) {
                    vnode.attrs.parent.currentState = 'configure-group';
                  } else if (vnode.attrs.parent.next !== undefined) {
                    vnode.attrs.parent.next.recipient = vnode.attrs.parent.participants.oobis[0];
                    Tasks.active = vnode.attrs.parent.next;
                    vnode.attrs.parent.reset();
                  } else {
                    vnode.attrs.end();
                  }
                }}
              />
            </div>
          </>
        )}
        {vnode.attrs.parent.currentState === 'share-oobis' && (
          <>
            <Progress stepNum={6} totalSteps={6} stepLabel={'Configure'} />
            <img class="task-img task-img--small" src={projectPlanning} />
            <h4>Would you like to share OOBIs with your multi-sig group?</h4>
            <p class="font-size--12 font-color--battleship">
              You just performed an OOBI Exchange / Challenge Response using a multi-sig group AID. Would you like to
              share your new contacts with the other participants of your multi-sig group?
            </p>
            <div class="task-actions">
              <Button
                raised
                class="button--secondary margin-right-1"
                label="No"
                onclick={() => {
                  if (vnode.attrs.parent.nextOptional) {
                    vnode.attrs.parent.currentState = 'configure-group';
                  } else if (vnode.attrs.parent.next !== undefined) {
                    vnode.attrs.parent.next.recipient = vnode.attrs.parent.participants.oobis[0];
                    Tasks.active = vnode.attrs.parent.next;
                    vnode.attrs.parent.reset();
                  } else {
                    vnode.attrs.end();
                  }
                }}
              />
              <Button
                raised
                label="Yes"
                onclick={() => {
                  vnode.attrs.parent.sendOobis();
                }}
              />
            </div>
          </>
        )}
        {vnode.attrs.parent.currentState === 'configure-group' && (
          <>
            <Progress stepNum={6} totalSteps={6} stepLabel={'Configure'} />
            <img class="task-img task-img--small" src={projectPlanning} />
            <h4>{vnode.attrs.parent.variables.nextTaskTitle}</h4>
            <p class="font-size--12 font-color--battleship">{vnode.attrs.parent.variables.nextTaskBody}</p>
            <div class="task-actions">
              <Button
                raised
                class="button--secondary margin-right-1"
                label="No"
                onclick={() => {
                  vnode.attrs.end();
                }}
              />
              <Button
                raised
                label="Yes"
                onclick={() => {
                  if (vnode.attrs.parent.next !== undefined) {
                    vnode.attrs.parent.next.recipient = vnode.attrs.parent.participants.oobis[0];
                    Tasks.active = vnode.attrs.parent.next;
                    vnode.attrs.parent.reset();
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
        <img class="task-img task-img--small" src={projectPlanning} alt="" />
        <h4>Stay in the Video Call</h4>
        <p class="font-size--12 font-color--battleship">
          Stay in the Video Call after you have received introductions from the other participants because there will be
          more steps coming up.
        </p>
      </>
    );
  }
}

class AcceptingIntroductionsPanel {
  view(vnode) {
    return (
      <>
        <img class="task-img task-img--small" src={projectPlanning} alt="" />
        <h4>Accept Out Of Band Introductions</h4>
        <p class="font-size--12 font-color--battleship">
          For each of the additional {vnode.attrs.initialParticipants} people in your multisig group, create an alias for them and verify their OOBI URL copied
          from the video call chat using the right panel.
        </p>
        <p className="font-size--12 font-color--battleship margin-v-2">
          Other participants on the call might ask you to confirm your AID, this is:
          <p className="mono-aid font-color--battleship">{vnode.attrs.aidToSend.prefix}</p>
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
        <img class="task-img task-img--small" src={projectPlanning} alt="" />
        <h4>Copy Challenge Message</h4>
        <p class="font-size--12 font-color--battleship">
          Click the copy button to copy your challenge message to your clipboard and then paste it into the video call
          chat.
        </p>
        <p class="font-size--12 font-color--battleship">
          The other participants in the group will use Keep to send this back to you as a challenge response.
        </p>
      </>
    );
  }
}

class ReceiveChallengePanel {
  constructor(vnode) {
    this.alias = Profile.getDefaultAID(vnode.attrs.aidToSend).name;
    this.words = vnode.attrs.parent.participants.words;
    this.aliases = vnode.attrs.parent.participants.oobis.map((oobi) => {
      return oobi.alias;
    });
    this.ensureWordsSigned(vnode.attrs.parent.participants.oobis).then(() => {
      console.log("all signed");
    })
  }

  ensureWordsSigned(oobis) {
    let task = this;
    return new Promise(function (resolve, reject) {
      setTimeout(function waitForWords() {
        KERI.getContactsByAliases(task.aliases)
          .then((contacts) => {
            let done = oobis.every((oobi) => {
              return contacts.some((contact) => {
                let said = ""
                if (contact.alias === oobi.alias && contact.challenges.some((cha) => {
                  if(KERI.arrayEquals(cha.words, task.words)) {
                    said = cha.said
                    return true;
                  }
                  return false;
                })) {
                  oobi.verified = true;
                  KERI.acceptChallengeMessage(task.alias, { aid: contact.id, said: said });
                  m.redraw();
                  return true;
                }
                return false;
              });
            });
            if (done) return resolve();
            setTimeout(waitForWords, 2000);
          })
          .catch((err) => {
            reject();
            console.log('getContacts', err);
          });
      }, 2000);
    });
  }

  view(vnode) {
    console.log(vnode.attrs)
    return (
      <>
        <div class="flex flex-align-center flex-justify-between">
          <img class="task-img task-img--small" src={addNewContacts} alt="" />
          <h3>Challenge Message Recipients</h3>
        </div>
        <p class="font-size--12 font-color--battleship margin-v-2">
          For each of the additional {vnode.attrs.initialParticipants} participants, copy their challenge phrase from
          the video chat and paste into the corresponding box for the alias you gave them in the previous step.
          <br />
          <p className="font-size--12 font-color--battleship margin-v-2">
            Other participants on the call might ask you to confirm your challenge phrase, this is:
            <p className="mono-aid font-color--battleship">{vnode.attrs.parent.participants.words.join(' ')}</p>
          </p>
          <strong>
            Important! Don't use a challenge message from another session, it should be unique to this session taking
            place today.
          </strong>
        </p>
        <div class="flex flex-align-center flex-justify-between">
          <p class="font-weight--bold font-color--battleship">Participant</p>
          <p class="font-weight--bold font-color--battleship">Status</p>
        </div>
        {vnode.attrs.parent.participants.oobis.map((signer, index) => {
          return (
            <>
              <div class="flex flex-align-center flex-justify-between">
                <p class="font-weight--semi-bold">{signer.alias}</p>
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
