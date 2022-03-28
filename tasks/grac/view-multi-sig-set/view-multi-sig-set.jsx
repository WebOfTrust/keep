import m from 'mithril';
import { Button, Card, TextField } from '../../../src/app/components';

import uploadFile from '../../../src/assets/img/upload-file.png';
import redX from '../../../src/assets/img/red-x.svg';
import greenCheckMark from '../../../src/assets/img/green-check-mark.svg';
import responseMessage from '../../../src/assets/img/response-message.png';

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
          placeholder="Search by date or event log number"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
            height: '3rem',
            width: '100%',
            borderRadius: '0px',
            alignItems: 'center',
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
          <Button
            class="button--big button--no-transform"
            raised
            label="View Progress"
            onclick={vnode.attrs.continue}
          />
        </div>
      </>
    );
  }
}
class AcceptingOOBIs {
  constructor(vnode) {}
  view(vnode) {
    return (
      <>
        <h3>Accept OOBIs</h3>
        <div class="flex flex-justify-between" style={{ alignItems: 'baseline' }}>
          <p class="p-tag" style={{ margin: '2rem 0 2.5rem 0' }}>
            Enter AIDs, URLs and Aliases you received on the Video Call from the Controllers below:
          </p>
        </div>
        <div style={{ height: '350px', overflowY: 'scroll' }}>
          <Card class="card--fluid" style={{ margin: '0 0 1.5rem 0', height: '200px' }}>
            <div class="flex flex-align-center flex-justify-between" style={{ flexDirection: 'column' }}>
              <div class="flex flex-align-center flex-justify-between">
                <h4>AID:</h4>
                <TextField
                  style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)', height: '2rem', width: '80%', borderRadius: '0' }}
                />
              </div>
              <div class="flex flex-align-center flex-justify-between">
                <h4>URL:</h4>
                <TextField
                  style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)', height: '2rem', width: '80%', borderRadius: '0' }}
                />
              </div>
              <div class="flex flex-align-center flex-justify-between">
                <h4>Alias:</h4>
                <TextField
                  style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)', height: '2rem', width: '80%', borderRadius: '0' }}
                />
              </div>
            </div>
          </Card>
          <Card class="card--fluid" style={{ margin: '0 0 1.5rem 0', height: '200px' }}>
            <div class="flex flex-align-center flex-justify-between" style={{ flexDirection: 'column' }}>
              <div class="flex flex-align-center flex-justify-between">
                <h4>AID:</h4>
                <TextField
                  style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)', height: '2rem', width: '80%', borderRadius: '0' }}
                />
              </div>
              <div class="flex flex-align-center flex-justify-between">
                <h4>URL:</h4>
                <TextField
                  style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)', height: '2rem', width: '80%', borderRadius: '0' }}
                />
              </div>
              <div class="flex flex-align-center flex-justify-between">
                <h4>Alias:</h4>
                <TextField
                  style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)', height: '2rem', width: '80%', borderRadius: '0' }}
                />
              </div>
            </div>
          </Card>
        </div>

        <div class="flex flex-justify-end">
          <Button class="button--big button--no-transform" raised label="Continue" onclick={vnode.attrs.continue} />
        </div>
      </>
    );
  }
}
class SecondEventLog {
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
      (
        <>
          <h3>Event Log</h3>
          <TextField
            placeholder="Search by date or event log number"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
              height: '3rem',
              width: '100%',
              borderRadius: '0px',
              alignItems: 'center',
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
                      <u>Event #{event.logNumber}</u>
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
      ),
      (
        <>
          <img src={responseMessage} style={{ width: '50%', margin: '1.5rem 0 2rem 0' }} />
          <h3>Generate Challenge Message</h3>
          <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
            The Challenge Response Message generated will be sent to all the GLEIF Controllers in the order you
            provided.
            <br />
            <br />
          </p>

          <div class="flex flex-justify-between">
            <Button
              class="button--gray-dk button--big button--no-transform"
              raised
              label="Go Back"
              onclick={vnode.attrs.back}
            />
            <Button class="button--big button--no-transform" raised label="Generate" onclick={vnode.attrs.continue} />
          </div>
        </>
      )
    );
  }
}
class CopyChallengeMessage {
  constructor(vnode) {}
  view(vnode) {
    return (
      <>
        <img src={responseMessage} style={{ width: '50%', margin: '1.5rem 0 2rem 0' }} />
        <h3>Copy Challenge Message</h3>
        <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
          Generate a message for each controller then direct message each GLEIF Controller in the video call.
          <br />
          <br />
          <strong>
            Important! Don’t use a challenge message from another session, it should be unique to this session taking
            place today with the GLEIF Controllers.
          </strong>
          <br />
          <br />
        </p>
        <TextField
          textarea
          style={{ height: '5rem', width: '100%', margin: '0 0 4rem 0', backgroundColor: 'rgba(0, 0, 0, 0.04)' }}
        />
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
class ChallengeMessageProgress {
  constructor(vnode) {}
  view(vnode) {
    return (
      <>
        <img src={uploadFile} style={{ width: '60%', margin: '1.5rem 0 2rem 0' }} />
        <h3>Challenge Message in Progress</h3>
        <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
          You will be notified when the GRACs sign and return the Challenge Message, after which you may configure the
          multi-sig set as the GLEIF Genesis Controller.
          <br />
          <br />
        </p>

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

class ViewMultiSigSet {
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
        {this.currentState === 'multi-sig-ver' && <MultiSigVerProg />}
      </>
    );
  }
}

module.exports = ViewMultiSigSet;
