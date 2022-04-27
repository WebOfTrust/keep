import m from 'mithril';
import githubLogo from '../../../../assets/img/github-logo.png';
import {Button, Card, Radio, TextField} from '../../../components';
import uploadPhoto from '../../../../assets/img/upload-image.png';
import 'emoji-picker-element';
import KERI from "../../../services/keri";
import ProfilePicture from "../../../components/profile/picture";

class Identifier {
    view(vnode) {
        return (
            <>
                <div style={{margin: '2rem'}}>
                    <h1>{vnode.attrs.parent.selectedIdentifier.name}</h1>
                    <div style={{margin: '2rem 0 2rem 0', position: 'relative'}}>
                        <ProfilePicture identifier={vnode.attrs.parent.selectedIdentifier}/>
                        <span className="material-icons-outlined md-24" style={{
                            marginRight: '1rem', backgroundColor: '#494949', borderRadius: '50%',
                            position: 'absolute', top: '50px', left: '50px', color: 'white', padding: '0.25rem'
                        }} onclick={vnode.attrs.editImage}>photo_camera</span>
                    </div>
                    <div>
                        <div class="flex flex-justify-between">
                            <p class="p-tag">Email:</p>
                            <p class="p-tag">Octocat</p>
                        </div>
                        <div class="flex flex-justify-between">
                            <p class="p-tag">Company:</p>
                            <p class="p-tag">GLEIF</p>
                        </div>
                        <div class="flex flex-justify-between">
                            <p class="p-tag">Phone Number:</p>
                            <p class="p-tag">+ 1-801-888-8888</p>
                        </div>
                    </div>
                    <div class="flex flex-justify-end" style={{margin: '4rem 0 0 0'}}>
                        <Button class="button--gray-dk button--big button--no-transform" raised label="
                                 Go Back" onclick={vnode.attrs.back}/>
                        <Button class="button--big button--no-transform" raised label="Edit"
                                onclick={vnode.attrs.continue}/>
                    </div>
                </div>
            </>
        );
    }
}

class IdentifierEditPage {
    view(vnode) {
        return (
            <>
                <div style={{margin: '2rem'}}>
                    <h1>{vnode.attrs.identifier.name}</h1>
                    <div class="flex flex-justify-between" style={{margin: '2rem 0 2rem 0'}}>
                        <img src={githubLogo} style={{width: '35%', borderRadius: '50%'}}/>
                    </div>
                    <div>
                        <div class="flex flex-justify-between">
                            <p class="p-tag">Email:</p>
                            <TextField filled fluid placeholder="octocat@gleif.org"
                                       style={{width: '60%', height: '2.5rem'}}/>
                        </div>
                        <div class="flex flex-justify-between">
                            <p class="p-tag">Company:</p>
                            <TextField filled fluid placeholder="GLEIF" style={{width: '60%', height: '2.5rem'}}/>
                        </div>
                        <div class="flex flex-justify-between">
                            <p class="p-tag">Phone Number:</p>
                            <TextField filled fluid placeholder="+ 1-801-888-8888"
                                       style={{width: '60%', height: '2.5rem'}}/>
                        </div>
                    </div>
                    <div className="flex flex-justify-between" style={{marginTop: '3rem'}}>
                        <Button class="button--gray-dk button--big button--no-transform" raised label="
                         Go Back" onclick={vnode.attrs.back}/>
                        <Button class="button--big button--no-transform" raised label="Save"
                                onclick={vnode.attrs.continue}/>
                    </div>
                </div>
            </>
        );
    }
}

class EditImage {
    emojiShow = false;

    oncreate(vnode) {
        console.log("adding listener");
        document.querySelector('emoji-picker').addEventListener('emoji-click', e => {
            console.log(e.detail.unicode)
        });
    }

    toggle() {
        console.log("toggle");
        this.emojiShow = !this.emojiShow;
        console.log("toggle", this.emojiShow);
        document.querySelector('emoji-container').style.display = this.emojiShow ? 'block' : 'none';
    }

    view(vnode) {
        return (
            <>
                <div style={{margin: '2rem'}}>
                    <img src={uploadPhoto} style={{marginBottom: '1rem'}}/>
                    <h3>Select a Symbol or Photo for {vnode.attrs.parent.selectedIdentifier.alias}</h3>
                    <p class="p-tag">This symbol or photo will be listed alongside your alias in your credentials
                        wallet.</p>

                    <div className="flex flex-align-center" style={{color: '#494949'}}>
                        <span className="material-icons md-48" style={{marginRight: '1rem'}}>photo</span>
                        <h4>Update picture</h4><p/>
                        <input type="file" id="fileLoader" name="files" title="Load File" style={{display: 'none'}}/>
                        <Button class="button--gray-dk button--big button--no-transform" raised label="+"/>
                    </div>
                    {/*<input type="file" style={{margin: '0 0 1rem 0'}}/>*/}
                    <div className="flex flex-align-center" style={{color: '#494949'}}>
                        <span className="material-icons md-48" style={{marginRight: '1rem'}}>mood</span>
                        <h4>Use emoji</h4>
                        <Button onclick={this.toggle} label="me"/>
                    </div>
                    <div id="emoji-container" style={{display: 'none'}}>
                        <emoji-picker></emoji-picker>
                    </div>
                </div>
            </>
        );
    }
}

class ListIdentifiers {
    identifiers = []

    constructor() {
        KERI.listIdentifiers().then((identifiers) => {
            console.log(identifiers)
            this.identifiers = identifiers
        }).catch((err) => {
            this.identifiers = []
            console.log('listIdentifiers', err);
        });
    }

    view(vnode) {
        return (
            <>
                <div style={{height: '624px', overflowY: 'scroll', margin: '0 0 2rem 0'}}>
                    {this.identifiers.map((aid) => {
                        return (
                            <Card class="" style={{margin: '1.5rem ', padding: '0'}}>
                                <ProfilePicture identifier={aid}/>
                                        <div class="font-weight--medium" style={{marginLeft: '1rem', marginTop: '1.25rem', display: 'inline-block'}}>{aid.name}</div>
                                        <span className="material-icons-outlined md-24" style={{float: 'right'}}>
                                                {aid.hasOwnProperty("group") ? "group" : "person"}
                                            </span>
                                    <div>
                                        <h6 style={{margin: '1rem 0 0 0'}}>
                                            Prefix:
                                        </h6>
                                        <code style="margin: 0 0 0 0;">{aid.prefix}</code>
                                        <div>
                                            <h6 style={{margin: '1rem 0 0 0'}}>
                                                Public Keys:
                                            </h6>
                                            {aid.public_keys.map((pk) => {
                                                return (
                                                    <div>
                                                        <code style="margin: 0 0 0 0;">{pk}</code>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <div className="flex flex-justify-between" style={{marginTop: '1rem'}}>
                                            <div>Use as default
                                                <Radio
                                                    id="alias"
                                                    name="alias"
                                                    checked={("metadata" in aid) && ("default" in aid.metadata)}
                                                    onclick={() => {
                                                        KERI.updateIdentifier(aid.name, {
                                                            default: "true"
                                                        })
                                                    }}
                                                    style={{marginTop: '1rem 1rem'}}
                                                />
                                            </div>
                                            <Button class="button--big button--no-transform" raised label="Edit"
                                                    onclick={() => {
                                                        vnode.attrs.parent.selectedIdentifier = aid
                                                        vnode.attrs.continue();
                                                    }}/>
                                        </div>
                                    </div>
                            </Card>
                        );
                    })}
                </div>
            </>
        );
    }
}


class ManageIdentifiers {
    constructor() {
        this.currentState = 'list-identifiers';
    }

    selectedIdentifier = {};

    view(vnode) {
        return (
            <>
                {this.currentState === 'list-identifiers' && <ListIdentifiers
                    parent={this}
                    continue={() => {
                        this.currentState = 'identifier';
                    }}
                />}
                {this.currentState === 'identifier' && (
                    <Identifier
                        parent={this}
                        editImage={() => {
                            this.currentState = 'identifier-edit-image'
                        }}
                        back={() => {
                            this.currentState = 'list-identifiers'
                        }}
                        continue={() => {
                            this.currentState = 'identifier-edit-page';
                        }}
                    />
                )}
                {this.currentState === 'identifier-edit-page' && <IdentifierEditPage
                    parent={this}
                    back={() => {
                        this.currentState = 'identifier';
                    }}/>}
                {this.currentState === 'identifier-edit-image' && <EditImage
                    parent={this}
                    back={() => {
                        this.currentState = 'identifier';
                    }}/>}
            </>
        );
    }
}

module.exports = ManageIdentifiers;
