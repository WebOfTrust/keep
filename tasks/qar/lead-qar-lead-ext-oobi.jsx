import m from 'mithril';
import {Profile, Tasks} from '../../src/app/services';
import {EnterChallengesForm, SendOOBIForm} from '../generic/video-call/forms';
import {Button} from '../../src/app/components';

import addNewContacts from '../../src/assets/img/add-new-contacts.svg';
import KERI from "../../src/app/services/keri";

class LeadQARLeadExtOOBI {
    constructor(config) {
        this._label = config.label;
        this.wellknown = undefined;
        this.extIdentifier = [];
        this.currentState = 'loading';

        this.currentState = 'video-call';
        KERI.getContacts().then((contacts) => {
            contacts.forEach((contact) => {
                if (contact.alias === 'GLEIF External') {
                    this.wellknown = contact;
                }
            });

            if (this.wellknown === undefined) {
            } else {

                this.extParticipant = {
                    oobis: [{
                        alias: this.wellknown.alias,
                        id: this.wellknown.id,
                        status: 'none',
                        challengeMessage: '',
                        verified: false,
                        sent: false,
                        confirmed: false,
                    },], words: []
                };
            }
        });

        this.sendOOBIPanel = {
            view: (vnode) => {
                return <LeadQARLeadExtOOBISend
                    identifiers={Profile.identifiers}
                    parent={this}
                    end={vnode.attrs.end}
                />;
            },
        };

        this._component = {
            view: (vnode) => {
                return <LeadQARLeadExtOOBIRightPanel
                    parent={this}
                    end={() => {
                        Tasks.active = null;
                    }}
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

class LeadQARLeadExtOOBISend {
    view(vnode) {
        return (<>
                <img src={addNewContacts} style={{width: '200px', margin: '0 0 1rem 0'}} alt=""/>
                <h3>Send OOBI for your {vnode.attrs.identifiers[0].name} AID</h3>
                <p class="p-tag" style={{margin: '2rem 0 2rem 0'}}>
                    Join a call with the Lead External GAR.

                    Copy this OOBI URL for your default AID and paste it into the Video Call.
                </p>
                <SendOOBIForm identifiers={vnode.attrs.identifiers}/>
            </>);
    }
}

class LeadQARLeadExtOOBIRightPanel {
    view(vnode) {
        return (
            <>
                <EnterChallengesForm identifiers={vnode.attrs.parent.extIdentifier}
                                     participants={vnode.attrs.parent.extParticipant}/>
                <div class="flex flex-justify-between">
                    <Button
                        class="button--gray-dk button--big button--no-transform"
                        raised
                        label="Go Back"
                        onclick={() => {
                            vnode.attrs.end
                        }}
                    />
                    <Button
                        class="button--big button--no-transform"
                        raised
                        label="Finish"
                        onclick={vnode.attrs.end}
                    />
                </div>
            </>
        );
    }
}

module.exports = LeadQARLeadExtOOBI;
