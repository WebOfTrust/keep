import m from 'mithril';
import {Button, TextField} from '../../src/app/components';
import {KERI, Notify, Profile, Schema, Tasks} from '../../src/app/services';
import createIdentifier from '../../src/assets/img/create-identifier.svg';
import uploadFile from "../../src/assets/img/upload-file.svg";

class WaitForGLEIFInternalTask {
    constructor(config) {
        this._label = config.label;
        this.next = config.next;
        this._component = {
            view: (vnode) => {
                return <WaitForGLEIFInternal end={vnode.attrs.end} parent={this}/>;
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

class WaitForGLEIFInternal {
    constructor(vnode) {
        this.checkForExternal(vnode)
    }

    checkForExternal(vnode) {
        KERI.getContacts().then((contacts) => {
            let recipient = contacts.find((contact) => {
                console.log(contact.alias);
                return contact.alias === "GLEIF External";
            })
            if (recipient !== undefined) {
                Tasks.active = vnode.attrs.parent.next;
            }
        })
    }

    view(vnode) {
        return (
            <>
                <h3>Wait for GLEIF External AID Inception</h3>
                <p
                    class="font-color--battleship"
                    style={{ lineHeight: '1.38', letterSpacing: '0.3px', margin: '3rem 0 4rem 0' }}
                >
                    You are required by the vLEI Ecosystem Governance Framework to have your Qualified vLEI Issuer AID
                    delegated from the GLEIF External AID.  You must wait until the GLEIF External AID is created and
                    published to the well known address.
                    <br />
                    <br />
                    Please contact GLEIF and try again later.
                </p>
                <div class="flex flex-justify-between">
                    <Button
                        class="button--no-transform button--big"
                        raised
                        label="Dismiss"
                        onclick={() => {
                            vnode.attrs.end();
                        }}
                    />
                    <Button
                        class="button--no-transform button--big"
                        raised
                        label="Try Again"
                        onclick={() => {
                            this.checkForExternal(vnode);
                        }}
                    />
                </div>
            </>
        );
    }
}

module.exports = WaitForGLEIFInternalTask;
