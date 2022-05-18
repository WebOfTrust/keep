import m from 'mithril';
import { Button, Card, IconButton, TextField } from '../../../../../src/app/components';
import { KERI, Participants } from '../../../../../src/app/services';

/*
 * EnterOOBIsForm
 *
 * attrs
 * identifiers - an array of agent identifiers
 */

class EnterOOBIsForm {
  constructor(vnode) {
    this.complete = false;
    this.alias = vnode.attrs.identifiers[0].name;
  }

  resolveOOBIPromise(oobi) {
    return KERI.resolveOOBI(this.alias, oobi.alias, oobi.url);
  }

  resolveAllOOBIs(vnode) {
    let promises = Participants.oobis
      .filter((oobi) => {
        return oobi.alias && oobi.url;
      })
      .map((oobi) => {
        oobi.status = 'started';
        return this.resolveOOBIPromise(oobi);
      });
    return Promise.all(promises)
      .then(() => {
        this.ensureOOBIsResolved(Participants.oobis).then(() => {
          Participants.oobis.filter((oobi) => {
            return oobi.alias && oobi.url;
          });
        });
      })
      .catch((err) => {
        console.log('resolveAllOOBIs', err);
      });
  }

  ensureOOBIsResolved(oobis) {
    let aliases = oobis.map((oobi) => {
      return oobi.alias;
    });

    return new Promise(function (resolve, reject) {
      setTimeout(function waitForOOBI() {
        KERI.getContactsByAliases(aliases)
          .then((contacts) => {
            let done = oobis.every((oobi) => {
              return contacts.some((contact) => {
                if (contact.alias === oobi.alias) {
                  oobi.status = 'resolved';
                  oobi.id = contact.id;
                  return true;
                }
                return false;
              });
            });
            if (done) return resolve();
            setTimeout(waitForOOBI, 700);
          })
          .catch((err) => {
            reject();
            console.log('getContacts', err);
          });
      }, 700);
    });
  }

  view(vnode) {
    return (
      <>
        <div style={{ maxHeight: '512px', overflowY: 'auto', margin: '0 0 1rem 0', paddingRight: '1rem' }}>
          <div class="flex flex-justify-between" style={{ alignItems: 'baseline' }}>
            <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
              While on the Video Call make sure to obtain {vnode.attrs.oneToOne ? `the ` : `each`} participant's{' '}
              <b>URL</b> and give them an Alias that makes sense to you:
            </p>
          </div>
          {Participants.oobis.map((oobi) => {
            return (
              <Card class="card--fluid" style={{ margin: '0 0 1.5rem 0' }}>
                <IconButton
                  class="close-icon"
                  icon="close"
                  onclick={() => {
                    Participants.oobis.splice(Participants.oobis.indexOf(oobi), 1);
                  }}
                />
                <div className="flex flex-align-center">
                  <h5 style={{ minWidth: '100px' }}>Status:</h5>
                  {oobi.status === 'none' && <p className="font-color--battleship font-weight--medium">Not Started</p>}
                  {oobi.status === 'started' && <p className="font-color--blue font-weight--medium">In Progress</p>}
                  {oobi.status === 'resolved' && <p className="font-color--green font-weight--medium">Complete!</p>}
                </div>
                <div class="flex flex-align-center flex-justify-between">
                  <h5 style={{ minWidth: '100px' }}>Alias:</h5>
                  <TextField
                    outlined
                    fluid
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)', height: '44px' }}
                    value={oobi.alias}
                    oninput={(e) => {
                      oobi.alias = e.target.value;
                    }}
                  />
                </div>
                <div class="flex flex-align-center flex-justify-between">
                  <h5 style={{ minWidth: '100px' }}>URL:</h5>
                  <TextField
                    outlined
                    fluid
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)', height: '44px' }}
                    value={oobi.url}
                    oninput={(e) => {
                      oobi.url = e.target.value;
                    }}
                  />
                </div>
              </Card>
            );
          })}
        </div>
        <div class={`flex ${vnode.attrs.oneToOne ? ' flex-justify-end' : ' flex-justify-between'}`}>
          {!vnode.attrs.oneToOne && (
            <Button
              raised
              class="button--no-transform button--gray"
              label="Add Another"
              iconLeading="add"
              onclick={() => {
                Participants.addOOBI('', '');
              }}
            />
          )}
          <Button
            raised
            class="button--no-transform"
            label="Resolve OOBIs"
            onclick={() => {
              this.resolveAllOOBIs(vnode);
            }}
          />
        </div>
      </>
    );
  }
}

module.exports = EnterOOBIsForm;
