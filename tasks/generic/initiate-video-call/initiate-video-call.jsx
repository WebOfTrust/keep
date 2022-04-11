import m from 'mithril';
import { Button, Card, TextField, TextTooltip } from '../../../src/app/components';
import { KERI } from '../../../src/app/services';

import addNewContacts from '../../../src/assets/img/add-new-contacts.png';
import projectPlanning from '../../../src/assets/img/project-planning.png';
import responseMessage from '../../../src/assets/img/response-message.png';
import tempProfPic from '../../../src/assets/img/temp-prof-pic.jpg';
import uploadFile from '../../../src/assets/img/upload-file.png';

class DelegatingAIDs {
  constructor(vnode) {}

  view(vnode) {
    return (
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
          <Button class="button--big button--no-transform" raised label="Continue" onclick={vnode.attrs.continue} />
        </div>
      </>
    );
  }
}

class VideoCall {
  constructor(vnode) {}

  view(vnode) {
    return (
      <>
        <img src={projectPlanning} style={{ marginBottom: '2rem', width: '240px' }} />
        <h3>Initiate a Video Call</h3>
        <p class="p-tag" style={{ margin: '2rem 0 6rem 0' }}>
          In order to start the authentication process, you will need to initiate an real-time Out of Band Interaction
          (OOBI) session in which you and the other users are present, You will accept all their OOBIs (URL + AID) on a
          Video Call so that you can receive their identifying information.
        </p>
        <div class="flex flex-justify-between">
          <Button
            class="button--gray-dk button--big button--no-transform"
            raised
            label="Go Back"
            onclick={vnode.attrs.back}
          />
          <Button class="button--big button--no-transform" raised label="Continue" onclick={vnode.attrs.continue} />
        </div>
      </>
    );
  }
}

class StartVideoCall {
  constructor(vnode) {}

  view(vnode) {
    return (
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
            onclick={vnode.attrs.back}
          />
          <Button class="button--big button--no-transform" raised label="Get Started" onclick={vnode.attrs.continue} />
        </div>
      </>
    );
  }
}

class SendOOBI {
  constructor(vnode) {
    this.oobi = {
      alias: '',
      url: '',
    };
  }

  oninit() {
    KERI.listIdentifiers().then((identifiers) => {
      this.oobi.alias = identifiers[0].name;
      KERI.getOOBI(identifiers[0].name, 'witness').then((oobi) => {
        this.oobi.url = oobi.oobis[0];
      });
    });
  }

  copyAlias() {
    navigator.clipboard.writeText(this.oobi.alias).then(
      () => {},
      () => {}
    );
  }

  copyURL() {
    navigator.clipboard.writeText(this.oobi.url).then(
      () => {},
      () => {}
    );
  }

  view(vnode) {
    return (
      <>
        <img src={addNewContacts} style={{ width: '200px', margin: '0 0 1rem 0' }} />
        <h3>Send OOBI</h3>
        <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
          Copy this OOBI (AID + URL) to share your identifying information, and paste it into the Video Call.
        </p>
        <h3>Alias:</h3>
        <TextField
          outlined
          fluid
          style={{ margin: '0 0 1rem 0', backgroundColor: 'rgba(0, 0, 0, 0.04)' }}
          value={this.oobi.alias}
          iconTrailing={{
            icon: 'content_copy',
            onclick: (e) => {
              this.copyAlias();
            },
          }}
        />
        <h3>URL:</h3>
        <TextField
          outlined
          fluid
          style={{ margin: '0 0 2rem 0', backgroundColor: 'rgba(0, 0, 0, 0.04)' }}
          value={this.oobi.url}
          iconTrailing={{
            icon: 'content_copy',
            onclick: (e) => {
              this.copyURL();
            },
          }}
        />
        <div class="flex flex-justify-between">
          <Button
            class="button--gray-dk button--big button--no-transform"
            raised
            label="Go Back"
            onclick={vnode.attrs.back}
          />
          <Button class="button--big button--no-transform" raised label="Continue" onclick={vnode.attrs.continue} />
        </div>
      </>
    );
  }
}

// class AcceptOOBIs {
//   constructor(vnode) {}

//   view(vnode) {
//     return (
//       <>
//         <img src={uploadFile} style={{ width: '240px', margin: '0 0 0 0' }} />
//         <h3>
//           Accept the{' '}
//           <TextTooltip label={<u>OOBIs</u>}>
//             OOBI is an out of band (meaning outside this software) interaction.
//           </TextTooltip>
//         </h3>
//         <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
//           While on the Video Call, make sure to obtain each participant's <strong>URL and OOBI</strong>. When you have
//           both for everyone, please press continue.
//         </p>
//         <div class="flex flex-justify-between">
//           <Button
//             class="button--gray-dk button--big button--no-transform"
//             raised
//             label="Go Back"
//             onclick={vnode.attrs.back}
//           />
//           <Button class="button--big button--no-transform" raised label="Continue" onclick={vnode.attrs.continue} />
//         </div>
//       </>
//     );
//   }
// }

class EnterOOBIs {
  constructor(vnode) {
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
  }

  resolveOOBIPromise(oobi) {
    return KERI.resolveOOBI(oobi.alias, oobi.url);
  }

  resolveAllOOBIs(vnode) {
    let promises = this.oobis
      .filter((oobi) => {
        return oobi.alias && oobi.url;
      })
      .map((oobi) => {
        return this.resolveOOBIPromise(oobi);
      });
    Promise.all(promises).then(() => {
      vnode.attrs.continue();
    });
  }

  view(vnode) {
    return (
      <>
        <h3>Enter OOBIs</h3>
        <div style={{ height: '512px', overflowY: 'auto', margin: '0 0 1rem 0', paddingRight: '1rem' }}>
          <div class="flex flex-justify-between" style={{ alignItems: 'baseline' }}>
            <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
              Enter AIDs, URLs and Aliases you received on the Video Call from all participants below:
            </p>
          </div>
          {this.oobis.map((oobi) => {
            return (
              <Card class="card--fluid" style={{ margin: '0 0 1.5rem 0' }}>
                <div class="flex flex-align-center flex-justify-between">
                  <h5 style={{ width: '100px' }}>Alias:</h5>
                  <TextField
                    outlined
                    fluid
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }}
                    value={oobi.alias}
                    oninput={(e) => {
                      oobi.alias = e.target.value;
                    }}
                  />
                </div>
                <div class="flex flex-align-center flex-justify-between">
                  <h5 style={{ width: '100px' }}>URL:</h5>
                  <TextField
                    outlined
                    fluid
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }}
                    value={oobi.url}
                    oninput={(e) => {
                      oobi.url = e.target.value;
                    }}
                  />
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
              this.resolveAllOOBIs(vnode);
            }}
          />
        </div>
      </>
    );
  }
}

class SelectChallengeRecipients {
  constructor(vnode) {
    this.recipients = ['', '', ''];
  }

  view(vnode) {
    return (
      <>
        <img src={responseMessage} style={{ width: '240px', margin: '1.5rem 0 2rem 0' }} />
        <h3>Select Challenge Message Recipients</h3>
        <p class="p-tag">
          The next step of verification is to send each person a challenge message. Please enter the aliases of each
          person in order that will be receiving a challenge message in Zoom.
        </p>
        {this.recipients.map((value, index) => {
          return (
            <TextField
              outlined
              fluid
              style={{ margin: '0 0 2rem 0' }}
              iconTrailing={{
                icon: 'search',
                onclick: (e) => {
                  console.log(e);
                },
              }}
              value={value}
              oninput={(e) => {
                this.recipients[index] = e.target.value;
              }}
            />
          );
        })}
        <div class="flex flex-justify-end">
          <Button class="button--big button--no-transform" raised label="Continue" onclick={vnode.attrs.continue} />
        </div>
      </>
    );
  }
}

class GenerateChallenge {
  constructor(vnode) {}

  view(vnode) {
    return (
      <>
        <img src={responseMessage} style={{ width: '50%', margin: '1.5rem 0 2rem 0' }} />
        <h3>Generate and Send Challenge Message</h3>
        <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
          Click the Generate Button to create a Challenge Messages to each member of the signing group.
        </p>
        <div class="flex flex-justify-between">
          <Button
            class="button--gray-dk button--big button--no-transform"
            raised
            label="Go Back"
            onclick={vnode.attrs.back}
          />
          <Button class="button--big button--no-transform" raised label="Generate" onclick={vnode.attrs.continue} />
        </div>
      </>
    );
  }
}

class CopyChallenge {
  constructor() {
    this.challangeMessage = '';
  }

  oninit() {
    KERI.generateChallengeMessage().then((res) => {
      console.log(res);
      this.challangeMessage = res.words.join(' ');
    });
  }

  view(vnode) {
    return (
      <>
        <img src={responseMessage} style={{ width: '50%', margin: '1.5rem 0 2rem 0' }} />
        <h3>Paste Challenge Message in Video Call</h3>
        <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
          Generate a message for each participant then direct message everyone in the video call.
          <br />
          <br />
          <strong>
            Important! Don't use a challenge message from another session, it should be unique to this session taking
            place today.
          </strong>
        </p>
        <TextField outlined textarea fluid style={{ margin: '0 0 4rem 0' }} value={this.challangeMessage} />
        <div class="flex flex-justify-between">
          <Button
            class="button--gray-dk button--big button--no-transform"
            raised
            label="Go Back"
            onclick={vnode.attrs.back}
          />
          <Button class="button--big button--no-transform" raised label="Continue" onclick={vnode.attrs.continue} />
        </div>
      </>
    );
  }
}

class EnterChallengeMessages {
  constructor(vnode) {}

  view(vnode) {
    return (
      <>
        <h3>Enter Bob’s Challenge Message Below</h3>
        <p>Signer 1 of 12</p>
        <p>Enter the challenge message that you received from Bob in the box below:</p>
        <TextField outlined fluid textarea style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }} />
        <div class="flex flex-justify-between">
          <Button
            class="button--gray-dk button--big button--no-transform"
            raised
            label="Go Back"
            onclick={vnode.attrs.back}
          />
          <Button class="button--big button--no-transform" raised label="Next" onclick={vnode.attrs.continue} />
        </div>
      </>
    );
  }
}

class WaitingForSignatures {
  constructor(vnode) {}

  view(vnode) {
    return (
      <>
        <img src={uploadFile} style={{ width: '60%', margin: '1.5rem 0 2rem 0' }} />
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
            onclick={vnode.attrs.back}
          />
          <Button
            class="button--big button--no-transform"
            raised
            label="Close(temp next)"
            onclick={vnode.attrs.continue}
          />
        </div>
      </>
    );
  }
}

class Notifications {
  tempNotiArray = [
    {
      type: 'You may now configure Multi-Sig Set',
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
    {
      type: 'New Verified Contact',
      displayPic: tempProfPic,
      linkText: 'View',
    },
  ];

  constructor(vnode) {}

  view(vnode) {
    return (
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
    );
  }
}

class InitiateVideoCall {
  constructor() {
    this.currentState = 'delegating-aids';
  }

  view(vnode) {
    return (
      <>
        {this.currentState === 'delegating-aids' && (
          <DelegatingAIDs
            continue={() => {
              this.currentState = 'video-call';
            }}
          />
        )}
        {this.currentState === 'video-call' && (
          <VideoCall
            back={() => {
              this.currentState = 'delegating-aids';
            }}
            continue={() => {
              this.currentState = 'start-video-call';
            }}
          />
        )}
        {this.currentState === 'start-video-call' && (
          <StartVideoCall
            back={() => {
              this.currentState = 'video-call';
            }}
            continue={() => {
              this.currentState = 'send-oobi';
            }}
          />
        )}
        {this.currentState === 'send-oobi' && (
          <SendOOBI
            back={() => {
              this.currentState = 'start-video-call';
            }}
            continue={() => {
              this.currentState = 'enter-oobis';
            }}
          />
        )}
        {/* {this.currentState === 'accept-oobi' && (
          <AcceptOOBIs
            back={() => {
              this.currentState = 'send-oobi';
            }}
            continue={() => {
              this.currentState = 'enter-oobis';
            }}
          />
        )} */}
        {this.currentState === 'enter-oobis' && (
          <EnterOOBIs
            back={() => {
              this.currentState = 'send-oobi';
            }}
            continue={() => {
              this.currentState = 'select-challenge-recipients';
            }}
          />
        )}
        {this.currentState === 'select-challenge-recipients' && (
          <SelectChallengeRecipients
            back={() => {
              this.currentState = 'enter-oobis';
            }}
            continue={() => {
              this.currentState = 'generate-challenge';
            }}
          />
        )}
        {this.currentState === 'generate-challenge' && (
          <GenerateChallenge
            back={() => {
              this.currentState = 'select-challenge-recipients';
            }}
            continue={() => {
              this.currentState = 'copy-challenge';
            }}
          />
        )}
        {this.currentState === 'copy-challenge' && (
          <CopyChallenge
            back={() => {
              this.currentState = 'generate-challenge';
            }}
            continue={() => {
              this.currentState = 'enter-challenge-messages';
            }}
          />
        )}
        {this.currentState === 'enter-challenge-messages' && (
          <EnterChallengeMessages
            back={() => {
              this.currentState = 'copy-challenge';
            }}
            continue={() => {
              this.currentState = 'waiting-for-signatures';
            }}
          />
        )}
        {this.currentState === 'waiting-for-signatures' && (
          <WaitingForSignatures
            back={() => {
              this.currentState = 'copy-challenge';
            }}
            continue={() => {
              this.currentState = 'notifications';
            }}
          />
        )}
        {this.currentState === 'notifications' && (
          <Notifications
            back={() => {
              this.currentState = 'waiting-for-signatures';
            }}
            end={vnode.attrs.end}
          />
        )}
      </>
    );
  }
}

module.exports = InitiateVideoCall;
