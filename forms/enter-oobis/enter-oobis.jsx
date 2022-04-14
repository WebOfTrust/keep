import m from 'mithril';
import { Button, Card, TextField } from '../../src/app/components';
import { KERI } from '../../src/app/services';

/*
 * EnterOOBIsForm
 *
 * attrs
 * identifiers - an array of agent identifiers
 * oobis - array of oobis to modify
 * oobisChange - function triggered after all oobis are resolved
 */

class EnterOOBIsForm {
  constructor(vnode) {
    this.alias = vnode.attrs.identifiers[0].name;
  }

  resolveOOBIPromise(oobi) {
    return KERI.resolveOOBI(this.alias, oobi.alias, oobi.url);
  }

  resolveAllOOBIs(vnode) {
    let promises = vnode.attrs.oobis
      .filter((oobi) => {
        return oobi.alias && oobi.url;
      })
      .map((oobi) => {
        return this.resolveOOBIPromise(oobi);
      });
    return Promise.all(promises)
      .then(() => {
        vnode.attrs.oobisChange(
          vnode.attrs.oobis.filter((oobi) => {
            return oobi.alias && oobi.url;
          })
        );
      })
      .catch((err) => {
        console.log('resolveAllOOBIs', err);
      });
  }

  view(vnode) {
    return (
      <>
        <div style={{ height: '512px', overflowY: 'auto', margin: '0 0 1rem 0', paddingRight: '1rem' }}>
          <div class="flex flex-justify-between" style={{ alignItems: 'baseline' }}>
            <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
              Enter Aliases and URLs you received on the Video Call from all participants below:
            </p>
          </div>
          {vnode.attrs.oobis.map((oobi) => {
            return (
              <Card class="card--fluid" style={{ margin: '0 0 1.5rem 0' }}>
                <div class="flex flex-align-center flex-justify-between">
                  <h5 style={{ width: '100px' }}>Alias:</h5>
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
                  <h5 style={{ width: '100px' }}>URL:</h5>
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
        <div class="flex flex-justify-between">
          <Button
            class="button--big button--no-transform"
            raised
            label="Add Another"
            onclick={() => {
              vnode.attrs.oobis.push({
                alias: '',
                url: '',
              });
            }}
          />
          <Button
            class="button--big button--no-transform"
            raised
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
