import m from 'mithril';
import approveRequest from '../../../src/assets/img/approve-request.svg';
import {Button} from '../../../src/app/components';
import {KERI, Profile, Notify, Contacts} from '../../../src/app/services';

class JoinDelegationApprovalTask {
    constructor(config) {
        this._label = config.label;
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
        let notif = Notify.selected;
        this.aids = notif.data.aids;
        this.ked = notif.data.ked;
        this.delegatorAID = notif.data.delpre;
        this.aid = Profile.filterIdentifiersById(this.delegatorAID);

        if (this.aid.length === 1) {
            this.delegatorAlias = this.aid[0].name
        } else {
            this.delegatorAlias = "Unknown Delegator AID"
        }
    }

    approveDelegation() {
        let data = [{
            i: this.ked['i'],
            s: this.ked['s'],
            d: this.ked['d']
        }]

        let aids = this.aid[0].group.aids
        return KERI.initiateGroupInteraction(this.delegatorAlias, {
            aids: aids,
            data: data
        } )
    }

    view(vnode) {
        return (
            <>
                {vnode.attrs.parent.currentState === 'approve-delegation' && (
                    <>
                        <img src={approveRequest} style={{width: '188px', margin: '0 0 2rem 0'}}/>
                        <h3>Initiate Delegation Approval</h3>
                        <p class="p-tag">View the delegation request and confirm that these individuals are
                            authorized.</p>
                        <div class="flex flex-justify-end" style={{marginTop: '4rem'}}>
                            <Button
                                class="button--big button--no-transform"
                                raised
                                label="View"
                                onclick={() => {
                                    vnode.attrs.parent.currentState = 'review-members';
                                }}
                            />
                        </div>
                    </>
                )}
                {vnode.attrs.parent.currentState === 'review-members' && (
                    <>
                        <h3>Review and Confirm Delegation Request</h3>
                        <p>Review signers to make sure the list is complete.</p>
                        {this.ked.di && (
                            <>
                                <h4>Delegator:</h4>
                                <div class="flex flex-align-center flex-justify-between" style={{margin: '1rem 0'}}>
                                    <div class="flex-1 uneditable-value" style={{minHeight: '48px'}}>
                                        {this.delegatorAlias}
                                    </div>
                                </div>
                                <div class="flex flex-align-center flex-justify-between" style={{margin: '1rem 0'}}>
                                    <div class="flex-1 uneditable-value" style={{minHeight: '48px'}}>
                                        {this.delegatorAID}
                                    </div>
                                </div>
                            </>
                        )}
                        <h4>Signers:</h4>
                        {this.aids.map((signer, i) => {
                            let name = '';
                            let contact = Contacts.filterById(signer);
                            if (contact !== undefined) {
                                name = contact.alias;
                            } else {
                                name = 'Unknown AID';
                            }
                            return (
                                <>
                                    <div class="flex flex-align-center flex-justify-between" style={{margin: '1rem 0'}}>
                                        <div class="flex-1 uneditable-value" style={{marginRight: '1rem'}}>
                                            {name}
                                        </div>
                                    </div>
                                    <div class="flex flex-align-center flex-justify-between" style={{margin: '1rem 0'}}>
                                        <div class="flex-1 uneditable-value" style={{marginRight: '1rem'}}>
                                            {signer}
                                        </div>
                                    </div>
                                </>
                            );
                        })}

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
                            receive a notification to create an alias for the new delegated AID.</p>
                        <div class="flex flex-justify-end" style={{marginTop: '4rem'}}>
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
