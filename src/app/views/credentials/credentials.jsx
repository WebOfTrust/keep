import m from 'mithril';
import { Card, Container, IconButton, NavRail, TextField, Button } from '../../components';
import CredentialList from "../credentials/credential-list/credential-list";
import { KERI } from "../../services";
import credentialGroup from '../../../assets/img/contact-group.svg';
import './credentials.scss';


class Credentials {
    constructor() {
        this.credentials = [];
        this.activeCredential = null;
        KERI.listCredentials("person", 'received')
            .then((credentials) => {
                this.credentials = credentials;
            })
            .catch((err) => {
                console.log('listCredentials', err);
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
                    <Container class="headspace" style={{ padding: '0 4rem' }}>
                        <div class="flex flex-justify-between">
                            <div class="flex-1" style={{ marginRight: '4rem' }}>
                                <Card class="card--fluid" padding="1.5rem">
                                    <TextField
                                        style={{ backgroundColor: 'white', height: '3rem', margin: '0 0 1.5rem 0' }}
                                        filled
                                        fluid
                                        placeholder="Search for Credentials"
                                        iconTrailing={{
                                            icon: 'search',
                                        }}
                                    />
                                    {this.credentials.map((credential) => {
                                        return <CredentialList credential={credential} setCredential={this.setCredential} />;
                                    })}
                                </Card>
                            </div>
                            <div class="flex-1">
                                <Card class={'card--fluid'} style={{ position: 'relative' }} padding="4rem">
                                    <IconButton class="close-icon" icon="close" />
                                    {this.activeCredential !== null ? (
                                        <CredentialDetails credential={this.activeCredential} />
                                    ) : (
                                        <>
                                            <h2>My Credentials</h2>
                                            <img src={credentialGroup} style={{ width: '50%', margin: '2rem 0 2rem 0' }} />
                                            <h3>View Your Credentials</h3>
                                            <p class="p-tag">
                                                Click on any of your credentials on the sidebar to update or edit information about them or their
                                                credentials.{' '}
                                            </p>
                                            <br />
                                            <br />
                                            <div class="flex flex-justify-end">
                                                {/* <Button class="button--gray-dk button--big button--no-transform" raised label="Skip" /> */}
                                                <Button class="button--big button--no-transform" raised label="Dismiss" />
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