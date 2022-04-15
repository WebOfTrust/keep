import m from 'mithril';
import { Button, Card, TextField } from '../../src/app/components';
import { KERI } from '../../src/app/services';

/*
 * EnterOOBIsForm
 *
 * attrs
 * identifiers - an array of agent identifiers
 * oobis - array of oobis to sign messages for
 */

class EnterChallengesForm {
  constructor(vnode) {
    this.alias = vnode.attrs.identifiers[0].name;
    this.signers = [];
    this.aliases = vnode.attrs.oobis.map((oobi) => {
      return oobi.alias;
    });
    KERI.getContactsByAliases(this.aliases)
      .then((contacts) => {
        this.signers = contacts.map((contact) => {
          return {
            id: contact.id,
            alias: contact.alias,
            challengeMessage: '',
            signed: false,
            confirmed: false,
          };
        });
      })
      .catch((err) => {
        console.log('getContacts', err);
      });
  }

  signChallengePromise(signer) {
    return KERI.signChallengeMessage(this.alias, signer.id, signer.challengeMessage.split(' '));
  }

  get confirmedCount() {
    return this.signers
      ? this.signers.filter((signer) => {
          return signer.confirmed;
        }).length
      : 0;
  }

  view(vnode) {
    return (
      <>
        <p>
          In progress: {this.confirmedCount}/{this.signers.length} confirmed
        </p>
        <div style={{ height: '512px', overflowY: 'auto', margin: '0 0 1rem 0', paddingRight: '1rem' }}>
          {this.signers.map((signer, index) => {
            return (
              <>
                <Card>
                  <p>{signer.alias}</p>
                  <TextField
                    outlined
                    fluid
                    textarea
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }}
                    value={signer.challengeMessage}
                    oninput={(e) => {
                      signer.challengeMessage = e.target.value;
                    }}
                  />
                  {!signer.signed ? (
                    <Button
                      class="button--big button--no-transform"
                      raised
                      label="Send"
                      onclick={() => {
                        this.signChallengePromise(signer)
                          .then(() => {
                            signer.signed = true;
                          })
                          .catch((err) => {
                            console.log('signChallengePromise', err);
                          });
                      }}
                    />
                  ) : (
                    <>
                      <label>
                        Out of Band Confirmation
                        <input
                          type="checkbox"
                          checked={signer.confirmed}
                          onchange={() => {
                            signer.confirmed = !signer.confirmed;
                          }}
                        />
                      </label>
                    </>
                  )}
                </Card>
              </>
            );
          })}
        </div>
      </>
    );
  }
}

module.exports = EnterChallengesForm;
