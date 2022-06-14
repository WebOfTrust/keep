import m from 'mithril';
import { Button } from '../../src/app/components';
import {Participants, KERI, Profile} from '../../src/app/services';
import {EnterOOBIsForm, SendChallengeForm} from '../generic/video-call/forms';

import addNewContacts from '../../src/assets/img/add-new-contacts.svg';
import todoList from "../../src/assets/img/to-do-list.svg";

class LeadRootLeadOobi {
    constructor(config) {
        this._label = config.label;
        this.participants = new Participants();
        this.currentState = 'one-way-oobi-challenge';
        this.variables = config.variables;

        this.sendOOBIPanel = {
            view: (vnode) => {
                return <LeadRootLeadOOBISend
                    parent={this}
                    end={vnode.attrs.end}
                />;
            },
        };

        this._component = {
            view: (vnode) => {
                return <LeadRootLeadOOBIRightPanel
                    parent={this}
                    end={vnode.attrs.end}
                />;
            },
        };
    }

    get imgSrc() {
        return addNewContacts;
    }

    get label() {
        return this._label;
    }

    get component() {
        return this._component;
    }

    get lcomponent() {
        switch (this.currentState) {
            case "one-way-oobi-challenge":
                return this.sendOOBIPanel
        }
        return undefined;
    }

    sendOobis() {
        KERI.sendOOBIs(Profile.getDefaultMultiAID().name, this.participants.oobis);
        this.currentState = 'event-complete';
    }
}

class LeadRootLeadOOBISend {
    view(vnode) {
        return (
            <>
                <h3>Accept OOBI from {vnode.attrs.parent.variables.type} GARs</h3>
                <EnterOOBIsForm
                    participants={vnode.attrs.parent.participants}
                />
            </>
        );
    }
}

class LeadRootLeadOOBIRightPanel {
    view(vnode) {
        return (
            <>
                {vnode.attrs.parent.currentState === 'one-way-oobi-challenge' && (
                    <>
                        <div className="flex flex-align-center flex-justify-between">
                            <img src={addNewContacts} style={{width: '120px', margin: '1.5rem 0 1rem 0'}}/>
                            <h3>Challenge Message Recipient</h3>
                        </div>
                        <p class="p-tag" style={{margin: '2rem 0 2rem 0'}}>
                            Paste the message into the video chat so that your contact can be
                            verified
                            <br/>
                            <br/>
                            <strong>
                                Important! Don't use a challenge message from another session, it should be unique to
                                this
                                session taking
                                place today.
                            </strong>
                        </p>
                        <SendChallengeForm participants={vnode.attrs.parent.participants}/>
                        <div className="flex flex-align-center flex-justify-between">
                            <p class="font-color--battleship">Participant</p>
                            <p class="font-color--battleship">Status</p>
                        </div>
                        {vnode.attrs.parent.participants.oobis.map((signer, index) => {
                            return (
                                <>
                                    <div className="flex flex-align-center flex-justify-between">
                                        <p>{signer.alias}</p>
                                        {!signer.verified && <p class="font-color--blue">In Progress</p>}
                                        {signer.verified && <p class="font-color--green">Verified!</p>}
                                    </div>
                                </>
                            );
                        })}
                        <div className="flex flex-justify-end" style={{marginTop: '4rem'}}>
                            <Button
                                class="button--big button--no-transform"
                                raised
                                label="Finished"
                                disabled={
                                    !(vnode.attrs.parent.participants.oobisVerified() && vnode.attrs.parent.participants.oobisResolved())
                                }
                                onclick={() => {
                                    vnode.attrs.parent.sendOobis();
                                }}
                            />
                        </div>
                    </>
                )}
                {vnode.attrs.parent.currentState === 'event-complete' && (
                    <>
                        <img src={todoList} style={{width: '188px', margin: '4rem 0 0 0'}}/>
                        <h3>Authentication Stage Completed</h3>
                        <p class="p-tag">
                            Thank you for authenticating all members. You will receive a notification when
                            the {vnode.attrs.parent.variables.type} GARs have created their Multi-Sig AID and are requesting delegation.
                        </p>
                        <div class="flex flex-justify-end" style={{marginTop: '4rem'}}>
                            <Button class="button--big button--no-transform" raised label="Close"
                                    onclick={vnode.attrs.end}/>
                        </div>
                    </>
                )}
            </>
        );
    }
}

module.exports = LeadRootLeadOobi;
