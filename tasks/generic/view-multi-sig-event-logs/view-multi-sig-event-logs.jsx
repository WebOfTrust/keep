import m from 'mithril';
import { Button, TextField } from '../../../src/app/components';

import greenCheckMark from '../../../src/assets/img/green-check-mark.svg';
import redX from '../../../src/assets/img/red-x.svg';
import uploadFile from '../../../src/assets/img/upload-file.svg';

class EventLog {
  eventLogArray = [
    {
      logNumber: 123,
      date: '08/25/1996',
      status: true,
    },
    {
      logNumber: 124,
      date: '08/25/1996',
      status: false,
    },
    {
      logNumber: 125,
      date: '08/25/1996',
      status: true,
    },
    {
      logNumber: 126,
      date: '08/25/1996',
      status: false,
    },
    {
      logNumber: 127,
      date: '08/25/1996',
      status: false,
    },
    {
      logNumber: 128,
      date: '08/25/1996',
      status: true,
    },
    {
      logNumber: 129,
      date: '08/25/1996',
      status: true,
    },
    {
      logNumber: 130,
      date: '08/25/1996',
      status: false,
    },
    {
      logNumber: 131,
      date: '08/25/1996',
      status: true,
    },
    {
      logNumber: 132,
      date: '08/25/1996',
      status: true,
    },
  ];

  constructor(vnode) {}

  view(vnode) {
    return (
      <>
        <h3>Event Log</h3>
        <TextField
          outlined
          fluid
          iconTrailing={{ icon: 'search' }}
          placeholder="Search by date or event log number"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
            margin: '2rem 0 2rem 0',
          }}
        />
        <br></br>
        <div class="flex flex-justify-between">
          <p class="p-tag-bold" style={{ fontSize: '80%' }}>
            Event Log Number
          </p>
          <p class="p-tag-bold" style={{ fontSize: '80%', marginRight: '5.2rem' }}>
            Date
          </p>
          <p class="p-tag-bold" style={{ fontSize: '80%', marginRight: '2.8rem' }}>
            Status
          </p>
        </div>
        <div style={{ height: '350px', overflowY: 'scroll', margin: '0 0 2rem 0' }}>
          {this.eventLogArray.map((event) => {
            return (
              <div
                class="flex flex-justify-between divider"
                style={{ alignItems: 'center', margin: '0', height: '40px', width: '100%' }}
              >
                <div class="flex flex-justify-between" style={{ width: '100%' }}>
                  <p class="p-tag" style={{ fontSize: '80%' }}>
                    <u onclick={vnode.attrs.continue} style={{ cursor: 'pointer' }}>
                      Event #{event.logNumber}
                    </u>
                  </p>
                  <p class="p-tag" style={{ fontSize: '80%' }}>
                    {event.date}
                  </p>
                  <div style={{ marginRight: '1rem' }}>
                    {event.status ? (
                      <p class="p-tag" style={{ fontSize: '80%' }}>
                        Completed
                      </p>
                    ) : (
                      <p class="p-tag" style={{ fontSize: '80%', color: '#aa3737' }}>
                        Incomplete
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div class="flex flex-justify-between">
          <Button
            class="button--gray-dk button--big button--no-transform"
            raised
            label="Go Back"
            onclick={vnode.attrs.back}
          />
          <Button class="button--big button--no-transform" raised label="close" onclick={vnode.attrs.end} />
        </div>
      </>
    );
  }
}

class EventDetails {
  tempMultiSigArray = [
    {
      number: 1,
      name: 'Jane Smith',
      signed: true,
    },
    {
      number: 2,
      name: 'Michael Williams',
      signed: true,
    },
    {
      number: 3,
      name: 'ZG4jvw9bTmVd5X92iKYmfT',
      signed: true,
    },
    {
      number: 4,
      name: 'OG8jvw9bTmUd5J92iKYmfU',
      signed: true,
    },
    {
      number: 5,
      name: 'Joe Roberts',
      signed: false,
    },
    {
      number: 6,
      name: 'OG8jvw9bTmUd5J92iKYmfU',
      signed: false,
    },
    {
      number: 7,
      name: 'OG8jvw9bTmUd5J92iKYmfU',
      signed: false,
    },
    {
      number: 8,
      name: 'OG8jvw9bTmUd5J92iKYmfU',
      signed: false,
    },
  ];

  constructor(vnode) {}

  view(vnode) {
    return (
      <>
        <h3>Event #130</h3>
        <h4 class="p-tag" style={{ margin: '0 0 0 0' }}>
          Status: Multi-Sig Verification in Progress
        </h4>

        <div class="flex flex-justify-between">
          <p class="p-tag" style={{ margin: '2rem 0 1rem 4.5rem' }}>
            Name:
          </p>
          <p class="p-tag" style={{ margin: '2rem 1rem 1rem 0' }}>
            Signed?
          </p>
        </div>
        <div style={{ height: '350px', overflowY: 'scroll', margin: '0 0 1rem 0' }}>
          {this.tempMultiSigArray.map((sig) => {
            return (
              <div
                class="flex flex-justify-evenly "
                style={{ alignItems: 'center', margin: '0 0 1rem 0', width: '100%' }}
              >
                <h4 class="p-tag" style={{ margin: '0 0 0 0' }}>
                  {`#${sig.number}`}
                </h4>
                <div
                  class="flex flex-align-center"
                  style={{ width: '55%', backgroundColor: 'white', height: '40px', borderRadius: '3px' }}
                >
                  <p class="p-tag-bold" style={{ margin: '0 0 0 .5rem', fontSize: '80%' }}>
                    {sig.name}
                  </p>
                </div>

                <div style={{ margin: '0 0 0 .5rem' }}>
                  {sig.signed ? (
                    <img src={greenCheckMark} style={{ width: '80%' }} />
                  ) : (
                    <img src={redX} style={{ width: '80%' }} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div class="flex flex-justify-between">
          <Button
            class="button--gray-dk button--big button--no-transform"
            raised
            label="Go Back"
            onclick={vnode.attrs.back}
          />
          <Button class="button--big button--no-transform" raised label="Continue" onclick={vnode.attrs.continue} />
        </div>
      </>
    );
  }
}

class MultiSigVerProg {
  constructor(vnode) {}
  view(vnode) {
    return (
      <>
        <img src={uploadFile} style={{ width: '50%', margin: '4rem 0 0 0' }} />
        <h3>Multi-Signature Verification in Progress</h3>
        <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
          You will be notified when the GRACs verify that the Root AID witnesses their signature on the Root AID
          Inception Event.
        </p>
        <div class="flex flex-justify-end">
          <Button class="button--big button--no-transform" raised label="View Progress" onclick={vnode.attrs.end} />
        </div>
      </>
    );
  }
}

class ViewMultiSigEventLogs {
  constructor() {
    this.currentState = 'event-log';
  }
  view(vnode) {
    return (
      <>
        {this.currentState === 'event-log' && (
          <EventLog
            continue={() => {
              this.currentState = 'event-details';
            }}
          />
        )}
        {this.currentState === 'event-details' && (
          <EventDetails
            back={() => {
              this.currentState = 'event-log';
            }}
            continue={() => {
              this.currentState = 'multi-sig-ver';
            }}
          />
        )}
        {this.currentState === 'multi-sig-ver' && <MultiSigVerProg end={vnode.attrs.end} />}
      </>
    );
  }
}

module.exports = ViewMultiSigEventLogs;
