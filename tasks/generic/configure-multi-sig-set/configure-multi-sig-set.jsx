import m from 'mithril';
import { Button, Card, TextField, Checkbox } from '../../../src/app/components';

import uploadFile from '../../../src/assets/img/upload-file.png';

import responseMessage from '../../../src/assets/img/response-message.png';
import secureMessaging from '../../../src/assets/img/secure-messaging.png';

class ConfigureSigGleif {
  constructor(vnode) {}
  view(vnode) {
    return (
      <>
        <img src={secureMessaging} style={{ width: '50%', margin: '4rem 0 1rem 0' }} />
        <h3>Configure Multi-Sig Set as GLEIF Genesis Controller</h3>
        <br />

        <p class="p-tag">
          If you are seeing this, it is because you have a sufficient number and correct combination of verified
          contacts to configure the multi-sig set. Make sure that all members of the multi-sig group are available for
          an OOBI exchange.
        </p>
        <br />
        <br />

        <div class="flex flex-justify-end">
          <Button class="button--big button--no-transform" raised label="Continue" onclick={vnode.attrs.continue} />
        </div>
      </>
    );
  }
}

class SelectMultiSigMembers {
  tempConfigureArray = [
    {
      number: 1,
      name: 'Jane Smith',
      date: '1/3',
    },
    {
      number: 2,
      name: 'Michael Williams',
      date: '1/3',
    },
    {
      number: 3,
      name: 'ZG4jvw9bTmVd5X92iKYmfT',
      date: '1/3',
    },
    {
      number: 4,
      name: 'OG8jvw9bTmUd5J92iKYmfU',
      date: '1/3',
    },
    {
      number: 5,
      name: 'Joe Roberts',
      date: '1/7',
    },
    {
      number: 6,
      name: 'OG8jvw9bTmUd5J92iKYmfU',
      date: '1/7',
    },
  ];
  constructor(vnode) {}
  view(vnode) {
    return (
      <>
        <h3>Select Multi-Sig Group Members</h3>
        <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
          Please select the multi-sig group members. Event will not validate unless the minimum signing threshold is
          met. When weighted, the threshold is a sum of 1.
        </p>
        <div class="flex" style={{ margin: '2rem 0 2rem 0' }}>
          <Checkbox />
          <label class="flex" style={{ alignItems: 'center', color: '#737b7d' }}>
            {/* <span class="checkmark"></span>
            <input type="checkbox" checked="checked" />
            Create Credential Registry */}
            Create Credential Registry
          </label>
        </div>
        <div style={{ height: '350px', overflowY: 'scroll', margin: '0 0 1rem 0' }}>
          {this.tempConfigureArray.map((sig) => {
            return (
              <div
                class="flex flex-justify-evenly "
                style={{ alignItems: 'center', margin: '0 0 1.5rem 0', width: '100%' }}
              >
                <h4 class="p-tag" style={{ margin: '0 0 0 0' }}>
                  {`#${sig.number}`}
                </h4>
                <TextField
                  class="flex flex-align-center"
                  style={{ width: '68%', backgroundColor: 'white', height: '40px', borderRadius: '3px' }}
                  iconTrailing={{ icon: 'search' }}
                  placeholder={sig.name}
                >
                  {/* <p
                    class="font-color--battleship"
                    style={{
                      letterSpacing: '.15px',
                      lineHeight: '1.38',
                      margin: '0 0 0 .5rem',
                    }}
                  >
                    {sig.name}
                  </p> */}
                </TextField>
                <h4 class="p-tag" style={{ margin: '0 0 0 0' }}>
                  {sig.date}
                </h4>
              </div>
            );
          })}
        </div>
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

class MultiSigVerProg {
  constructor(vnode) {}
  view(vnode) {
    return (
      <>
        <img src={uploadFile} style={{ width: '50%', margin: '4rem 0 0 0' }} />
        <h3>Multi-Signature Verification in Progress</h3>
        <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
          You will be notified when the representatives provide their signature on the Inception Event.
        </p>
        <div class="flex flex-justify-end">
          <Button class="button--big button--no-transform" raised label="View Progress" onclick={vnode.attrs.end} />
        </div>
      </>
    );
  }
}

class ConfigureMultiSigSet {
  constructor() {
    this.currentState = 'configure-multi-start';
  }

  view(vnode) {
    return (
      <>
        {this.currentState === 'configure-multi-start' && (
          <ConfigureSigGleif
            continue={() => {
              this.currentState = 'select-multi-members';
            }}
          />
        )}
        {this.currentState === 'select-multi-members' && (
          <SelectMultiSigMembers
            back={() => {
              this.currentState = 'configure-multi-start';
            }}
            continue={() => {
              this.currentState = 'multi-sig-ver';
            }}
          />
        )}
        {this.currentState === 'multi-sig-ver' && <MultiSigVerProg end={vnode.attrs.end} />}
      </>
    );
  }
}

module.exports = ConfigureMultiSigSet;
