import m from 'mithril';
import { Button, TextField, TextTooltip, Checkbox } from '../../../src/app/components';
import { KERI } from '../../../src/app/services';

import secureMessaging from '../../../src/assets/img/secure-messaging.png';
import uploadFile from '../../../src/assets/img/upload-file.png';

class ConfigureMultiSigSet {
  constructor() {
    this.currentState = 'configure-multi-sig-index';
    this.fractionallyWeighted = false;
    this.tempConfigureArray = [
      {
        id: 'E1nskcqqz2jp4vwCD5TnD3CfWtBO6XjRLX4iQ8ic8nu4',
        alias: 'rootgar1',
        weight: '1/3',
      },
      {
        id: 'EF_h1XlGK4eng4sJ2y0e-liz-3DEOzWhPxMLhZbxHTdU',
        alias: 'extgar1',
        weight: '1/3',
      },
      {
        id: 'EU8SZDwgcAy5DEvcu6ACuSviaZaVjJYxS6oXPmv0zB8o',
        alias: 'intgar1',
        weight: '1/3',
      },
    ];
  }

  logMultisig() {
    let aids = this.tempConfigureArray.map((obj) => {
      return obj.id;
    });
    let sith = this.tempConfigureArray
      .map((obj) => {
        return obj.weight;
      })
      .join(',');
    let inceptData = {
      aids: aids,
      isith: sith,
      nsith: sith,
      toad: 3,
      wits: [
        'BGKVzj4ve0VSd8z_AmvhLg4lqcC_9WYX90k03q-R_Ydo',
        'BuyRFMideczFZoapylLIyCjSdhtqVb31wZkRKvPfNqkw',
        'Bgoq68HCmYNUDgOz4Skvlu306o_NY-NrYuKAVhk3Zh9c',
      ],
    };
    KERI.initiateGroupInception('newgroup', inceptData)
      .then((incept) => {
        console.log(incept);
      })
      .catch((err) => {
        console.log('initiateGroupInception', err);
      });
  }

  view(vnode) {
    return (
      <>
        {this.currentState === 'configure-multi-sig-index' && (
          <>
            <img src={secureMessaging} style={{ width: '268px', margin: '4rem 0 1rem 0' }} />
            <h3>Configure Multi-Sig Set</h3>
            <p class="p-tag">
              If you are seeing this, it is because you have verified contacts and can now configure the multi-sig set.
              You will now be tasked with creating the multi-sig set. Once this is completed, make sure that all members
              of the multi-sig group are available for an OOBI exchange.
            </p>
            <div class="flex flex-justify-end">
              <Button
                class="button--big button--no-transform"
                raised
                label="Continue"
                onclick={() => {
                  this.currentState = 'configure-multisig-group';
                }}
              />
            </div>
          </>
        )}
        {this.currentState === 'configure-multisig-group' && (
          <>
            <h3>Configure Multi-Sig Group</h3>
            <div style={{ height: '608px', overflowY: 'auto' }}>
              <p>Are your signatures fractionally weighted?</p>
              <p>ex. Each signer equals 1/3 of the group.</p>
              <input
                type="radio"
                id="weighted-yes"
                name="weighted"
                checked={this.fractionallyWeighted}
                onclick={() => {
                  this.fractionallyWeighted = true;
                }}
              />
              <label for="weighted-yes">Yes</label>
              <input
                type="radio"
                id="weighted-no"
                name="weighted"
                checked={!this.fractionallyWeighted}
                onclick={() => {
                  this.fractionallyWeighted = false;
                }}
              />
              <label for="weighted-no">No</label>
              <br />
              {!this.fractionallyWeighted && (
                <>
                  <label>How many signers are required to sign?</label>
                  <TextField outlined type="number" />
                </>
              )}
              <div class="flex" style={{ alignItems: 'center', margin: '2rem 0 2rem 0' }}>
                <Checkbox />
                <label>Create Credential Registry</label>
              </div>
              <label>
                Enter Signers{' '}
                <TextTooltip label={<u>(in order)</u>}>
                  Order must be consistent (same exact list everytime). If fractionally weighted it should be highest to
                  lowest weight.{' '}
                </TextTooltip>
                :
              </label>
              <br />
              {this.tempConfigureArray.map((signer) => {
                return (
                  <>
                    <TextField
                      outlined
                      style={{ marginRight: '2rem' }}
                      value={signer.alias}
                      oninput={(e) => {
                        signer.alias = e.target.value;
                      }}
                    />
                    {this.fractionallyWeighted && (
                      <TextField
                        outlined
                        style={{ width: '80px' }}
                        value={signer.weight}
                        oninput={(e) => {
                          signer.weight = e.target.value;
                        }}
                      />
                    )}
                  </>
                );
              })}
              <TextField outlined style={{ marginRight: '2rem' }} placeholder="+ Add New" />
              {this.fractionallyWeighted && <TextField outlined style={{ width: '80px' }} placeholder="1/3" value="" />}
            </div>
            <div class="flex flex-justify-between" style={{ marginTop: '2rem' }}>
              <Button
                class="button--gray-dk button--big button--no-transform"
                raised
                label="Go Back"
                onclick={() => {
                  this.currentState = 'configure-multi-sig-index';
                }}
              />
              <Button
                class="button--big button--no-transform"
                raised
                label="Continue"
                onclick={() => {
                  this.currentState = 'review-and-confirm';
                }}
              />
            </div>
          </>
        )}
        {this.currentState === 'review-and-confirm' && (
          <>
            <h3>Review and Confirm</h3>
            <p>Review signers to make sure the list is complete.</p>
            <h4>Signers (in order):</h4>
            {this.tempConfigureArray.map((signer) => {
              return (
                <>
                  <TextField outlined style={{ marginRight: '2rem' }} value={signer.alias} />
                  {this.fractionallyWeighted && <TextField outlined style={{ width: '80px' }} value={signer.weight} />}
                </>
              );
            })}
            <div class="flex flex-justify-between">
              <Button
                class="button--gray-dk button--big button--no-transform"
                raised
                label="Go Back"
                onclick={() => {
                  this.currentState = 'configure-multisig-group';
                }}
              />
              <Button
                class="button--big button--no-transform"
                raised
                label="Continue"
                onclick={() => {
                  this.logMultisig();
                  this.currentState = 'setup-complete';
                }}
              />
            </div>
          </>
        )}
        {this.currentState === 'setup-complete' && (
          <>
            <img src={secureMessaging} style={{ width: '268px', margin: '4rem 0 2rem 0' }} />
            <h3>Multi-Sig Setup is Completed!</h3>
            <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
              Your multi-sig setup is now completed. You may now proceed to to configure the multi-sig set. Make sure
              that all members of the multi-sig group are available for an OOBI exchange.
            </p>
            <div class="flex flex-justify-end">
              <Button class="button--big button--no-transform" raised label="Continue" onclick={vnode.attrs.end} />
            </div>
          </>
        )}
      </>
    );
  }
}

module.exports = ConfigureMultiSigSet;
