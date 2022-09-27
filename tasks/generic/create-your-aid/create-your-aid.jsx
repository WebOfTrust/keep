import m from 'mithril';
import {Button, Select, TextField, Checkbox, Radio, AID} from '../../../src/app/components';
import {KERI, Profile, Witnesses} from '../../../src/app/services';
import createIdentifier from '../../../src/assets/img/create-identifier.svg';
import configureIdentifier from '../../../src/assets/img/configure-identifier.svg';
import ProfilePicture from "../../../src/app/components/profile/picture";

class CreateYourAIDTask {
  constructor(config) {
    this.config = config;
    this.reset();
  }

  reset() {
    this._id = this.config.id;
    this._label = this.config.label;
    this.establishable = "establishable" in this.config ? this.config.establishable : true;
    this.delegatable = "delegatable" in this.config ? this.config.delegatable : true;
    this.DnD = "DnD" in this.config ? this.config.DnD : false;
    this.estOnly = "estOnly" in this.config ? this.config.estOnly : false;
    this._component = {
      view: (vnode) => {
        return <CreateYourAID end={vnode.attrs.end} parent={this} variables={this.config.variables}/>;
      },
    };
    this.currentState = 'create-your-alias';
  }

  get imgSrc() {
    return createIdentifier;
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
}

class CreateYourAID {
  constructor(vnode) {
    this.alias = '';
    this.useAsDefault = (Profile.identifiers === undefined || Profile.identifiers.length === 0);
    this.showAdvancedOptions = false;
    this.estOnly = vnode.attrs.parent.estOnly;
    this.DnD = vnode.attrs.parent.DnD;
    this.pool = '';
    this.wits = []
    this.witThold = 1;
    this.aid = undefined;
  }

  createAID(vnode) {
    Profile.createIdentifier(this.alias, this.wits, this.witThold, this.estOnly, this.DnD)
      .then((aid) => {
        this.aid = aid;
        if (this.useAsDefault) {
          Profile.setDefaultAID(aid).then(() => {
            vnode.attrs.parent.currentState = 'created';
          })
        } else {
          vnode.attrs.parent.currentState = 'created';
        }
      })
      .catch((err) => {
        console.log('listIdentfiers', err);
      });
  }

  view(vnode) {
    return (
      <>
        {vnode.attrs.parent.currentState === 'create-your-alias' && (
          <>
            <h3>Create Your Alias and Configure Your AID</h3>
            <img src={configureIdentifier} style={{display: 'block', margin: '4rem auto 0', width: '172px'}}/>
            <p class="p-tag" style={{marginTop: '2rem', marginBottom: '2rem'}}>
              {vnode.attrs.variables.createYourAlias
                ? vnode.attrs.variables.createYourAlias.paragraph
                : 'The alias should be an easy to remember name for your AID.'}
              <br/>
              <br/>
            </p>
            <p className="p-tag-bold">What would you like your alias to be?</p>
            <TextField
              id="alias"
              outlined
              fluid
              style={{margin: '0 0 0 0'}}
              oninput={(e) => {
                this.alias = e.target.value;
              }}
              value={this.alias}
            />
            <p className="p-tag-bold">Select your witness pool:</p>
            <Select
              outlined
              fluid
              value={this.pool}
              style={{margin: '0 0 1.5rem 0'}}
              options={Witnesses.witnessPools}
              onchange={(pool) => {
                this.pool = pool;
                this.wits = Witnesses.witnesses[this.pool];
                this.witThold = KERI.recommendedThold(this.wits.length)
              }}
            />
            { this.wits.length > 0 && <p className="p-tag-italic" style={{margin: '-0.5rem 0 0.25rem 1.5rem'}}>{this.wits.length} Witnesses in Pool</p> }

            <div className="flex flex-justify-start" style={{margin: '0 0 0 -0.75rem'}}>
              <Checkbox
                outlined
                fluid
                disabled={(Profile.identifiers === undefined || Profile.identifiers.length === 0)}
                checked={this.useAsDefault}
                style={{margin: '0 0 3.5rem 0'}}
                onclick={() => {
                  if (!(Profile.identifiers === undefined || Profile.identifiers.length === 0)) {
                    this.useAsDefault = !this.useAsDefault;
                  }
                }}
              />
              <p className="p-tag-bold">Set new AID as Keep Default?</p>
            </div>
            <div className="flex flex-justify-between" style={{margin: '0 0 0 0'}}>
              <p className="p-tag-bold">Advanced Options: </p>
              <span className="material-icons-outlined md-24 p-tag-bold"
                    style={{cursor: 'pointer', marginTop: '0.5rem'}}
                    onclick={() => {
                      this.showAdvancedOptions = !this.showAdvancedOptions;
                    }}>{this.showAdvancedOptions ? 'keyboard_double_arrow_up' : 'keyboard_double_arrow_down'}</span>
            </div>
            {this.showAdvancedOptions && <div style={{marginTop: '1.5rem'}}>
                <div className="flex flex-justify-between" style={{margin: '0'}}>
                  <p class="p-tag">Witness Threshold:</p>
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

                <div className="flex flex-justify-between" style={{margin: '0'}}>
                  <p class="p-tag">Establishment Only:</p>
                  <div className="flex flex-justify-end">
                    <div className="flex flex-align-center" style={{marginRight: '2rem'}}>
                      <Radio
                        id="estonly-yes"
                        name="estonly"
                        disabled={!vnode.attrs.parent.establishable}
                        checked={this.estOnly}
                        onclick={() => {
                          this.estOnly = true;
                        }}
                      />
                      <label className="font-weight--bold font-color--battleship" htmlFor="weighted-yes">
                        Yes
                      </label>
                    </div>
                    <div className="flex flex-align-center">
                      <Radio
                        id="estonly-no"
                        name="estonly"
                        disabled={!vnode.attrs.parent.establishable}
                        checked={!this.estOnly}
                        onclick={() => {
                          this.estOnly = false;
                        }}
                      />
                      <label className="font-weight--bold font-color--battleship" htmlFor="weighted-no">
                        No
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex flex-justify-between" style={{margin: '0'}}>
                  <p class="p-tag">Allow this identifier to delegate?</p>
                  <div className="flex flex-justify-end">
                    <div className="flex flex-align-center" style={{marginRight: '2rem'}}>
                      <Radio
                        id="dnd-yes"
                        name="dnd"
                        disabled={!vnode.attrs.parent.delegatable}
                        checked={!this.DnD}
                        onclick={() => {
                          this.DnD = false;
                        }}
                      />
                      <label className="font-weight--bold font-color--battleship" htmlFor="weighted-yes">
                        Yes
                      </label>
                    </div>
                    <div className="flex flex-align-center">
                      <Radio
                        id="dnd-no"
                        name="dnd"
                        disabled={!vnode.attrs.parent.delegatable}
                        checked={this.DnD}
                        onclick={() => {
                          this.DnD = true;
                        }}
                      />
                      <label className="font-weight--bold font-color--battleship" htmlFor="weighted-no">
                        No
                      </label>
                    </div>
                  </div>
                </div>
              <div className="flex margin-v-1" style={{marginLeft: '-0.75rem'}}>
                <Checkbox checked={true} disabled={true}/>
                <label className="font-weight--medium font-color--battleship" style={{marginTop: '1rem'}}>
                  Allow this Identifier to issue credentials
                </label>
              </div>
            </div>}

            <div class="flex flex-justify-end" style={{marginTop: '2.75rem'}}>
              <Button
                id="continue"
                class="button--big button--no-transform"
                raised
                label="Continue"
                disabled={this.wits.length === 0 || this.alias.length === 0}
                onclick={() => {
                  vnode.attrs.parent.currentState = 'review-and-confirm';
                }}
              />
            </div>
          </>
        )}

        {vnode.attrs.parent.currentState === 'review-and-confirm' && (
          <>
            <h3>Review and Confirm</h3>
            <img src={configureIdentifier} style={{display: 'block', margin: '4rem auto 0', width: '172px'}}/>
            <p className="p-tag-bold">Review and confirm your selections below:</p>
            <div className="flex flex-justify-start flex-align-center" style={{marginTop: '2rem'}}>
              <ProfilePicture identifier={{name: this.alias}}/>
              <div style={{margin: "0 0 0 1rem"}}>
                <p className="p-tag-bold" style={{margin: '0 0 0.5rem 0'}}>Alias:</p>
                <div id="review-alias" className="p-tag">
                  {this.alias}
                </div>
              </div>
            </div>
            <div className="flex flex-justify-between" style={{margin: '2rem 0 0 0'}}>
              <p className="p-tag-bold">Witness Pool:</p>
              <p className="p-tag">{Witnesses.poolName(this.pool)}</p>
            </div>
            <div className="flex flex-justify-between" style={{margin: '0'}}>
              <p className="p-tag-bold">Witness Threshold:</p>
              <p className="p-tag">{this.witThold}</p>
            </div>
            <div className="flex flex-justify-between" style={{margin: '0'}}>
              <p className="p-tag-bold">Establishment Only:</p>
              <p className="p-tag">{this.estOnly ? "Yes" : "No"}</p>
            </div>
            <div className="flex flex-justify-between" style={{margin: '0'}}>
              <p className="p-tag-bold">Allow Delegation:</p>
              <p className="p-tag">{this.DnD ? "No" : "Yes"}</p>
            </div>
              <div className="flex flex-justify-between" style={{marginTop: '3rem'}}>
              <Button
                id="skip"
                class="button--gray-dk button--big button--no-transform"
                raised
                label="Go Back"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'create-your-alias';
                }}
              />
              <Button
                id="create-aid"
                class="button--big button--no-transform"
                raised
                label="Continue"
                onclick={(e) => {
                  this.createAID(vnode);
                }}
              />
            </div>
          </>
        )}

        {vnode.attrs.parent.currentState === 'created' && (
          <>
            <h3>Your AID is Created!</h3>
            <img src={configureIdentifier} style={{display: 'block', margin: '4rem auto 0', width: '172px'}}/>

            <div className="flex flex-justify-start flex-align-center" style={
              {margin: '5rem 0 7rem', boxShadow: "0 3px 9px 0 rgba(0, 0, 0, 0.5)", padding: '3rem'}
            }>
              <ProfilePicture identifier={{name: this.alias}}/>
              <div style={{margin: "0 0 0 1rem"}}>
                <p className="p-tag-bold" style={{margin: '0 0 0.5rem 0'}}>Alias:</p>
                <div id="review-alias" className="p-tag">
                  <AID aid={this.aid}/>
                </div>
              </div>
            </div>
              <div className="flex flex-justify-end" style={{marginTop: '3rem'}}>
              <Button
                id="create-aid"
                class="button--big button--no-transform"
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

module.exports = CreateYourAIDTask;
