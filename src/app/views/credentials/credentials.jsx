import m from 'mithril';
import {Card, Container, IconButton, NavRail, TextField, Button} from '../../components';
import CredentialList from "../credentials/credential-list/credential-list";
import CredentialDetails from './credential-details/credential-details';

import {KERI} from "../../services";
import credentialGroup from '../../../assets/img/contact-group.svg';
import './credentials.scss';


class Credentials {
    constructor() {
        this.credentials = [];
        this.activeCredential = null;
        this.schema = {}
        this.credentials = [];
        this.contacts = [];

        KERI.listSchema()
            .then((schema) => {
                this.schema = new Map(schema.map(s => {
                    return [s['$id'], s];
                }));
                KERI.getContacts().then((contacts) => {
                    this.contacts = new Map(contacts.map(c => {
                        return [c.id, c];
                    }));
                    KERI.listCredentials('person', 'received')
                        .then((credentials) => {
                            this.credentials = credentials;
                        })
                        .catch((err) => {
                            this.credentials = [];
                            console.log('listCredentials', err);
                        });
                });
            });
    }

    setCredential = (credential) => {
        this.activeCredential = credential;
    };

    view(vnode) {
        return (
            <>
                <div class="credentials">
                    <NavRail/>
                    <Container class="headspace" style={{padding: '0 4rem'}}>
                        <div class="flex flex-justify-between">
                            <div class="flex-1" style={{marginRight: '4rem'}}>
                                <Card class="card--fluid" padding="1.5rem">
                                    <Button
                                        style={{margin: '0 1rem 0 0'}}
                                        class="button button--no-transform"
                                        raised
                                        label="Received"
                                        onclick={() => {
                                            KERI.listCredentials('person', 'received')
                                                .then((credentials) => {
                                                    this.credentials = credentials;
                                                })
                                                .catch((err) => {
                                                    this.credentials = [];
                                                    console.log('listCredentials', err);
                                                });
                                        }}
                                    />
                                    <Button
                                        style={{margin: '0 1rem 0 0'}}
                                        class="button button--no-transform"
                                        raised
                                        label="Issued"
                                        onclick={() => {
                                            KERI.listCredentials('person', 'issued')
                                                .then((credentials) => {
                                                    this.credentials = credentials;
                                                })
                                                .catch((err) => {
                                                    this.credentials = [];
                                                    console.log('listCredentials', err);
                                                });
                                        }}
                                    />

                                    {this.credentials.map((credential) => {
                                        let sad = credential['sad'];
                                        let schema = this.schema.get(sad['s']);

                                        return <CredentialList
                                            credential={credential}
                                            schema={schema}
                                            setCredential={this.setCredential}/>;
                                    })}
                                </Card>
                            </div>
                            <div class="flex-1">
                                <Card class={'card--fluid'} style={{position: 'relative'}} padding="4rem">
                                    <IconButton class="close-icon" icon="close"/>
                                    {this.activeCredential !== null ? (
                                        <CredentialDetails credential={this.activeCredential} schema={this.schema}
                                                           contacts={this.contacts}/>
                                    ) : (
                                        <>
                                            <h2>My Credentials</h2>
                                            <img src={credentialGroup} style={{width: '50%', margin: '2rem 0 2rem 0'}}/>
                                            <h3>View Your Credentials</h3>
                                            <p class="p-tag">
                                                Click on any of your credentials on the sidebar to update or edit
                                                information about them or their
                                                credentials.{' '}
                                            </p>
                                            <br/>
                                            <br/>
                                            <div class="flex flex-justify-end">
                                                {/* <Button class="button--gray-dk button--big button--no-transform" raised label="Skip" /> */}
                                                <Button class="button--big button--no-transform" raised
                                                        label="Dismiss"/>
                                            </div>
                                        </>
                                    )}
                                </Card>
                            </div>
                        </div>
                    </Container>
                </div>
            </>
        );
    }
}

module.exports = Credentials