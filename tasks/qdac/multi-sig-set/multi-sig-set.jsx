import m from 'mithril';
import { Button, Card, TextField } from '../../../src/app/components';

import responseMessage from '../../../src/assets/img/response-message.png';
import uploadFile from '../../../src/assets/img/upload-file.png';
import addNewContacts from '../../../src/assets/img/add-new-contacts.png';
import toDoList from '../../../src/assets/img/to-do-list.png';
import tempProfPic from '../../../src/assets/img/temp-prof-pic.jpg';
class MultiSigSet {
  tempNotiArray = [
    {
      type: 'New Verified Contact',
      displayPic: tempProfPic,
      linkText: 'View',
    },
    {
      type: '',
      displayPic: null,
      linkText: '',
    },
    {
      type: '',
      displayPic: null,
      linkText: '',
    },
    {
      type: '',
      displayPic: null,
      linkText: '',
    },
  ];

  constructor(vnode) {
    this.step = 0;
    this.steps = [
      <>
        <h3 style={{ margin: '0 0 3rem 0' }}>Notifications</h3>
        {this.tempNotiArray.map((noti) => {
          return (
            <div
              class="flex flex-justify-between divider"
              style={{ alignItems: 'center', margin: '0', height: '40px' }}
            >
              <div class="flex" style={{ alignItems: 'center', marginBottom: '-9px' }}>
                {noti.displayPic === null ? (
                  <img src={noti.displayPic} style={{ width: '28px', height: '0px', borderRadius: '50%' }} />
                ) : (
                  <img src={noti.displayPic} style={{ width: '28px', height: '28px', borderRadius: '50%' }} />
                )}

                <h5 style={{ margin: '0 0 0 1rem' }}>{noti.type}</h5>
              </div>

              <h5 style={{ color: '#3c64b1', margin: '0 0 -9px 0', alignItems: 'center' }}>
                <u
                  style={{ cursor: 'pointer' }}
                  onclick={() => {
                    this.step++;
                  }}
                >
                  {noti.linkText}
                </u>
              </h5>
            </div>
          );
        })}
        <div class="flex flex-justify-end" style={{ margin: '4rem 0 0 0' }}>
          <Button class="button--big button--no-transform" raised label="Close" onclick={vnode.attrs.end} />
        </div>
      </>,
      <>
        <img src={toDoList} style={{ width: '50%' }} />
        <h3>New Multi-Sig Set</h3>
        <p class="p-tag">View the multi-sig set and confirm that these individuals are authorized.</p>
        <div class="flex flex-justify-end" style={{ margin: '4rem 0 0 0' }}>
          <Button
            class="button--big button--no-transform"
            raised
            label="View"
            onclick={() => {
              this.step++;
            }}
          />
        </div>
      </>,
      <>
        <img src={toDoList} style={{ width: '50%' }} />
        <h3>Root AID Inception Event Completed</h3>
        <p class="p-tag">
          Thank you for confirming the Root AID Inception Event. We will notify the QVI Genesis Controller and all
          participants.
        </p>
        <div class="flex flex-justify-end" style={{ margin: '4rem 0 0 0' }}>
          <Button class="button--big button--no-transform" raised label="Close" onclick={vnode.attrs.end} />
        </div>
      </>,
    ];
  }

  view() {
    return <>{this.steps[this.step]}</>;
  }
}

module.exports = MultiSigSet;
