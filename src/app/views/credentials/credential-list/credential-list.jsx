import KERI from "../../../services/keri";
import {Card} from '../../../components';

class CredentialList {
    schema = {}
    credentials = [];
    contacts = []

    constructor() {
        KERI.listSchema()
            .then((schema) => {
                this.schema = new Map(schema.map(s => {
                    return [s['$id'], s];
                }));
                KERI.getContacts().then((contacts) => {
                    this.contacts = new Map(contacts.map(c => {
                        return [c.id, c];
                    }));
                    KERI.listCredentials('person', 'issued')
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

    view(vnode) {
        return (
            <>
                <div style={{height: '624px', overflowY: 'scroll', margin: '0 0 0 0'}}>
                    {this.credentials.map((credential) => {
                        let sad = credential['sad'];
                        let schema = this.schema.get(sad['s']);
                        let attrs = sad['a']
                        let issuer = this.contacts.get(sad['i']);

                        return (
                            <Card class="" style={{margin: '1px', padding: '0'}}>
                                <div class="flex flex-justify-between">
                                    <div class="flex">
                                        <div class="font-weight--medium"
                                             style={{marginLeft: '1rem', marginTop: '1.25rem'}}>
                                            {schema['title']}
                                        </div>
                                    </div>

                                </div>

                                <div>
                                    {'personLegalName' in attrs && (
                                        <div>
                                            <div style={{margin: '0 0 2rem 0'}}>
                                                <p class="p-tag-bold" style={{margin: '1rem 0 0 0'}}>
                                                    Person Legal Name:
                                                </p>
                                                <code style="margin: 0 0 0 0;">{attrs['personLegalName']}</code>
                                            </div>
                                        </div>
                                    )}
                                    {'officialRole' in attrs && (
                                        <div>
                                            <div style={{margin: '0 0 2rem 0'}}>
                                                <p class="p-tag-bold" style={{margin: '1rem 0 0 0'}}>
                                                    Official Role:
                                                </p>
                                                <code style="margin: 0 0 0 0;">{attrs['officialRole']}</code>
                                            </div>
                                        </div>
                                    )}
                                    {'engagementContextRole' in attrs && (
                                        <div>
                                            <div style={{margin: '0 0 2rem 0'}}>
                                                <p class="p-tag-bold" style={{margin: '1rem 0 0 0'}}>
                                                    Person Legal Name:
                                                </p>
                                                <code style="margin: 0 0 0 0;">{attrs['engagementContextRole']}</code>
                                            </div>
                                        </div>
                                    )}

                                    {'LEI' in attrs && (
                                        <div style={{margin: '2rem 0 2rem 0'}}>
                                            <p class="p-tag-bold" style={{margin: '1rem 0 0 0'}}>
                                                LEI:
                                            </p>
                                            <code style="margin: 0 0 0 0;">{attrs['LEI']}</code>
                                        </div>
                                    )}

                                    <div style={{margin: '2rem 0 2rem 0'}}>
                                        <p className="p-tag-bold" style={{margin: '1rem 0 0 0'}}>
                                            Issued By:
                                        </p>
                                        <code style="margin: 0 0 0 0;">{issuer.alias}</code>
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

module.exports = CredentialList;
