import m, { vnode } from 'mithril';
import { Button, Card, CarouselControls, TextField } from '../../../../../src/app/components';
import { KERI, Profile } from '../../../../../src/app/services';

class EnterOOBIsForm {
  constructor(vnode) {
    this.complete = false;
    this.selectedOobiIndex = 0;
  }

  resolveOOBIPromise(oobi) {
    return KERI.resolveOOBI(oobi.alias, oobi.url);
  }

  resolveAllOOBIs(vnode) {
    let promises = vnode.attrs.participants.oobis
      .filter((oobi) => {
        return oobi.alias && oobi.url;
      })
      .map((oobi) => {
        oobi.status = 'started';
        return this.resolveOOBIPromise(oobi);
      });
    return Promise.all(promises)
      .then(() => {
        this.ensureOOBIsResolved(vnode.attrs.participants.oobis).then(() => {
          vnode.attrs.participants.oobis.filter((oobi) => {
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

  parseAIDFromUrl(url) {
    let indexStart = url.indexOf('/oobi/') + 6;
    let indexEnd = url.indexOf('/witness/');
    if (indexStart > -1 && indexEnd > -1) {
      return url.substring(indexStart, indexEnd);
    }
    return null;
  }

  view(vnode) {
    return (
      <>
        <Card class="card--fluid" style={{ margin: '0 0 1.5rem 0' }}>
          <p>Paste URL from Video Call Chat</p>
          <TextField
            textarea
            outlined
            fluid
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }}
            value={vnode.attrs.participants.oobis[this.selectedOobiIndex].url}
            oninput={(e) => {
              vnode.attrs.participants.oobis[this.selectedOobiIndex].url = e.target.value;
            }}
          />
          <p>AID:</p>
          <p style={{ wordBreak: 'break-all' }}>
            {this.parseAIDFromUrl(vnode.attrs.participants.oobis[this.selectedOobiIndex].url)}
          </p>
          <p>Assign Alias:</p>
          <TextField
            outlined
            fluid
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)', height: '44px' }}
            value={vnode.attrs.participants.oobis[this.selectedOobiIndex].alias}
            oninput={(e) => {
              vnode.attrs.participants.oobis[this.selectedOobiIndex].alias = e.target.value;
            }}
          />
          <div class="flex flex-align-center flex-justify-end margin-top-1">
            <div class="margin-right-1">
              {vnode.attrs.participants.oobis[this.selectedOobiIndex].status === 'started' && (
                <p className="font-color--blue font-weight--medium">In Progress</p>
              )}
              {vnode.attrs.participants.oobis[this.selectedOobiIndex].status === 'resolved' && (
                <p className="font-color--green font-weight--medium">Complete!</p>
              )}
            </div>
            {/* <Button raised class="button--no-transform" label="Verify OOBI" /> */}
          </div>
        </Card>
        <CarouselControls
          items={vnode.attrs.participants.oobis.length}
          active={this.selectedOobiIndex}
          setActive={(idx) => {
            this.selectedOobiIndex = idx;
          }}
        />
        <div class={`flex flex-justify-end`}>
          <Button
            raised
            class="button--no-transform"
            label="Verify All"
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
