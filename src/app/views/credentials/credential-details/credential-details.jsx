import m from 'mithril';
import { KERI } from '../../../services';
import { Button, Card } from '../../../components';
import moment from "moment";

class CredentialDetails {
  constructor() {}

  exportCredential(identifiers, credential) {
    let alias = identifiers.get(credential['sad']['i']).name;
    let said = credential['sad']['d'];

    KERI.exportCredential(alias, said).then((data) => {
      let b = new Blob([data], { type: 'application/json+cesr' });
      let a = document.createElement('a');
      a.href = window.URL.createObjectURL(b);
      a.download = 'credential.cesr';
      a.click();
    });
  }

  isSelfIssued(attrs, identifiers, aid) {
    return attrs !== undefined && attrs["i"] === undefined && identifiers.has(aid);
  }

  view(vnode) {
    let credential = vnode.attrs.credential;
    let sad = vnode.attrs.credential['sad'];
    let schema = vnode.attrs.schema.get(sad['s']);
    let attrs = sad['a'];

    let issuedTo = {};
    let issuedOn = {};
    let issuedBy = {};

    // any form of self issued
    if (this.isSelfIssued(vnode.attrs, vnode.attrs.identifiers, sad['i'])) {
      issuedOn = attrs['dt'];
      issuedBy = "";
      issuedTo = "";

    } else {
      if(vnode.attrs.type === "issued") {
        if (attrs !== undefined) {
          issuedTo = vnode.attrs.contacts.get(attrs['i']).alias;
        }
      } else {
        if (attrs !== undefined) {
          issuedTo = vnode.attrs.identifiers.get(attrs['i']).name;
        }
        issuedBy = vnode.attrs.contacts.get(sad['i']).alias;
      }
    }

    return (
      <>
        <h2>My Credentials</h2>
        <div style={{ height: '624px', overflowY: 'scroll', margin: '0 0 0 0' }}>
          <Card class="" style={{ margin: '1px', padding: '0' }}>
            <div class="flex flex-justify-between">
              <div class="flex">
                <div style={{ marginLeft: '-0.5rem', marginTop: '1.25rem' }}>
                   <h3>{schema['title']}</h3>
                </div>
              </div>
            </div>

            <div>
              <div>
                <div style={{ margin: '0 0 2rem 0' }}>
                  <p className="p-tag-bold" style={{ margin: '1rem 0 0 0' }}>
                    SAID:
                  </p>
                  <code style="margin: 0 0 0 0;">{sad['d']}</code>
                </div>
              </div>

              {'personLegalName' in attrs && (
                <div>
                  <div style={{ margin: '0 0 2rem 0' }}>
                    <p class="p-tag-bold" style={{ margin: '1rem 0 0 0' }}>
                      Person Legal Name:
                    </p>
                    <code style="margin: 0 0 0 0;">{attrs['personLegalName']}</code>
                  </div>
                </div>
              )}

              {'officialRole' in attrs && (
                <div>
                  <div style={{ margin: '0 0 2rem 0' }}>
                    <p class="p-tag-bold" style={{ margin: '1rem 0 0 0' }}>
                      Official Role:
                    </p>
                    <code style="margin: 0 0 0 0;">{attrs['officialRole']}</code>
                  </div>
                </div>
              )}

              {'engagementContextRole' in attrs && (
                <div>
                  <div style={{ margin: '0 0 2rem 0' }}>
                    <p class="p-tag-bold" style={{ margin: '1rem 0 0 0' }}>
                      Person Legal Name:
                    </p>
                    <code style="margin: 0 0 0 0;">{attrs['engagementContextRole']}</code>
                  </div>
                </div>
              )}

              {'LEI' in attrs && (
                <div style={{ margin: '2rem 0 2rem 0' }}>
                  <p class="p-tag-bold" style={{ margin: '1rem 0 0 0' }}>
                    LEI:
                  </p>
                  <code style="margin: 0 0 0 0;">{attrs['LEI']}</code>
                </div>
              )}

              {issuedBy !== {} && issuedBy !== '' && (
                <div style={{ margin: '2rem 0 2rem 0' }}>
                  <p className="p-tag-bold" style={{ margin: '1rem 0 0 0' }}>
                    Issued By:
                  </p>
                  <code style="margin: 0 0 0 0;">{issuedBy}</code>
                </div>
              )}


              {this.isSelfIssued(vnode.attrs, vnode.attrs.identifiers, sad['i'])   && (
                  <div style={{ margin: '2rem 0 2rem 0' }}>
                    <p className="p-tag-bold" style={{ margin: '1rem 0 0 0' }}>
                      Issued By:
                    </p>
                    <code style="margin: 0 0 0 0;">You ({sad['i']})</code>
                  </div>
              )}

              {issuedTo !== undefined && issuedTo !== '' && (
                  <div style={{ margin: '2rem 0 2rem 0' }}>
                    <p className="p-tag-bold" style={{ margin: '1rem 0 0 0' }}>
                      Issued To:
                    </p>
                    <code style="margin: 0 0 0 0;">{issuedTo}</code>
                  </div>
              )}

              {issuedOn !== undefined && (
                  <div style={{ margin: '2rem 0 2rem 0' }}>
                    <p className="p-tag-bold" style={{ margin: '1rem 0 0 0' }}>
                      Issued On:
                    </p>
                    <code style="margin: 0 0 0 0;">{moment(issuedOn).format('MMM DD h:mm A')}</code>
                  </div>
              )}
            {/* TODO - FIX FOR XBRL SIGNING (
                <div style={{ margin: '2rem 0 2rem 0' }}>
                  <p className="p-tag-bold" style={{ margin: '1rem 0 0 0' }}>
                    Data Attestation on Report:
                  </p>
                  <code style="margin: 0 0 0 0;">{attrs['rd']}</code>
                </div>
              )*/}
            </div>
            {
              this.isSelfIssued(vnode.attrs, vnode.attrs.identifiers, sad['i']) && (
                    <Button
                        style={{ margin: '0 1rem 0 0' }}
                        class="button button--no-transform"
                        raised
                        label="Export"
                        onclick={() => {
                          this.exportCredential(vnode.attrs.identifiers, credential);
                        }}
                    />
                )
            }
          </Card>
        </div>
      </>
    );
  }
}

module.exports = CredentialDetails;
