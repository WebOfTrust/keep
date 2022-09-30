import m from 'mithril';
import {
  Button,
  Card,
  Counter,
  Select,
  TextField,
  Checkbox,
  Radio,
  AID,
  IconButton,
} from '../../../src/app/components';
import { KERI, Profile, Witnesses } from '../../../src/app/services';
import createIdentifier from '../../../src/assets/img/create-identifier.svg';
import configureIdentifier from '../../../src/assets/img/configure-identifier.svg';
import ProfilePicture from '../../../src/app/components/profile/picture';

class CreateYourAIDTask {
  constructor(config) {
    this.config = config;
    this.reset();
  }

  reset() {
    this._id = this.config.id;
    this._label = this.config.label;
    this.establishable = 'establishable' in this.config ? this.config.establishable : true;
    this.delegatable = 'delegatable' in this.config ? this.config.delegatable : true;
    this.DnD = 'DnD' in this.config ? this.config.DnD : false;
    this.estOnly = 'estOnly' in this.config ? this.config.estOnly : false;
    this._component = {
      view: (vnode) => {
        return <CreateYourAID end={vnode.attrs.end} parent={this} variables={this.config.variables} />;
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
    this.useAsDefault = Profile.identifiers === undefined || Profile.identifiers.length === 0;
    this.showAdvancedOptions = false;
    this.estOnly = vnode.attrs.parent.estOnly;
    this.DnD = vnode.attrs.parent.DnD;
    this.pool = '';
    this.wits = [];
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
          });
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
            <h3>
              {vnode.attrs.variables.createYourAlias.title
                ? vnode.attrs.variables.createYourAlias.title
                : 'Create Your Alias and Configure Your AID'}
            </h3>
            <img class="task-img task-img--center" src={configureIdentifier} />
            <p class="font-color--battleship">
              {vnode.attrs.variables.createYourAlias
                ? vnode.attrs.variables.createYourAlias.paragraph
                : 'The alias should be an easy to remember name for your AID.'}
            </p>
            <div class="task-form-group">
              <label for="alias" class="task-form-label">
                What would you like your alias to be?
              </label>
              <TextField
                id="alias"
                outlined
                fluid
                oninput={(e) => {
                  this.alias = e.target.value;
                }}
                value={this.alias}
              />
            </div>
            <div class="task-form-group">
              <label for="witness-pool" class="task-form-label">
                Select Your Witness Pool:
              </label>
              <Select
                id="witness-pool"
                outlined
                fluid
                value={this.pool}
                options={Witnesses.witnessPools}
                onchange={(pool) => {
                  this.pool = pool;
                  this.wits = Witnesses.witnesses[this.pool];
                  this.witThold = KERI.recommendedThold(this.wits.length);
                }}
              />
            </div>

            {this.wits.length > 0 && (
              <p class="p-tag-italic" style={{ margin: '0.5rem 0 0 1.5rem' }}>
                {this.wits.length} Witnesses in Pool
              </p>
            )}

            <div
              class="task-form-checkbox-container"
              onclick={() => {
                if (!(Profile.identifiers === undefined || Profile.identifiers.length === 0)) {
                  this.useAsDefault = !this.useAsDefault;
                }
              }}
            >
              <Checkbox
                id="use-as-default"
                outlined
                fluid
                disabled={Profile.identifiers === undefined || Profile.identifiers.length === 0}
                checked={this.useAsDefault}
              />
              <label for="use-as-default" class="task-form-label">
                Set new AID as Keep Default?
              </label>
            </div>
            <div
              class="task-form-more"
              onclick={() => {
                this.showAdvancedOptions = !this.showAdvancedOptions;
              }}
            >
              <label class="task-form-more-label">Advanced Options:</label>
              <IconButton icon={this.showAdvancedOptions ? 'expand_less' : 'expand_more'} />
            </div>
            {this.showAdvancedOptions && (
              <>
                <div class="task-form-group task-form-group--between">
                  <label class="task-form-label">Witness Threshold:</label>
                  <Counter
                    value={this.witThold}
                    disabled={!this.pool}
                    min={KERI.recommendedThold(this.wits.length)}
                    max={this.wits.length}
                    onchange={(value) => {
                      this.witThold = value;
                    }}
                  />
                </div>
                <div class="task-form-group task-form-group--between">
                  <label class="task-form-label">Establishment Only:</label>
                  <div class="task-form-radio-group">
                    <Radio
                      id="estonly-yes"
                      name="estonly"
                      disabled={!vnode.attrs.parent.establishable}
                      checked={this.estOnly}
                      onclick={() => {
                        this.estOnly = true;
                      }}
                    />
                    <label class="task-form-label" for="estonly-yes">
                      Yes
                    </label>
                    <Radio
                      id="estonly-no"
                      name="estonly"
                      disabled={!vnode.attrs.parent.establishable}
                      checked={!this.estOnly}
                      onclick={() => {
                        this.estOnly = false;
                      }}
                    />
                    <label class="task-form-label" for="estonly-no">
                      No
                    </label>
                  </div>
                </div>
                <div class="task-form-group task-form-group--between">
                  <label class="task-form-label">Allow this identifier to delegate?</label>
                  <div class="task-form-radio-group">
                    <Radio
                      id="dnd-yes"
                      name="dnd"
                      disabled={!vnode.attrs.parent.delegatable}
                      checked={!this.DnD}
                      onclick={() => {
                        this.DnD = false;
                      }}
                    />
                    <label class="task-form-label" for="dnd-yes">
                      Yes
                    </label>
                    <Radio
                      id="dnd-no"
                      name="dnd"
                      disabled={!vnode.attrs.parent.delegatable}
                      checked={this.DnD}
                      onclick={() => {
                        this.DnD = true;
                      }}
                    />
                    <label class="task-form-label" for="dnd-no">
                      No
                    </label>
                  </div>
                </div>
                <div class="task-form-checkbox-container">
                  <Checkbox id="issue-credentials" checked={true} disabled={true} />
                  <label for="issue-credentials" class="task-form-label">
                    Allow this Identifier to issue credentials
                  </label>
                </div>
              </>
            )}
            <div class="task-actions">
              <Button
                id="continue"
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
            <img class="task-img task-img--center" src={configureIdentifier} />
            <p class="font-color--battleship">Review and confirm your selections below:</p>
            <div class="flex flex-justify-start flex-align-center margin-v-2">
              <ProfilePicture identifier={{ name: this.alias }} />
              <p id="review-alias" class="font-weight--medium margin-left-1">
                {this.alias}
              </p>
            </div>
            <div class="task-form-group task-form-group--between">
              <label class="task-form-label">Witness Pool:</label>
              <p>{Witnesses.poolName(this.pool)}</p>
            </div>
            <div class="task-form-group task-form-group--between">
              <label class="task-form-label">Witness Threshold:</label>
              <p>{this.witThold}</p>
            </div>
            <div class="task-form-group task-form-group--between">
              <label class="task-form-label">Establishment Only:</label>
              <p>{this.estOnly ? 'Yes' : 'No'}</p>
            </div>
            <div class="task-form-group task-form-group--between">
              <label class="task-form-label">Allow Delegation:</label>
              <p>{this.DnD ? 'No' : 'Yes'}</p>
            </div>
            <div class="task-actions">
              <Button
                id="skip"
                class="button--secondary margin-right-1"
                raised
                label="Edit"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'create-your-alias';
                }}
              />
              <Button
                id="create-aid"
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
            <img class="task-img task-img--center" src={configureIdentifier} />
            <Card padding="1.5rem">
              <div class="flex flex-align-center">
                <ProfilePicture identifier={{ name: this.alias }} />
                <AID style={{ marginLeft: '1rem' }} aid={this.aid} />
              </div>
            </Card>
            <div class="task-actions">
              <Button
                id="create-aid"
                raised
                label="Close"
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
