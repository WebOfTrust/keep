import m from 'mithril';
import { Card, Container, IconButton, NavRail, Tab, TabBar, TextField, Button } from '../../components';
import CredentialList from '../credentials/credential-list/credential-list';
import CredentialDetails from './credential-details/credential-details';

import { KERI, Profile } from '../../services';
import verifyCredentials from '../../../assets/img/verify-credentials.svg';
import './credentials.scss';

class Credentials {
  constructor(vnode) {
    this.type = vnode.attrs.type;
    this.showHelp = true;
    this.credentials = [];
    this.activeCredential = null;
    this.schema = {};
    this.contacts = [];
    this.activeTab = 'received';
    this.search = '';

    KERI.listSchema().then((schema) => {
      this.schema = new Map(
        schema.map((s) => {
          return [s['$id'], s];
        })
      );
      KERI.getContacts().then((contacts) => {
        this.contacts = new Map(
          contacts.map((c) => {
            return [c.id, c];
          })
        );
        this.listCredentials('received');
      });
    });
  }

  listCredentials(type) {
    KERI.listCredentials(Profile.getDefaultAID().name, type)
      .then((credentials) => {
        this.credentials = credentials;
      })
      .catch((err) => {
        this.credentials = [];
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
          <NavRail />
          <Container class="headspace" style={{ padding: '0 4rem' }}>
            <div class="flex flex-justify-between">
              <div class="flex-1" style={{ marginRight: '4rem' }}>
                <Card class="card--fluid" padding="1.5rem">
                  <TabBar style={{ marginBottom: '2rem' }}>
                    <Tab
                      label="Received"
                      active={this.activeTab === 'received'}
                      onclick={() => {
                        this.activeTab = 'received';
                        this.listCredentials(this.activeTab);
                      }}
                    />
                    <Tab
                      label="Issued"
                      active={this.activeTab === 'issued'}
                      onclick={() => {
                        this.activeTab = 'issued';
                        this.listCredentials(this.activeTab);
                      }}
                    />
                  </TabBar>
                  <TextField
                    filled
                    fluid
                    placeholder="Search for Credentials"
                    style={{ marginBottom: '2rem' }}
                    iconTrailing={{
                      icon: 'search',
                    }}
                    value={this.search}
                    oninput={(e) => {
                      this.search = e.target.value;
                    }}
                  />
                  {this.credentials.map((credential) => {
                    let sad = credential['sad'];
                    let schema = this.schema.get(sad['s']);
                    let active = this.activeCredential === credential;
                    return (
                      <CredentialList
                        active={active}
                        credential={credential}
                        schema={schema}
                        setCredential={this.setCredential}
                      />
                    );
                  })}
                </Card>
              </div>
              <div class="flex-1">
                {this.activeCredential && (
                  <Card fluid style={{ position: 'relative' }} padding="4rem">
                    <IconButton
                      class="close-icon"
                      icon="close"
                      onclick={() => {
                        this.activeCredential = null;
                      }}
                    />
                    <CredentialDetails
                      credential={this.activeCredential}
                      schema={this.schema}
                      contacts={this.contacts}
                    />
                  </Card>
                )}
                {!this.activeCredential && this.showHelp && (
                  <Card fluid style={{ position: 'relative' }} padding="4rem">
                    <IconButton
                      class="close-icon"
                      icon="close"
                      onclick={() => {
                        this.showHelp = false;
                      }}
                    />
                    <h2>My Credentials</h2>
                    <img src={verifyCredentials} style={{ width: '200px', margin: '5rem 0' }} />
                    <h3>View Your Credentials</h3>
                    <p class="p-tag">
                      Click on any of your credentials on the sidebar to view the most up to date information on them.
                    </p>
                    <div class="flex flex-justify-end" style={{ marginTop: '4rem' }}>
                      <Button
                        class="button--big button--no-transform"
                        raised
                        label="Dismiss"
                        onclick={() => {
                          this.showHelp = false;
                        }}
                      />
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

module.exports = Credentials;
