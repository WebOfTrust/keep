import m from 'mithril';
import { KERI } from '../../../services';
import { Button, Card } from '../../../components';
import moment from "moment";

class CredentialDetails {
  constructor() {}

  exportCredential(credential) {
    let alias = 'person';
    let said = credential['sad']['d'];

    KERI.exportCredential(alias, said).then((data) => {
      let b = new Blob([data], { type: 'application/json+cesr' });
      let a = document.createElement('a');
      a.href = window.URL.createObjectURL(b);
      a.download = 'credential.cesr';
      a.click();
    });
  }

  view(vnode) {
    let credential = vnode.attrs.credential;
    let sad = vnode.attrs.credential['sad'];
    //let sad = `{"v": "ACDC10JSON00019e_", "d": "EP7dDSPrhUmimxkdOviGcLkBZAAMAUEluFaRIZbY-J9k", "i": "EK6D48txum2hcpGMG3yEAfyeg8r1_ftgsoayUfw_XFwU", "ri": "ECqDtMFz80lvKF-1tVuT1W9CH5apjfzZcj9PehgJdZcs", "s": "EWCeT9zTxaZkaC_3-amV2JtG6oUxNA36sCC0P5MI7Buw", "a": {"d": "EixCYiVGPZrxyeNCYlmMYylSEQ_Q4670gUoroL3a9-0c", "dt": "2022-06-20T17:45:59.603338+00:00", "i": "EQmseDjLOz0SzyQ0alinF9wIRpwFwiMYIHQexAghRAAQ", "LEI": "6383001AJTYIGC8Y1X37"}, "e": {}}`
    let schema = vnode.attrs.schema.get(sad['s']);
    let attrs = sad['a'];

    let issuedBy = vnode.attrs.contacts.get(sad['i']);
    let issuedTo;
    let issuedOn;

    if (attrs !== undefined) {
      issuedTo = vnode.attrs.contacts.get(attrs['i']);
       issuedOn = attrs['dt'];
    }

    return (
      <>
        <h2>My Credentials</h2>
        <div style={{ height: '624px', overflowY: 'scroll', margin: '0 0 0 0' }}>
          <Card class="" style={{ margin: '1px', padding: '0' }}>
            <div class="flex flex-justify-between">
              <div class="flex">
                <div class="font-weight--medium" style={{ marginLeft: '1rem', marginTop: '1.25rem' }}>
                  {schema['title']}
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

              {issuedBy !== undefined (
                <div style={{ margin: '2rem 0 2rem 0' }}>
                  <p className="p-tag-bold" style={{ margin: '1rem 0 0 0' }}>
                    Issued By:
                  </p>
                  <code style="margin: 0 0 0 0;">{issuedBy.alias}</code>
                </div>
              )}

              {issuedTo !== undefined (
                  <div style={{ margin: '2rem 0 2rem 0' }}>
                    <p className="p-tag-bold" style={{ margin: '1rem 0 0 0' }}>
                      Issued To:
                    </p>
                    <code style="margin: 0 0 0 0;">{issuedTo.alias}</code>
                  </div>
              )}

              {issuedOn !== undefined (
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
            <Button
              style={{ margin: '0 1rem 0 0' }}
              class="button button--no-transform"
              raised
              label="Export"
              onclick={() => {
                this.exportCredential(credential);
              }}
            />
          </Card>
        </div>
      </>
    );
  }
}

module.exports = CredentialDetails;
