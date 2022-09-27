import m from 'mithril';
import { Button, Select, TextField, AID } from '../../../src/app/components';
import createIdentifier from '../../../src/assets/img/create-identifier.svg';
import { KERI, Profile, Witnesses } from '../../../src/app/services';
import configureIdentifier from '../../../src/assets/img/configure-identifier.svg';
import ProfilePicture from '../../../src/app/components/profile/picture';

class ManualKeyRotationTask {
  constructor(config) {
    this.config = config;
    this.reset();
  }

  reset() {
    this._label = this.config.label;
    this._component = {
      view: (vnode) => {
        return <ManualKeyRotation end={vnode.attrs.end} parent={this} />;
      },
    };
    this.currentState = 'manual-key-rotation';
  }

  get imgSrc() {
    return createIdentifier;
  }

  get label() {
    return this._label;
  }

  get component() {
    return this._component;
  }
}

class ManualKeyRotation {
  constructor() {
    this.canChangeToad = false;
    this.mustChangeToad = false;

    this.currentAID = Profile.getDefaultAID();
    this.wits = this.currentAID.witnesses;
    this.witThold = this.currentAID.toad;
    this.pool = '';
    for (const poolName in Witnesses.witnesses) {
      if (KERI.arrayEquals(Witnesses.witnesses[poolName], this.wits)) {
        this.pool = poolName;
        break;
      }
    }
  }

  rotateAID(vnode) {
    KERI.rotateIdentifier(this.currentAID.name, this.wits, this.witThold).then((aid) => {
      Profile.loadIdentifiers().then((ids) => {
        vnode.attrs.parent.currentState = 'created';
      });
    });
  }

  view(vnode) {
    return (
      <>
        {vnode.attrs.parent.currentState === 'manual-key-rotation' && (
          <>
            <img src={createIdentifier} style={{ width: '50%', margin: '0 0 2rem 0' }} />
            <h3 style={{ margin: '0 0 2rem 0 ' }}>Perform Manual Key Rotation</h3>
            <p className="p-tag" style={{ margin: '0 0 2rem 0' }}>
              Perform a key rotation on your identifier regularly for good measure or in an emergency if your signing
              keys have been compromised.
            </p>
            <p className="p-tag">Identifier to Rotate:</p>
            <div className="flex flex-justify-start flex-align-center" style={{ marginTop: '2rem' }}>
              <ProfilePicture identifier={{ name: this.currentAID.name }} />
              <div style={{ margin: '0 0 0 1rem' }}>
                <p className="p-tag-bold" style={{ margin: '0 0 0.5rem 0' }}>
                  Alias:
                </p>
                <AID aid={this.currentAID} />
              </div>
            </div>
            <div style={{ marginTop: '3rem' }}>
              <p className="p-tag-bold">Would you like to change the witness pool?</p>
              <Select
                outlined
                fluid
                value={this.pool}
                style={{ margin: '0 0 1.5rem 0' }}
                options={Witnesses.witnessPools}
                onchange={(pool) => {
                  this.pool = pool;
                  this.wits = Witnesses.witnesses[this.pool];
                  this.canChangeToad = true;
                  if (
                    this.currentAID.toad > this.wits.length ||
                    this.currentAID.toad < KERI.recommendedThold(this.wits.length)
                  ) {
                    this.witThold = KERI.recommendedThold(this.wits.length);
                    this.mustChangeToad = true;
                  }
                }}
              />
              {this.wits.length > 0 && (
                <p className="p-tag-italic" style={{ margin: '-0.5rem 0 0.25rem 1.5rem' }}>
                  {this.wits.length} Witnesses in Pool
                </p>
              )}

              {this.canChangeToad && (
                <div style={{ marginTop: '1.5rem' }}>
                  <div className="flex flex-justify-between" style={{ margin: '0' }}>
                    <p class="p-tag">
                      {this.mustChangeToad ? 'You must' : 'Would you like to'} change your witness threshold:
                    </p>
                    <TextField
                      outlined
                      type="number"
                      min={KERI.recommendedThold(this.wits.length)}
                      max={this.wits.length}
                      style={{ marginBottom: '2rem', width: '5rem' }}
                      value={this.witThold}
                      oninput={(e) => {
                        this.witThold = parseInt(e.target.value);
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
            <div class="flex flex-justify-end" style={{ marginTop: '2.75rem' }}>
              <Button
                id="continue"
                raised
                label="Continue"
                disabled={this.wits.length === 0}
                onclick={() => {
                  vnode.attrs.parent.currentState = 'review-and-confirm';
                }}
              />
            </div>
          </>
        )}

        {vnode.attrs.parent.currentState === 'review-and-confirm' && (
          <>
            <h3>Review and Confirm Rotation Parameters</h3>
            <img src={configureIdentifier} style={{ display: 'block', margin: '4rem auto 0', width: '172px' }} />
            <p className="p-tag-bold">Review and confirm your selections below:</p>
            <div className="flex flex-justify-start flex-align-center" style={{ marginTop: '2rem' }}>
              <ProfilePicture identifier={{ name: this.currentAID.name }} />
              <div style={{ margin: '0 0 0 1rem' }}>
                <p className="p-tag-bold" style={{ margin: '0 0 0.5rem 0' }}>
                  Alias:
                </p>
                <AID aid={this.currentAID} />
              </div>
            </div>
            <div className="flex flex-justify-between" style={{ margin: '2rem 0 0 0' }}>
              <p className="p-tag-bold">Witness Pool:</p>
              <p className="p-tag">{Witnesses.poolName(this.pool)}</p>
            </div>
            <div className="flex flex-justify-between" style={{ margin: '0' }}>
              <p className="p-tag-bold">Witness Threshold:</p>
              <p className="p-tag">{this.witThold}</p>
            </div>
            <div className="flex flex-justify-between" style={{ marginTop: '3rem' }}>
              <Button
                id="skip"
                class="button--gray-dk"
                raised
                label="Go Back"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'manual-key-rotation';
                }}
              />
              <Button
                id="create-aid"
                raised
                label="Continue"
                onclick={(e) => {
                  this.rotateAID(vnode);
                }}
              />
            </div>
          </>
        )}

        {vnode.attrs.parent.currentState === 'created' && (
          <>
            <h3>Your AID has been Rotated!</h3>
            <img src={configureIdentifier} style={{ display: 'block', margin: '4rem auto 0', width: '172px' }} />

            <div
              className="flex flex-justify-start flex-align-center"
              style={{ margin: '5rem 0 7rem', boxShadow: '0 3px 9px 0 rgba(0, 0, 0, 0.5)', padding: '3rem' }}
            >
              <ProfilePicture identifier={{ name: this.currentAID.name }} />
              <div style={{ margin: '0 0 0 1rem' }}>
                <p className="p-tag-bold" style={{ margin: '0 0 0.5rem 0' }}>
                  Alias:
                </p>
                <AID aid={this.currentAID} />
              </div>
            </div>
            <div className="flex flex-justify-end" style={{ marginTop: '3rem' }}>
              <Button
                id="create-aid"
                raised
                label="Finished"
                onclick={(e) => {
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

module.exports = ManualKeyRotationTask;
