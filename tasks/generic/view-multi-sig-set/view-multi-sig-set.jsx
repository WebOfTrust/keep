import m from 'mithril';
import { Button, Card, TextField, Select } from '../../../src/app/components';
import secureMessaging from '../../../src/assets/img/secure-messaging.png';
import responseMessage from '../../../src/assets/img/response-message.png';
import uploadFile from '../../../src/assets/img/upload-file.png';
import addNewContacts from '../../../src/assets/img/add-new-contacts.png';
import redX from '../../../src/assets/img/red-x.svg';
import greenCheckMark from '../../../src/assets/img/green-check-mark.svg';
import toDoList from '../../../src/assets/img/to-do-list.png';
import tempProfPic from '../../../src/assets/img/temp-prof-pic.jpg';
class ViewMultiSigSet {
  tempMultiSigArray = [
    {
      number: 1,
      name: 'Jane Smith',
      weight: '1/4',
      signed: true,
    },
    {
      number: 2,
      name: 'Michael Williams',
      weight: '1/4',
      signed: false,
    },
    {
      number: 3,
      name: 'ZG4jvw9bTmVd5X92iKYmfT',
      weight: '1/2',
      signed: false,
    },
    {
      number: 4,
      name: 'OG8jvw9bTmUd5J92iKYmfU',
      weight: '1/2',
      signed: false,
    },
    {
      number: 5,
      name: 'Michael Williams',
      weight: '1/4',
      signed: false,
    },
    {
      number: 6,
      name: 'ZG4jvw9bTmVd5X92iKYmfT',
      weight: '1/8',
      signed: false,
    },
    {
      number: 7,
      name: 'OG8jvw9bTmUd5J92iKYmfU',
      weight: '1/8',
      signed: false,
    },
  ];

  signatureCounter(array) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].signed === false) {
        return false;
      }
    }
    return true;
  }

  tempNotiArray = [
    {
      type: 'You may now configure Multi-Sig set',
      displayPic: null,
      linkText: 'View',
    },
    {
      type: 'New Verified Contact',
      displayPic: tempProfPic,
      linkText: 'View',
    },
    {
      type: '',
      displayPic: null,
      linkText: '',
    },
    {
      type: '',
      displayPic: null,
      linkText: '',
    },
  ];

  constructor(vnode) {
    this.step = 0;
    this.steps = [
      <>
        <h3 style={{ margin: '0 0 3rem 0' }}>Notifications</h3>
        {this.tempNotiArray.map((noti) => {
          return (
            <div
              class="flex flex-justify-between divider"
              style={{ alignItems: 'center', margin: '0', height: '40px' }}
            >
              <div class="flex" style={{ alignItems: 'center', marginBottom: '-9px' }}>
                {noti.displayPic === null ? (
                  <img src={noti.displayPic} style={{ width: '28px', height: '0px', borderRadius: '50%' }} />
                ) : (
                  <img src={noti.displayPic} style={{ width: '28px', height: '28px', borderRadius: '50%' }} />
                )}

                <h5 style={{ margin: '0 0 0 1rem' }}>{noti.type}</h5>
              </div>

              <h5 style={{ color: '#3c64b1', margin: '0 0 -9px 0', alignItems: 'center' }}>
                <u
                  style={{ cursor: 'pointer' }}
                  onclick={() => {
                    this.step++;
                  }}
                >
                  {noti.linkText}
                </u>
              </h5>
            </div>
          );
        })}
        <div class="flex flex-justify-end" style={{ margin: '4rem 0 0 0' }}>
          <Button class="button--big button--no-transform" raised label="Close" onclick={vnode.attrs.end} />
        </div>
      </>,
      <>
        <img src={secureMessaging} style={{ width: '50%' }} />
        <h3>Configure Multi-Sig Set as QVI Genesis Controller</h3>
        <p class="p-tag">
          If you are seeing this, it is because you have verified contacts and can now configure the multi-sig set. You
          will now be tasked with creating the multi-sig set for all QDACs. Once this is completed, make sure that all
          members of the multi-sig group are available for an OOBI exchange.
        </p>
        <div class="flex flex-justify-end" style={{ margin: '4rem 0 0 0' }}>
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
        <h3>Event #130</h3>
        {this.signatureCounter(this.tempMultiSigArray) ? (
          <h4 class="p-tag" style={{ margin: '0 0 0 0' }}>
            Status: Multi-Sig Verification in Progress
          </h4>
        ) : (
          <h4 class="p-tag" style={{ margin: '0 0 0 0', color: '#af4445' }}>
            Status: Cancelled for insufficient signers.
          </h4>
        )}

        <div class="flex flex-justify-between">
          <p class="p-tag" style={{ margin: '2rem 0 1rem 4.5rem' }}>
            Name:
          </p>
          <p class="p-tag" style={{ margin: '2rem 1rem 1rem 0' }}>
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
                  style={{ width: '55%', backgroundColor: 'white', height: '40px', borderRadius: '3px' }}
                >
                  <p class="p-tag-bold" style={{ margin: '0 0 0 .5rem', fontSize: '80%' }}>
                    {sig.name}
                  </p>
                </div>

                <div style={{ margin: '0 0 0 .5rem' }}>
                  {sig.signed ? (
                    <img src={greenCheckMark} style={{ width: '80%' }} />
                  ) : (
                    <img src={redX} style={{ width: '80%' }} />
                  )}
                </div>
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
        <h3>Configure Multi-Sig Group</h3>
        <p class="p-tag">
          <strong>Are your signatures fractionally weighted?</strong>
          ex. Each signer equals 1/3 of the group.
        </p>
        <div class="flex">
          <div style={{ margin: '1rem 1.5rem 1rem 0' }}>
            <input
              class="radioButtons"
              type="radio"
              id="yesRadio"
              name="signatureRadio"
              value="yes"
              checked
              style
            ></input>
            <label for="yesRadio">Yes</label>
          </div>

          <div style={{ margin: '1rem 1.5rem 1rem 0' }}>
            <input class="radioButtons" type="radio" id="noRadio" name="signatureRadio" value="no"></input>
            <label for="noRadio">No</label>
          </div>
        </div>

        <div class="flex flex-justify-between">
          <p class="p-tag" style={{ fontSize: '80%' }}>
            <strong>Enter Required Signers (in order):</strong>
          </p>
          <p class="p-tag" style={{ fontSize: '80%' }}>
            <strong>Weight</strong>
          </p>
        </div>

        <div style={{ height: '300px', overflowY: 'scroll', margin: '0 0 2rem 0' }}>
          {this.tempMultiSigArray.map((signer) => {
            return (
              <div class="flex flex-justify-between " style={{ margin: '0 0 1rem 0' }}>
                <div
                  class="flex flex-align-center"
                  style={{ width: '80%', backgroundColor: 'white', height: '40px', borderRadius: '3px' }}
                >
                  <p class="p-tag-bold" style={{ margin: '0 0 0 .5rem', fontSize: '80%' }}>
                    {signer.name}
                  </p>
                </div>
                <div
                  class="flex flex-align-center"
                  style={{ width: '13%', backgroundColor: 'white', height: '40px', borderRadius: '3px' }}
                >
                  <p class="p-tag-bold" style={{ margin: '0 0 0 .5rem', fontSize: '80%' }}>
                    {signer.weight}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        {/* enter signers end */}
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
        <h3>Configure Multi-Sig Group</h3>
        <p class="p-tag">
          <strong>Are your signatures fractionally weighted?</strong>
          ex. Each signer equals 1/3 of the group.
        </p>
        <div class="flex">
          <div style={{ margin: '1rem 1.5rem 1rem 0' }}>
            <input class="radioButtons" type="radio" id="yesRadio" name="signatureRadio" value="yes" style></input>
            <label for="yesRadio">Yes</label>
          </div>

          <div style={{ margin: '1rem 1.5rem 1rem 0' }}>
            <input class="radioButtons" type="radio" id="noRadio" name="signatureRadio" value="no" checked></input>
            <label for="noRadio">No</label>
          </div>
        </div>
        <p class="p-tag">
          <strong>how many signers are required to sign?</strong>
        </p>

        <Select
          options={[
            { label: '3 signers', value: '3 signers' },
            { label: '1 signers', value: '1 signers' },
          ]}
          initialSelection={'3 signers'}
        />
        <p class="p-tag">
          <strong>
            Enter Signers (<u>in order</u>):{' '}
          </strong>
        </p>
        {/* enter signers start */}
        <div style={{ height: '275px', overflowY: 'scroll', margin: '0 0 2rem 0' }}>
          {this.tempMultiSigArray.map((signer) => {
            return (
              <div class="flex flex-justify-between " style={{ margin: '0 0 1rem 0' }}>
                <div
                  class="flex flex-align-center"
                  style={{ width: '80%', backgroundColor: 'white', height: '40px', borderRadius: '3px' }}
                >
                  <p class="p-tag-bold" style={{ margin: '0 0 0 .5rem', fontSize: '80%' }}></p>
                </div>
              </div>
            );
          })}
        </div>
        {/* enter signers end */}
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
        <img src={secureMessaging} style={{ width: '50%' }} />
        <h3>Select a delegator</h3>
        <p class="p-tag">
          Provide the AID and create an alias for the delegator that will be delegating the accesses to the QDACs.
        </p>
        <p class="p-tag">
          <strong>Delegator AID</strong>
        </p>
        <div
          class="flex flex-align-center"
          style={{ width: '80%', backgroundColor: 'white', height: '40px', borderRadius: '3px' }}
        >
          <p class="p-tag" style={{ margin: '0 0 0 .5rem', fontSize: '80%' }}>
            OG8jvw9bTmUd5J92iKYmfU
          </p>
        </div>
        <p class="p-tag">
          <strong>Delegator Alias</strong>
        </p>
        <div
          class="flex flex-align-center"
          style={{ width: '80%', backgroundColor: 'white', height: '40px', borderRadius: '3px' }}
        >
          <p class="p-tag" style={{ margin: '0 0 0 .5rem', fontSize: '80%' }}>
            ACME Corp.
          </p>
        </div>
        <div class="flex flex-justify-between" style={{ margin: '4rem 0 0 0' }}>
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
        <h3>Review and Confirm</h3>
        <p class="p-tag">Review signers to make sure the list is complete.</p>
        <p></p>

        <div class="flex flex-justify-between">
          <p class="p-tag" style={{ fontSize: '80%' }}>
            <strong>Enter Required Signers (in order):</strong>
          </p>
          <p class="p-tag" style={{ fontSize: '80%' }}>
            <strong>Weight</strong>
          </p>
        </div>
        <div style={{ height: '350px', overflowY: 'scroll', margin: '0 0 2rem 0' }}>
          {this.tempMultiSigArray.map((signer) => {
            return (
              <div class="flex flex-justify-between " style={{ margin: '0 0 1rem 0' }}>
                <div
                  class="flex flex-align-center"
                  style={{ width: '70%', backgroundColor: 'white', height: '40px', borderRadius: '3px' }}
                >
                  <p class="p-tag-bold" style={{ margin: '0 0 0 .5rem', fontSize: '80%' }}>
                    {signer.name}
                  </p>
                </div>
                <div
                  class="flex flex-align-center"
                  style={{
                    width: '13%',
                    backgroundColor: 'white',
                    height: '40px',
                    borderRadius: '3px',
                    marginRight: '1.5rem',
                  }}
                >
                  <p class="p-tag-bold" style={{ margin: '0 0 0 .5rem', fontSize: '80%' }}>
                    {signer.weight}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div class="flex flex-justify-between">
          <div style={{ width: '40%' }}>
            <p class="p-tag">
              <strong>Delegator</strong>
            </p>
            <div
              class="flex flex-align-center"
              style={{ width: '100%', backgroundColor: 'white', height: '40px', borderRadius: '3px' }}
            >
              <p class="p-tag-bold" style={{ margin: '0 0 0 .5rem', fontSize: '80%' }}>
                ACME Corp.
              </p>
            </div>
          </div>
          <div style={{ width: '55%' }}>
            <p class="p-tag">
              <strong>Delegator AID</strong>
            </p>
            <div
              class="flex flex-align-center"
              style={{ width: '100%', backgroundColor: 'white', height: '40px', borderRadius: '3px' }}
            >
              <p class="p-tag-bold" style={{ margin: '0 0 0 .5rem', fontSize: '80%' }}>
                OG8jvw9bTmUd5J92iKYmfU
              </p>
            </div>
          </div>
        </div>

        <div class="flex flex-justify-between" style={{ margin: '2rem 0 0 0' }}>
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
        <img src={secureMessaging} style={{ width: '50%' }} />
        <h3>Multi-Sig Setup is Completed!</h3>
        <p class="p-tag">
          Your multi-sig setup is now completed. You may now proceed to to configure the multi-sig set. Make sure that
          all members of the multi-sig group are available for an OOBI exchange.
        </p>
        <div class="flex flex-justify-end" style={{ margin: '4rem 0 0 0' }}>
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
        <h3>Select Multi-Sig Group Members</h3>
        <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
          Please select the multi-sig group members. Event will not validate unless the minimum signing threshold is
          met. When weighted, the threshold is a sum of 1.
        </p>
        {/* LONG TEXT BOXES TO MAP START */}
        <div class="flex flex-justify-between">
          <div>
            <p class="p-tag-bold">#1</p>
          </div>
          <TextField
            style={{ backgroundColor: 'white', height: '3rem', margin: '0 0 1.5rem 0', width: '75%' }}
            filled
            fluid
            placeholder="ACME Corp alias or AID"
            // oninput={(e) => {
            //   this.passcode = e.target.value;
            // }}
            iconTrailing={{
              icon: 'search',
            }}
          />
          <div>
            <p class="p-tag-bold">1/2</p>
          </div>
        </div>
        <div class="flex flex-justify-between">
          <div>
            <p class="p-tag-bold">#1</p>
          </div>
          <TextField
            style={{ backgroundColor: 'white', height: '3rem', margin: '0 0 1.5rem 0', width: '75%' }}
            filled
            fluid
            placeholder="ACME Corp alias or AID"
            // oninput={(e) => {
            //   this.passcode = e.target.value;
            // }}
            iconTrailing={{
              icon: 'search',
            }}
          />
          <div>
            <p class="p-tag-bold">1/2</p>
          </div>
        </div>
        <div class="flex flex-justify-between">
          <div>
            <p class="p-tag-bold">#1</p>
          </div>
          <TextField
            style={{ backgroundColor: 'white', height: '3rem', margin: '0 0 1.5rem 0', width: '75%' }}
            filled
            fluid
            placeholder="ACME Corp alias or AID"
            // oninput={(e) => {
            //   this.passcode = e.target.value;
            // }}
            iconTrailing={{
              icon: 'search',
            }}
          />
          <div>
            <p class="p-tag-bold">1/4</p>
          </div>
        </div>
        <div class="flex flex-justify-between">
          <div>
            <p class="p-tag-bold">#1</p>
          </div>
          <TextField
            style={{ backgroundColor: 'white', height: '3rem', margin: '0 0 1.5rem 0', width: '75%' }}
            filled
            fluid
            placeholder="ACME Corp alias or AID"
            // oninput={(e) => {
            //   this.passcode = e.target.value;
            // }}
            iconTrailing={{
              icon: 'search',
            }}
          />
          <div>
            <p class="p-tag-bold">1/4</p>
          </div>
        </div>
        {/* LONG TEXT BOXES TO MAP ^^ END */}

        <div class="flex flex-justify-end" style={{ margin: '4rem 0 0 0' }}>
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
        <img src={uploadFile} style={{ width: '50%' }} />
        <h3>Multi-Signature Verification in Progress</h3>
        <br></br>
        <p class="p-tag">
          You will be notified when the QDACs verify that the Root AID witnesses their signature on the Root AID
          Inception Event.
        </p>
        <div class="flex flex-justify-end" style={{ margin: '4rem 0 0 0' }}>
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
        <h3>Event Log</h3>
        <TextField
          style={{ backgroundColor: 'var(--black-4)', height: '3rem', margin: '0 0 1.5rem 0' }}
          filled
          fluid
          placeholder="ACME Corp alias or AID"
          oninput={(e) => {
            this.passcode = e.target.value;
          }}
          iconTrailing={{
            icon: 'search',
          }}
        />
      </>,
    ];
  }

  view() {
    return <>{this.steps[this.step]}</>;
  }
}

module.exports = ViewMultiSigSet;
