import m from 'mithril';
import {Button, Card, IconButton, TextField} from '../../src/app/components';
import {KERI} from '../../src/app/services';

/*
 * EnterOOBIsForm
 *
 * attrs
 * identifiers - an array of agent identifiers
 * oobis - array of oobis to modify
 * oobisChange - function triggered after all oobis are resolved
 */

class EnterOOBIsForm {
    constructor(vnode) {
        this.complete = false;
        this.alias = vnode.attrs.identifiers[0].name;
        vnode.attrs.oobis.forEach((oobi) => {
            oobi.status = "none";
        });
    }

    resolveOOBIPromise(oobi) {
        return KERI.resolveOOBI(this.alias, oobi.alias, oobi.url);
    }

    resolveAllOOBIs(vnode) {
        let promises = vnode.attrs.oobis
            .filter((oobi) => {
                return oobi.alias && oobi.url;
            })
            .map((oobi) => {
                oobi.status = "started"
                return this.resolveOOBIPromise(oobi);
            });
        return Promise.all(promises)
            .then(() => {
                this.ensureOOBIsResolved(vnode.attrs.oobis)
                    .then(() => {
                        vnode.attrs.oobisChange(
                            vnode.attrs.oobis.filter((oobi) => {
                                return oobi.alias && oobi.url;
                            })
                        );
                    });
            })
            .catch((err) => {
                console.log('resolveAllOOBIs', err);
            });
    }

    ensureOOBIsResolved(oobis) {
        let aliases = oobis.map((oobi) => {
            return oobi.alias;
        });

        return new Promise(function (resolve, reject) {
            setTimeout((function waitForOOBI() {
                KERI.getContactsByAliases(aliases)
                    .then((contacts) => {
                        let done = oobis.every((oobi) => {
                            return contacts.some((contact) => {
                                if (contact.alias === oobi.alias) {
                                    oobi.status = "resolved";
                                    return true;
                                }
                                return false;
                            })
                        })
                        if (done) return resolve();
                        setTimeout(waitForOOBI, 1000);

                    })
                    .catch((err) => {
                        reject()
                        console.log('getContacts', err);
                    });
            }), 1000);
        });
    }

    view(vnode) {
        return (
            <>
                <div style={{height: '512px', overflowY: 'auto', margin: '0 0 1rem 0', paddingRight: '1rem'}}>
                    <div class="flex flex-justify-between" style={{alignItems: 'baseline'}}>
                        <p class="p-tag" style={{margin: '2rem 0 2rem 0'}}>
                            While on the Video Call make sure to obtain each participant's <b>URL</b> and give them
                            an Alias that makes sense to you:
                        </p>
                    </div>
                    {vnode.attrs.oobis.map((oobi) => {
                        return (
                            <Card class="card--fluid" style={{margin: '0 0 1.5rem 0'}}>
                                <IconButton
                                    class="close-icon"
                                    icon="close"
                                    onclick={() => {
                                        vnode.attrs.oobis.splice(vnode.attrs.oobis.indexOf(oobi), 1);
                                    }}
                                />
                                <div className="flex flex-align-center flex-justify-between">
                                    <h5 style={{width: '100px'}}>Status:</h5>
                                    {oobi.status === "none" && (
                                        <p className="font-color--battleship font-weight--medium">Not Started</p>
                                    )}
                                    {oobi.status === "started" && (
                                        <p className="font-color--blue font-weight--medium">In Progress</p>
                                    )}
                                    {oobi.status === "resolved" && (
                                        <p className="font-color--green font-weight--medium">Complete!</p>
                                    )}
                                </div>
                                <div class="flex flex-align-center flex-justify-between">
                                    <h5 style={{width: '100px'}}>Alias:</h5>
                                    <TextField
                                        outlined
                                        fluid
                                        style={{backgroundColor: 'rgba(0, 0, 0, 0.04)', height: '44px'}}
                                        value={oobi.alias}
                                        oninput={(e) => {
                                            oobi.alias = e.target.value;
                                        }}
                                    />
                                </div>
                                <div class="flex flex-align-center flex-justify-between">
                                    <h5 style={{width: '100px'}}>URL:</h5>
                                    <TextField
                                        outlined
                                        fluid
                                        style={{backgroundColor: 'rgba(0, 0, 0, 0.04)', height: '44px'}}
                                        value={oobi.url}
                                        oninput={(e) => {
                                            oobi.url = e.target.value;
                                        }}
                                    />
                                </div>
                            </Card>
                        );
                    })}
                </div>
                <div class="flex flex-justify-between">
                    <Button
                        class="button--big button--no-transform"
                        raised
                        label="Add Another"
                        onclick={() => {
                            vnode.attrs.oobis.push({
                                alias: '',
                                url: '',
                                status: 'none'
                            });
                        }}
                    />
                    <Button
                        class="button--big button--no-transform"
                        raised
                        label="Resolve OOBIs"
                        onclick={() => {
                            this.resolveAllOOBIs(vnode);
                        }}
                    />
                </div>
            </>
        );
    }
}

module.exports = EnterOOBIsForm;
