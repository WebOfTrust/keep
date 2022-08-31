import m from 'mithril';
import {Button, TextField} from '../../../src/app/components';
import {KERI, Notify, Profile, Schema} from '../../../src/app/services';
import createIdentifier from '../../../src/assets/img/create-identifier.svg';
import uploadFile from "../../../src/assets/img/upload-file.svg";

class JoinCredentialIssuanceTask {
    constructor(config) {
        this._label = config.label;
        this.currentState = "approve-issue";
        this._component = {
            view: (vnode) => {
                return <JoinCredentialIssuance end={vnode.attrs.end} parent={this}/>;
            },
        };
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

class JoinCredentialIssuance {
    constructor() {
        this.defaultAid = {}
        this.recipient = {}
        let notif = Notify.selected;

        this.ked = structuredClone(notif.data.ked);

        this.schema = this.ked['s']
        this.recipient.id = this.ked['a']['i']
        this.lei = this.ked['a']['LEI'];
        KERI.getContacts().then((contacts) => {
            this.recipient = contacts.find((contact) => {
                return contact.id === this.recipient.id;
            })
        })

        this.defaultAid = Profile.getDefaultAID("multi");
        KERI.listCredentials(this.defaultAid.name, 'received')
            .then((credentials) => {
                let qvi = credentials.find((cred) => {
                    return cred['sad']['s'] === Schema.QVICredentialSchema;
                });
                this.qvi = qvi['sad']['d'];
            })
            .catch(() => {
                this.credentialList = [];
            });

    }

    approve(vnode) {
        KERI.approveIssueCredential(this.defaultAid.name, this.ked).then(() => {
            vnode.attrs.parent.currentState = 'credential-issued';
        });
    }


    view(vnode) {
        return (
            <>
            {(vnode.attrs.parent.currentState === 'approve-issue' &&
                this.schema === Schema.LECredentialSchema) && (
                <>
                    <h3>Issue Legal Entity vLEI Credential</h3>
                    <p className="p-tag">
                        Ensure your Qualified vLEI Issuer vLEI Credential is selected to chain to the new Legal
                        Entity Credential,
                        select the proper recipient from your list of contacts and provide the LEI number for the
                        recipient.
                    </p>
                    <p className="p-tag-bold">Your Qualified vLEI Issuer vLEI Credential</p>
                    <TextField
                        outlined
                        fluid
                        style={{margin: '0 5px 0 0'}}
                        value={this.qvi}
                    />
                    <p class="p-tag-bold">Legal Entity vLEI Credential Recipient</p>
                    <TextField
                        outlined
                        fluid
                        style={{margin: '0 10px 0 0'}}
                        value={this.recipient.alias}
                    />
                    <p></p>
                    <TextField
                        outlined
                        fluid
                        style={{margin: '0 0 0 0'}}
                        value={this.recipient.id}
                    />
                    <p className="p-tag-bold">Enter the LEI:</p>
                    <TextField
                        outlined
                        fluid
                        style={{margin: '0 0 0 0'}}
                        oninput={(e) => {

                        }}
                        value={this.lei}
                    />
                    <div class="flex flex-justify-between" style={{marginTop: '4rem'}}>
                        <Button
                            raised
                            class="button--no-transform button--gray-dk button--big"
                            label="Cancel"
                            onclick={() => {
                                vnode.attrs.end();
                            }}
                        />
                        <Button
                            class="button--big button--no-transform"
                            disabled={!this.lei || !this.qvi || !this.recipient.id}
                            raised
                            label="Approve Issuance"
                            onclick={() => {
                                this.approve(vnode);
                            }}
                        />
                    </div>
                </>
                )
            }
            {vnode.attrs.parent.currentState === 'credential-issued' && (
                <>
                    <img src={uploadFile} style={{ width: '240px', margin: '1.5rem 0 2rem 0' }} />
                    <h3>Credential Issuance Approved</h3>
                    <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
                        You have approved the credential issuance from {this.defaultAid.name} to {this.recipient.alias}.  The
                        recipient will be notified when enough participant of the Multi-Sig Group have approved the credential.
                    </p>
                    <div class="flex flex-justify-end">
                        <Button class="button--big button--no-transform" raised label="Close" onclick={vnode.attrs.end} />
                    </div>
                </>
            )}
            </>
        );
    }
}

module.exports = JoinCredentialIssuanceTask;
