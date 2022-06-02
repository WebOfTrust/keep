import m from 'mithril';
import {Participants, Profile, WellKnown, Tasks} from '../../src/app/services';
import {EnterChallengesForm, SendOOBIForm} from '../generic/video-call/forms';
import { Button } from '../../src/app/components';

import addNewContacts from '../../src/assets/img/add-new-contacts.svg';

class LeadExtLeadRootOOBI {
    constructor(config) {
        this._label = config.label;
        // this.next = config.next;
        this.participants = new Participants();
        console.log(this.participants);

        this.currentState = 'video-call';

        this.sendOOBIPanel = {
            view: (vnode) => {
                return <LeadExtLeadRootOOBISend
                    identifiers={Profile.identifiers}
                    parent={this}
                    end={vnode.attrs.end}
                />;
            },
        };

        this._component = {
            view: (vnode) => {
                return <LeadExtLeadRootOOBIRightPanel
                    identifiers={Profile.identifiers}
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
            case "finished":
                return undefined
        }
        return this.sendOOBIPanel
    }
}

class LeadExtLeadRootOOBISend {
    view(vnode) {
        return (
            <>
                <img src={addNewContacts} style={{width: '200px', margin: '0 0 1rem 0'}} alt=""/>
                <h3>Send OOBI for your {vnode.attrs.identifiers[0].name} AID</h3>
                <p class="p-tag" style={{margin: '2rem 0 2rem 0'}}>
                    Join a call with the Lead Root GAR.

                    Copy this OOBI URL for your default AID and paste it into the Video Call.
                </p>
                <SendOOBIForm identifiers={vnode.attrs.identifiers}/>
            </>
        );
    }
}

class LeadExtLeadRootOOBIRightPanel {
    view(vnode) {
        return (
            <>
                <EnterChallengesForm identifiers={Profile.identifiers} participants={vnode.attrs.parent.participants}/>
                    <div class="flex flex-justify-between">
                    <Button
                        class="button--gray-dk button--big button--no-transform"
                        raised
                        label="Go Back"
                        onclick={() => {
                            console.log("back to task list?")
                        }}
                    />
                    <Button
                        class="button--big button--no-transform"
                        raised
                        label="Finish"
                        onclick={() => {
                            if (vnode.attrs.parent.next !== undefined) {
                                Tasks.active = vnode.attrs.parent.next;
                            } else {
                                vnode.attrs.parent.currentState = 'finished';
                            }
                        }}
                    />
                </div>
            </>
        );
    }
}

module.exports = LeadExtLeadRootOOBI;
