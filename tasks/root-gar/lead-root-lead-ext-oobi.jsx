import m from 'mithril';
import {Participants, Profile} from '../../src/app/services';
import {EnterOOBIsForm, SendChallengeForm} from '../generic/video-call/forms';

import addNewContacts from '../../src/assets/img/add-new-contacts.svg';

class LeadRootLeadExtOOBI {
    constructor(config) {
        this._label = config.label;
        this.participants = new Participants();
        this.currentState = 'video-call';

        this.sendOOBIPanel = {
            view: (vnode) => {
                return <LeadRootLeadExtOOBISend
                    parent={this}
                    end={vnode.attrs.end}
                />;
            },
        };

        this._component = {
            view: (vnode) => {
                return <LeadRootLeadExtOOBIRightPanel
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

class LeadRootLeadExtOOBISend {
    view(vnode) {
        return (
            <>
                <h3>Accept OOBI from External GAR</h3>
                <EnterOOBIsForm
                    participants={vnode.attrs.parent.participants}
                    oneToOne={true}
                />
            </>
        );
    }
}

class LeadRootLeadExtOOBIRightPanel {
    view(vnode) {
        return (
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
                            Important! Don't use a challenge message from another session, it should be unique to this
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
            </>
        );
    }
}

module.exports = LeadRootLeadExtOOBI;
