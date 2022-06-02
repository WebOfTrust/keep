import m from 'mithril';
import {Button, Card, Select, TextField} from '../../../src/app/components';
import createIdentifier from '../../../src/assets/img/create-identifier.svg';
import passcodeImg from "../../../src/assets/img/passcode.svg";
import verifyCredential from "../../../src/assets/img/verify-credentials.svg";
import KERI from "../../../src/app/services/keri";

const ViRASchema = "Ehwr6tZh6XakKBKWQW07otQ9uCwg0g7CF-dPz9qb_fwQ";
const OORSchema = "E2RzmSCFmG2a5U2OqZF-yUobeSYkW-a3FsN82eZXMxY0"

const edges = {
    "d": "",
    "oor": {
        "n": "",
        "s": OORSchema
    },
};

class SignXBRLReportTask {
    constructor(config) {
        this._label = config.label;
        this.currentState = 'intro'
        this._component = {
            view: (vnode) => {
                return <SignXBRLReport end={vnode.attrs.end} parent={this}/>;
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

class SignXBRLReport {
    constructor() {
        this.schema = {};
        this.credentials = {}
        this.credential = null;
        this.vira = null
        this.contacts = {}
        this.factsFile = '';
        this.fileName = 'Upload Facts File';
        this.submitting = false;
        this.reportTitle = "";
        this.reader = new FileReader();
        this.reader.addEventListener('loadend', () => {
            this.facts = JSON.parse(this.reader.result);
        });
        KERI.listSchema()
            .then((schema) => {
                this.schema = new Map(schema.map(s => {
                    return [s['$id'], s];
                }));
            });

        KERI.getContacts().then((contacts) => {
            this.contacts = new Map(contacts.map(c => {
                return [c.id, c];
            }));
        });

        KERI.listCredentials('person', 'received')
            .then((credentials) => {
                this.credentials = credentials;
            })
            .catch((err) => {
                this.credentialList = [];
            });
    }

    signReport(vnode) {
        let e = edges
        e.oor.n = this.credential['sad']['d']
        return KERI.issueCredential('person',
            {
                credentialData: this.facts,
                registry: 'vLEI-person',
                schema: ViRASchema,
                source: e,
            })
    }

    exportCredential() {
        let alias = "person";
        let said = this.vira['sad']['d'];

        KERI.exportCredential(alias, said).then((data) => {
            let b = new Blob([data], {type: "application/json+cesr"})
            let a = document.createElement("a");
            a.href = window.URL.createObjectURL(b);
            a.download = "credential.cesr";
            a.click();
        })

    }

    view(vnode) {
        return (
            <>
                {vnode.attrs.parent.currentState === 'intro' && (
                    <>
                        <h3>Signing an XBRL Report</h3>
                        <p className="p-tag" style={{margin: '2rem 0'}}>
                            {vnode.attrs.steps ? (
                                vnode.attrs.steps.paragraph
                            ) : (
                                <>
                                    This module will take you through the steps of how to create and issue a signed data
                                    attestation
                                    of an XBRL report:
                                </>
                            )}
                        </p>
                        <h3>Steps to Signing an XBRL Report</h3>
                        <ol className="styled-ol" style={{margin: '2rem 0'}}>
                            {vnode.attrs.steps ? (
                                vnode.attrs.steps.list.map((element) => {
                                    return <li>{element}</li>;
                                })
                            ) : (
                                <>
                                    <li>Generate the list of XBRL Facts to sign from the XBRL report</li>
                                    <li>Select the Facts file generated in Step 1.</li>
                                    <li>Issue the signed credential attesting to the Facts from the report</li>
                                    <li>Export the signed credential and all supporting cryptographic material</li>
                                </>
                            )}
                        </ol>
                        <div className="flex flex-justify-end" style={{marginTop: '4rem'}}>
                            {/* <Button class="button--gray-dk button--big button--no-transform" raised label="Skip" /> */}
                            <Button
                                class="button--big button--no-transform"
                                raised
                                label="Continue"
                                onclick={() => {
                                    vnode.attrs.parent.currentState = 'select-attributes-file';
                                }}
                            />
                        </div>
                    </>
                )}

                {vnode.attrs.parent.currentState === 'select-attributes-file' && (
                    <>
                        <h3>Select Facts file generated from the XBRL Report</h3>
                        <div className="flex flex-justify-center" style={{margin: '5rem 0'}}>
                            <img src={passcodeImg} style={{width: '192px'}}/>
                        </div>
                        <p className="p-tag" style={{margin: '0 0 3rem 0'}}>
                            Select the file generate from the Facts of the XBRL.
                        </p>
                        <p className="p-tag" style={{margin: '2rem 0 2rem 0'}}>
                            What report are you signing?
                        </p>
                        <TextField
                            outlined
                            fluid
                            value={this.reportTitle}
                            oninput={(e) => {
                                this.reportTitle = e.target.value;
                            }}
                        />
                        <div className="flex flex-justify-evenly"
                             style={{alignItems: 'center', margin: '4rem 0 4rem 0'}}>
                            <>
                                <input
                                    type="file"
                                    style={{margin: '4rem 0 4rem 0'}}
                                    id="actual-upload"
                                    onchange={(e) => {
                                        this.fileName = e.target.files[0].name;
                                        this.factsFile = URL.createObjectURL(e.target.files[0]);
                                        this.reader.readAsText(e.target.files[0]);
                                    }}
                                    hidden
                                />
                                <label
                                    htmlFor="actual-upload"
                                    style={{
                                        backgroundColor: '#c4c4c4',
                                        padding: '5px 25px 0px 25px',
                                        color: 'white',
                                        // width: '81px',
                                        fontSize: '250%',
                                        cursor: 'pointer',
                                    }}
                                >
                                    +
                                </label>
                            </>

                            <p style={{fontSize: '115%', color: '#737b7d'}}>{this.fileName}</p>
                        </div>
                        <div className="flex flex-justify-end" style={{marginTop: '4rem'}}>
                            <Button
                                raised
                                class="button--no-transform button--big"
                                label="Continue"
                                disabled={!this.factsFile || this.submitting}
                                onclick={() => {
                                    vnode.attrs.parent.currentState = 'select-credential';
                                }}
                            />
                        </div>
                    </>
                )}
                {vnode.attrs.parent.currentState === 'select-credential' && (
                    <>
                        <h3>Select the OOR or ECR credential you wish to use to sign this report:</h3>
                        <div className="flex flex-justify-center" style={{margin: '5rem 0'}}>
                            <img src={verifyCredential} style={{width: '192px'}}/>
                        </div>
                        <p className="p-tag" style={{margin: '0 0 3rem 0'}}>
                            You must select one of your OOR or one of your ECR credentials.
                        </p>
                        <div className="flex flex-justify-center" style={{margin: '1rem 0'}}>
                            <Select
                                outlined
                                options={this.credentials.map(c => {
                                    let sad = c['sad']
                                    let attrs = sad['a']
                                    if ('officialRole' in attrs) {
                                        return { label: "OOR vLEI with Role: " + attrs['officialRole'], value: sad['i'] };
                                    }
                                    else if ('engagementContextRole' in attrs) {
                                        return {label: "ECR vLEI with Role: " + attrs['engagementContextRole'], value: sad['i'] };
                                    }
                                })}
                                onchange={(id) => {
                                    this.credential = this.credentials.find(c => {return c['sad']['i'] === id});
                                    let sad = this.credential['sad'];
                                    this.schema = this.schema.get(sad['s']);
                                    this.attrs = sad['a']
                                    this.issuer = this.contacts.get(sad['i']);

                                }}
                                style={{width: "100%"}}
                            />
                        </div>
                        <div className="flex flex-justify-between" style={{marginTop: '4rem'}}>
                            <Button
                                class="button--gray-dk button--big button--no-transform"
                                raised
                                label="Go Back"
                                onclick={() => {
                                    vnode.attrs.parent.currentState = 'select-attributes-file';
                                }}
                            />
                            <Button
                                raised
                                class="button--no-transform button--big"
                                label="Continue"
                                disabled={!this.credential || this.submitting}
                                onclick={() => {
                                    vnode.attrs.parent.currentState = 'confirm-and-sign';
                                }}
                            />
                        </div>
                    </>
                )}
                {vnode.attrs.parent.currentState === 'confirm-and-sign' && (
                    <>
                        <h3>Confirm and Sign:</h3>
                        <p className="p-tag" style={{margin: '0 0 3rem 0'}}>
                            Please confirm the following data and click "Sign" to sign the report.
                        </p>
                        <div style={{margin: '1rem 0'}}>
                            <div>
                                <div>
                                    <div style={{margin: '0 0 2rem 0'}}>
                                        <p className="p-tag-bold" style={{margin: '1rem 0 0 0'}}>
                                            Sign Data from XBRL Report:
                                        </p>
                                        <code style="margin: 0 0 0 0;">{this.reportTitle}</code>
                                    </div>
                                </div>
                                <div style={{margin: '0 0 2rem 0'}}>
                                    <p className="p-tag-bold" style={{margin: '1rem 0 0 0'}}>
                                        Sign with Credential:
                                    </p>
                                </div>
                                    <Card class="" style={{margin: '1px', padding: '0'}}>
                                    <div class="flex flex-justify-between">
                                        <div class="flex">
                                            <div class="font-weight--medium"
                                                 style={{marginLeft: '1rem', marginTop: '1.25rem'}}>
                                                {this.schema['title']}
                                            </div>
                                        </div>

                                    </div>

                                    <div>
                                        {'personLegalName' in this.attrs && (
                                            <div>
                                                <div style={{margin: '0 0 2rem 0'}}>
                                                    <p class="p-tag-bold" style={{margin: '1rem 0 0 0'}}>
                                                        Person Legal Name:
                                                    </p>
                                                    <code style="margin: 0 0 0 0;">{this.attrs['personLegalName']}</code>
                                                </div>
                                            </div>
                                        )}
                                        {'officialRole' in this.attrs && (
                                            <div>
                                                <div style={{margin: '0 0 2rem 0'}}>
                                                    <p class="p-tag-bold" style={{margin: '1rem 0 0 0'}}>
                                                        Official Role:
                                                    </p>
                                                    <code style="margin: 0 0 0 0;">{this.attrs['officialRole']}</code>
                                                </div>
                                            </div>
                                        )}
                                        {'engagementContextRole' in this.attrs && (
                                            <div>
                                                <div style={{margin: '0 0 2rem 0'}}>
                                                    <p class="p-tag-bold" style={{margin: '1rem 0 0 0'}}>
                                                        Person Legal Name:
                                                    </p>
                                                    <code style="margin: 0 0 0 0;">{this.attrs['engagementContextRole']}</code>
                                                </div>
                                            </div>
                                        )}

                                        {'LEI' in this.attrs && (
                                            <div style={{margin: '2rem 0 2rem 0'}}>
                                                <p class="p-tag-bold" style={{margin: '1rem 0 0 0'}}>
                                                    LEI:
                                                </p>
                                                <code style="margin: 0 0 0 0;">{this.attrs['LEI']}</code>
                                            </div>
                                        )}

                                        <div style={{margin: '2rem 0 2rem 0'}}>
                                            <p className="p-tag-bold" style={{margin: '1rem 0 0 0'}}>
                                                Issued By:
                                            </p>
                                            <code style="margin: 0 0 0 0;">{this.issuer.alias}</code>
                                        </div>


                                    </div>
                                </Card>
                            </div>
                        </div>
                        <div className="flex flex-justify-between" style={{marginTop: '4rem'}}>
                            <Button
                                class="button--gray-dk button--big button--no-transform"
                                raised
                                label="Go Back"
                                onclick={() => {
                                    vnode.attrs.parent.currentState = 'select-credential';
                                }}
                            />
                            <Button
                                raised
                                class="button--no-transform button--big"
                                label="Sign"
                                disabled={!this.factsFile || this.submitting}
                                onclick={() => {
                                    this.signReport().then((credential) => {
                                        this.vira = credential
                                        vnode.attrs.parent.currentState = 'export-credential';
                                    })
                                }}
                            />
                        </div>
                    </>
                )}
                {vnode.attrs.parent.currentState === 'export-credential' && (
                    <>
                        <h3>Export Verifiable iXBRL Report Attestation</h3>
                        <div className="flex flex-justify-center" style={{margin: '5rem 0'}}>
                            <img src={passcodeImg} style={{width: '192px'}}/>
                        </div>
                        <p className="p-tag" style={{margin: '0 0 3rem 0'}}>
                            Click on export to download a file containing your Verifiable iXBRL Report Attestation
                            and all supporting cryptographic material.
                        </p>

                        <div className="flex flex-justify-end" style={{marginTop: '4rem'}}>
                            <Button
                                raised
                                class="button--no-transform button--big"
                                label="Export"
                                disabled={!this.vira}
                                onclick={() => {
                                    this.exportCredential()
                                }}
                            />
                        </div>
                    </>
                )}
            </>
        );
    }
}

module.exports = SignXBRLReportTask;
