import m from 'mithril';
import {Button} from '../../../src/app/components';
import createIdentifier from '../../../src/assets/img/create-identifier.svg';
import passcodeImg from "../../../src/assets/img/passcode.svg";

const ViRASchema = "Ec7NSIUfktTAofFOSaXhnKHdOqoILdSLvvMtin9uQk_s";
const OORSchema  = "E2RzmSCFmG2a5U2OqZF-yUobeSYkW-a3FsN82eZXMxY0"

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
        this.factsFile = '';
        this.fileName = 'Upload Facts File';
        this.submitting = false;
        this.reader = new FileReader();
        this.reader.addEventListener('loadend', () => {
            console.log(this.reader.result)
        });
    }

    next(vnode) {

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
                                        this.reader.readAsBinaryString(e.target.files[0]);
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
                                    this.next(vnode);
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
