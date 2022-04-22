import m from 'mithril';
import githubLogo from '../../../../assets/img/github-logo.png';
import {Button, Card, TextField} from '../../../components';
import {Auth, Profile} from '../../../services';

function getProfileView(identifier) {
    if (identifier.hasOwnProperty("image")) {
        return (
            <img src={githubLogo} style={{width: '35%', borderRadius: '50%'}}/>
        );
    } else if (identifier.hasOwnProperty("alias")) {
        let initials = "";

        const parts = identifier.alias.split(" ")
        if (parts.length === 1) {
            initials = identifier.alias.substring(0,1)
        } else if (parts.length >= 2) {
            initials = parts[0].substring(0,1) + parts[1].substring(0,1)
        }

        return (
            <div style={{
                display:'inline-block',
                fontSize:'1.5em',
                width:'2.5em',
                height:'2.5em',
                lineHeight:'2.5em',
                textAlign:'center',
                borderRadius:'50%',
                background:'grey',
                verticalAlign:'middle',
                color:'white',
                marginRight: '2rem'
            }}>
                <div>{initials}</div>
            </div>
        );
    }
}

class Identifier {
    view(vnode) {
        return (
            <>
                <div style={{margin: '2rem'}}>
                    <h1>{vnode.attrs.parent.selectedIdentifier.alias}</h1>
                        <div class="flex flex-justify-between" style={{margin: '2rem 0 2rem 0'}}>
                            {getProfileView(vnode.attrs.parent.selectedIdentifier)}
                            <Button label="📷" onclick={vnode.attrs.editImage}/>
                        </div>
                        <div>
                            <div c1lass="flex flex-justify-between">
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
                <h1>{vnode.attrs.identifier.alias}</h1>
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
    view(vnode) {
        return (
            <>
                <div style={{margin: '2rem'}}>
                <h3>Select a Symbol or Photo for {vnode.attrs.parent.selectedIdentifier.alias}</h3>
                <p class="p-tag">This symbol or photo will be listed alongside your alias in your credentials
                    wallet.</p>

                <div className="flex flex-align-center">
                    <img src={githubLogo} align="left" style="margin: 0 1.5rem 0 0;"/>
                    <span style="display:inline-block; vertical-align:middle">
                        Update picture
                    </span>
                </div>
                <div className="flex flex-align-center">
                    <img src={githubLogo} align="left" style="margin: 0 1.5rem 0 0;"/>
                    <span style="display:inline-block; vertical-align:middle">
                        Use Emoji
                    </span>
                </div>
                <div className="flex flex-justify-between" style={{marginTop: '3rem'}}>
                    <Button class="button--gray-dk button--big button--no-transform" raised label="Go Back"
                        onclick={vnode.attrs.back}/>
                    <Button class="button--big button--no-transform" raised label="Save"/>
                </div>
                </div>
            </>
        );
    }
}

class ListIdentifiers {

    aids = [
        {
            alias: "Alice",
            aid: 'abbc123',
        },
        {
            alias: "Bob",
            aid: 'bobobb123',
        }]

    get defaultAid() {
        let label = '';
        let aid = Profile.getDefaultAID();
        if (aid !== null) {
            console.log(aid);
            label = '(' + aid.name + ') ';
        }

        label += Auth.title();
        return label;
    }

    view(vnode) {
        Profile.loadIdentifiers()
        return (
            <>
                <div style={{height: '512px', overflowY: 'scroll', margin: '0 0 2rem 0'}}>
                    {this.aids.map((aid) => {
                        return (
                            <Card class="" style={{margin: '1.5rem ', padding: '0'}} onclick={() => {
                                vnode.attrs.parent.selectedIdentifier = aid
                                vnode.attrs.continue();
                            }}>
                                <div>
                                    {getProfileView(aid)}
                                    <div style="display:inline-block; vertical-align:middle">
                                        <div class="font-weight--medium" style="margin: 1.5rem 0 1rem 0;">{aid.alias}</div>
                                        <div style="margin: 0 0 1.5rem 0;">{aid.aid}</div>
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
