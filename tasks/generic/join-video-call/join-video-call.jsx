import m from 'mithril';
import { Button, Card, TextField, TextTooltip } from '../../../src/app/components';
import { KERI } from '../../../src/app/services';

import addNewContacts from '../../../src/assets/img/add-new-contacts.png';
import responseMessage from '../../../src/assets/img/response-message.png';
import uploadFile from '../../../src/assets/img/upload-file.png';

class DelegatingAIDs {
  constructor(vnode) {}

  view(vnode) {
    return (
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
            onclick={vnode.attrs.back}
          />
          <Button class="button--big button--no-transform" raised label="Generate" onclick={vnode.attrs.continue} />
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

  oninit(vnode) {
    this.oobi.alias = vnode.attrs.identifiers[0].name;
    KERI.getOOBI(this.oobi.alias, 'witness')
      .then((oobi) => {
        this.oobi.url = oobi.oobis[0];
      })
      .catch((err) => {
        console.log('getOOBI', err);
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
          Copy this OOBI (AID + URL) to share your identifying information with all parties on the call, and paste it
          into the Video Call.
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

class EnterOOBIs {
  constructor(vnode) {
    this.alias = vnode.attrs.identifiers[0].name;
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
    return KERI.resolveOOBI(this.alias, oobi.alias, oobi.url);
  }

  resolveAllOOBIs() {
    let promises = this.oobis
      .filter((oobi) => {
        return oobi.alias && oobi.url;
      })
      .map((oobi) => {
        return this.resolveOOBIPromise(oobi);
      });
    return Promise.all(promises);
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
          <Button
            class="button--no-transform"
            raised
            label="Add Another"
            onclick={() => {
              this.oobis.push({
                alias: '',
                url: '',
              });
            }}
          />
        </div>
        <div class="flex flex-justify-end">
          <Button
            class="button--big button--no-transform"
            raised
            label="Continue"
            onclick={() => {
              this.resolveAllOOBIs()
                .then(() => {
                  vnode.attrs.setOOBIs(
                    this.oobis.filter((oobi) => {
                      return oobi.alias && oobi.url;
                    })
                  );
                  vnode.attrs.continue();
                })
                .catch((err) => {
                  console.log('resolveAllOOBIs', err);
                });
            }}
          />
        </div>
      </>
    );
  }
}

// class IdentityVerification {
//   constructor(vnode) {}
//   view(vnode) {
//     return (
//       <>
//         <img src={uploadFile} style={{ width: '60%', margin: '1.5rem 0 2rem 0' }} />
//         <h3>Identity Verification in Progress</h3>
//         <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
//           Remain in the Video Call. The initiator will generate a challenge message and send it to you in this portal so
//           that you may send it back for verification purposes.
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

// class SendChallengeMessage {
//   constructor(vnode) {}

//   view(vnode) {
//     return (
//       <>
//         <img src={responseMessage} style={{ width: '50%', margin: '1.5rem 0 2rem 0' }} />
//         <h3>Paste Challenge Message Below</h3>
//         <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
//           Enter the 12-word challenge message into the chat and send to the initiator via direct message.
//         </p>
//         <TextField outlined fluid textarea style={{ margin: '0 0 4rem 0', backgroundColor: 'rgba(0, 0, 0, 0.04)' }} />
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

// class SelectChallengeRecipients {
//   constructor(vnode) {
//     this.recipients = ['', '', ''];
//   }

//   view(vnode) {
//     return (
//       <>
//         <img src={responseMessage} style={{ width: '240px', margin: '1.5rem 0 2rem 0' }} />
//         <h3>Paste Challenge Message in Video Call</h3>
//         <p class="p-tag">
//           The next step of verification is to send each person a challenge message. Please enter the aliases of each
//           person in order that will be receiving a challenge message in Zoom.
//         </p>
//         {this.recipients.map((value, index) => {
//           return (
//             <TextField
//               outlined
//               fluid
//               style={{ margin: '0 0 2rem 0' }}
//               iconTrailing={{
//                 icon: 'search',
//                 onclick: (e) => {
//                   console.log(e);
//                 },
//               }}
//               value={value}
//               oninput={(e) => {
//                 this.recipients[index] = e.target.value;
//               }}
//             />
//           );
//         })}
//         <div class="flex flex-justify-end">
//           <Button class="button--big button--no-transform" raised label="Continue" onclick={vnode.attrs.continue} />
//         </div>
//       </>
//     );
//   }
// }

class GenerateChallenge {
  constructor(vnode) {}

  view(vnode) {
    return (
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
    KERI.generateChallengeMessage()
      .then((res) => {
        console.log(res);
        this.challangeMessage = res.words.join(' ');
      })
      .catch((err) => {
        console.log('generateChallengeMessage', err);
      });
  }

  view(vnode) {
    return (
      <>
        <img src={responseMessage} style={{ width: '240px', margin: '1.5rem 0 2rem 0' }} />
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
  constructor(vnode) {
    this.alias = vnode.attrs.identifiers[0].name;
    this.signers = [];
    this.aliases = vnode.attrs.oobis.map((oobi) => {
      return oobi.alias;
    });
    KERI.getContactsByAliases(this.aliases)
      .then((contacts) => {
        this.signers = contacts.map((contact) => {
          return {
            id: contact.id,
            alias: contact.alias,
            challengeMessage: '',
          };
        });
      })
      .catch((err) => {
        console.log('getContacts', err);
      });
  }

  signChallengePromise(signer) {
    return KERI.signChallengeMessage(this.alias, signer.id, signer.challengeMessage.split(' '));
  }

  signAllChallengeMessages() {
    let promises = this.signers
      .filter((signer) => {
        return signer.alias && signer.challengeMessage;
      })
      .map((signer) => {
        return this.signChallengePromise(signer);
      });
    return Promise.all(promises);
  }

  view(vnode) {
    return (
      <>
        {this.signers.map((signer, index) => {
          return (
            <>
              <Card>
                <p>{signer.alias}</p>
                <p>
                  Signer {index + 1} of {this.signers.length}
                </p>
                <TextField
                  outlined
                  fluid
                  textarea
                  style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }}
                  value={signer.challengeMessage}
                  oninput={(e) => {
                    signer.challengeMessage = e.target.value;
                  }}
                />
              </Card>
            </>
          );
        })}
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
            label="Next"
            onclick={() => {
              this.signAllChallengeMessages()
                .then(() => {
                  vnode.attrs.continue();
                })
                .catch((err) => {
                  console.log('signAllChallengeMessages', err);
                });
            }}
          />
        </div>
      </>
    );
  }
}

class VerificationProgress {
  constructor(vnode) {}

  view(vnode) {
    return (
      <>
        <img src={uploadFile} style={{ width: '240px', margin: '1.5rem 0 2rem 0' }} />
        <h3>Your Verification is Under Review</h3>
        <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
          You will be notified when the initiator verifies your signature and you will resume on a Video Call to
          configure the multi-sig set.
        </p>
        <div class="flex flex-justify-end">
          <Button class="button--big button--no-transform" raised label="close" onclick={vnode.attrs.end} />
        </div>
      </>
    );
  }
}

class JoinVideoCall {
  constructor() {
    this.currentState = 'delegating-aids';
    this.identifiers = [];
    this.oobis = [];
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
              this.currentState = 'send-oobi';
            }}
          />
        )}
        {this.currentState === 'send-oobi' && (
          <SendOOBI
            identifiers={this.identifiers}
            back={() => {
              this.currentState = 'video-call';
            }}
            continue={() => {
              this.currentState = 'enter-oobis';
            }}
          />
        )}
        {this.currentState === 'enter-oobis' && (
          <EnterOOBIs
            identifiers={this.identifiers}
            setOOBIs={(oobis) => {
              this.oobis = oobis;
            }}
            back={() => {
              this.currentState = 'send-oobi';
            }}
            continue={() => {
              this.currentState = 'generate-challenge';
            }}
          />
        )}
        {/* {this.currentState === 'select-challenge-recipients' && (
          <SelectChallengeRecipients
            back={() => {
              this.currentState = 'enter-oobis';
            }}
            continue={() => {
              this.currentState = 'generate-challenge';
            }}
          />
        )} */}
        {this.currentState === 'generate-challenge' && (
          <GenerateChallenge
            back={() => {
              this.currentState = 'enter-oobis';
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
            identifiers={this.identifiers}
            oobis={this.oobis}
            back={() => {
              this.currentState = 'copy-challenge';
            }}
            continue={() => {
              this.currentState = 'verification-progress';
            }}
          />
        )}
        {/* {this.currentState === 'identity-verification' && (
          <IdentityVerification
            back={() => {
              this.currentState = 'send-oobi';
            }}
            continue={() => {
              this.currentState = 'send-challenge-message';
            }}
          />
        )} */}
        {/* {this.currentState === 'send-challenge-message' && (
          <SendChallengeMessage
            back={() => {
              this.currentState = 'enter-oobis';
            }}
            continue={() => {
              this.currentState = 'verification-progress';
            }}
          />
        )} */}
        {this.currentState === 'verification-progress' && <VerificationProgress end={vnode.attrs.end} />}
      </>
    );
  }
}

module.exports = JoinVideoCall;
