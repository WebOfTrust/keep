import m from 'mithril';
import approveRequest from '../../../src/assets/img/approve-request.svg';
import {AID, Button} from '../../../src/app/components';
import {Contacts, Delegation, KERI, Tasks} from '../../../src/app/services';

class JoinDelegationApprovalTask {
    constructor(config) {
        this.config = config;
        this.reset();
    }

    reset() {
        this._label = this.config.label;
        this._component = {
            view: (vnode) => {
                return <JoinDelegationApproval end={vnode.attrs.end} parent={this}/>;
            },
        };
        this.currentState = 'approve-delegation';

    }

    get imgSrc() {
        return approveRequest;
    }

    get label() {
        return this._label;
    }

    get component() {
        return this._component;
    }
}

class JoinDelegationApproval {
    constructor() {
        let task = this;
        this.aids = Delegation.aids;
        this.ked = Delegation.ked;
        this.fractionallyWeighted = Array.isArray(this.ked.kt);
        if (this.fractionallyWeighted) {
            this.weights = this.ked.kt;
        }
        this.delegator = Delegation.delegator;
        this.signers = [];
        if (Contacts.list.length === 0) {
            Contacts.requestList().then(() => {
                task.loadSigners();
            })
        } else {
            task.loadSigners();
        }
    }

    loadSigners() {
        this.aids.forEach((aid, idx) => {
            let contact = Contacts.filterById(aid);
            if (contact === undefined) {
                this.signers.push({});
            } else {
                if (this.fractionallyWeighted) {
                    let weight = this.weights[idx];
                    this.signers.push({contact:contact, weight: weight})
                } else {
                    this.signers.push({contact:contact})
                }
            }
        })
    }

    approveDelegation() {
        let data = [{
            i: this.ked['i'],
            s: this.ked['s'],
            d: this.ked['d']
        }]

        let aids = this.delegator.group.aids
        if (this.delegator.estOnly) {
            return KERI.initiateGroupRotation(this.delegator.name, {
                aids: aids,
                data: data
            })
        } else {
            return KERI.initiateGroupInteraction(this.delegator.name, {
                aids: aids,
                data: data
            })
        }
    }

    view(vnode) {
        return (
            <>
                {vnode.attrs.parent.currentState === 'approve-delegation' && (
                    <>
                        <img src={approveRequest} style={{width: '188px', margin: '0 0 2rem 0'}}/>
                        <h3>Initiate Delegation Approval</h3>
                        <p class="p-tag">View the delegation request and confirm that these individuals are
                            authenticated.</p>
                        <div class="flex flex-justify-end" style={{marginTop: '4rem'}}>
                            <Button
                                class="button--big button--no-transform"
                                raised
                                label="View"
                                onclick={() => {
                                    vnode.attrs.parent.currentState = 'review-and-confirm';
                                }}
                            />
                        </div>
                    </>
                )}
                {vnode.attrs.parent.currentState === 'review-and-confirm' && (
                    <>
                        <h3>Review and Confirm Delegation Request</h3>

                        <p>Review signers to make sure the list is complete.</p>
                        {this.ked.di && (
                            <>
                                <p className="font-weight--bold font-color--battleship">Delegator:</p>
                                <div className="flex flex-align-center flex-justify-between"
                                     style={{margin: '0 0 4rem 0'}}>
                                    <AID aid={this.delegator}/>
                                </div>
                            </>
                        )}
                        <p class="font-weight--bold font-color--battleship">Signers (in order):</p>
                        {this.signers.map((signer) => {
                            return (
                              <>
                                  <div class="flex flex-align-center flex-justify-between margin-v-1">
                                      <div class="flex-1 uneditable-value" style={{ marginRight: '1rem' }}>
                                          <AID contact={signer.contact}/>
                                      </div>
                                      {this.fractionallyWeighted && <div class="uneditable-value">{signer.weight}</div>}
                                  </div>
                              </>
                            );
                        })}
                        {(!this.fractionallyWeighted) && <>
                            <p className="font-weight--bold font-color--battleship">Signature Threshold:</p>
                            <div className="uneditable-value">{this.ked.kt}</div>
                        </>}
                        <p className="font-weight--bold font-color--battleship">Witness Count:</p>
                        <div className="uneditable-value">{this.ked.b.length}</div>
                        <p className="font-color--battleship margin-v-2">Advanced Options.</p>
                        <p className="font-weight--bold font-color--battleship">Witness Threshold:</p>
                        <div className="uneditable-value">{this.ked.bt}</div>
                        <p className="font-weight--bold font-color--battleship">Establishment Only:</p>
                        <div className="uneditable-value">{"EO" in this.ked.c ? 'Yes' : 'No'}</div>
                        <p className="font-weight--bold font-color--battleship">Allow Delegation:</p>
                        <div className="uneditable-value">{"DND" in this.ked.c ? 'No' : 'Yes'}</div>

                        <div class="flex flex-justify-between" style={{marginTop: '4rem'}}>
                            <Button
                                class="button--gray-dk button--big button--no-transform"
                                raised
                                label="Go Back"
                                onclick={() => {
                                    vnode.attrs.end;
                                }}
                            />
                            <Button
                                class="button--big button--no-transform"
                                raised
                                label="Confirm"
                                onclick={() => {
                                    this.approveDelegation().then(() => {
                                        vnode.attrs.parent.currentState = 'delegate-complete';
                                    });
                                }}
                            />
                        </div>
                    </>
                )}
                {vnode.attrs.parent.currentState === 'delegate-complete' && (
                    <>
                        <img src={approveRequest} style={{width: '188px', margin: '0 0 2rem 0'}}/>
                        <h3>Delegation complete</h3>
                        <p class="p-tag">When enough members of {this.delegatorAlias} have approved the delegation you will
                            receive a notification that the new delegated AID has been approved and created.  You can
                            also check the status of the anchoring event in the Multi-Sig Event Logs using the
                            status button below.</p>
                        <div class="flex flex-justify-between" style={{marginTop: '4rem'}}>
                            <Button
                              class="button--big button--no-transform"
                              raised
                              label="Status"
                              onclick={() => {
                                  Tasks.active = Tasks.find('view-event-logs');
                              }}
                            />
                            <Button
                                class="button--big button--no-transform"
                                raised
                                label="View"
                                onclick={() => {
                                    vnode.attrs.end;
                                }}
                            />
                        </div>
                    </>
                )}
            </>
        );
    }
}

module.exports = JoinDelegationApprovalTask;
