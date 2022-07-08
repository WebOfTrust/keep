import m from 'mithril';
import { Button } from '../../../components';
import { Notify, Tasks } from '../../../services';

class Notifications {
  challengeNotificationClick() {
    m.route.set('/contacts');
  }

  multisigCompleteClick() {
    m.route.set('/profile');
  }

  multisigInitClick() {
    Tasks.active = Tasks.find('join-multisig');
  }

  multisigIssueClick(notification) {
    Notify.selected = notification;
    Tasks.active = Tasks.find('join-multisig-issue');
    m.redraw();
  }

  issueCompleteClick() {
    m.route.set('/credentials/issued');
  }

  credentialReceivedClick() {
    m.route.set('/credentials');
  }

  delegationRequestClick(notification) {
    Notify.selected = notification;
    Tasks.active = Tasks.find('approve-delegation');
    m.redraw();
  }

  getNotificationMeta(notification) {
    let meta = {
      title: '',
      clickHandler: undefined,
    };
    // Challenge
    if (notification.type === 'challenge') {
      meta.title = 'New Verified Contact';
      meta.clickHandler = this.challengeNotificationClick;
    }
    // Multisig
    if (notification.type === 'multisig') {
      let rType = notification.data.r;
      if (rType === '/icp/complete') {
        meta.title = `Multi-Sig Inception Complete`;
        meta.clickHandler = this.multisigCompleteClick;
      } else if (rType === '/ixn/complete') {
        meta.title = 'Delegated Identifier Created';
        meta.clickHandler = this.challengeNotificationClick;
      } else if (rType.includes('/init')) {
        meta.title = 'Multi-Sig Verification Request';
        meta.clickHandler = this.multisigInitClick;
      } else if (rType === '/issue') {
        meta.title = 'Credential Issuance Request';
        meta.clickHandler = this.multisigIssueClick;
      } else if (rType === '/iss/complete') {
        meta.title = 'Credential Issuance Complete';
        meta.clickHandler = this.issueCompleteClick;
      }
    }
    // Credential
    if (notification.type === 'credential') {
      let rType = notification.data.r;
      if (rType === '/credential/issue') {
        meta.title = `Credential Received`;
        meta.clickHandler = this.credentialReceivedClick;
      } else if (rType === '/iss/complete') {
        meta.title = 'Credential Issuance Complete';
        meta.clickHandler = this.issueCompleteClick;
      }
    }
    // Delegate
    if (notification.type === 'delegate') {
      let rType = notification.data.r;
      if (rType.includes('/request')) {
        meta.title = `Delegation Request`;
        meta.clickHandler = this.delegationRequestClick;
      }
    }
    return meta;
  }

  view() {
    return (
      <>
        <h3>Notifications</h3>
        {Notify.notifications.map((notification) => {
          let meta = this.getNotificationMeta(notification);
          return (
            <div
              class="pointer font-weight--bold font-color--battleship flex flex-align-center flex-justify-between"
              onclick={() => {
                Notify.isOpen = false;
                if (meta.clickHandler) {
                  meta.clickHandler(notification);
                }
              }}
            >
              <p>{meta.title}</p>
              <a>
                <u>View</u>
              </a>
            </div>
          );
        })}
        <div class="flex flex-justify-end">
          <Button
            raised
            class="button--big button--no-transform"
            style={{ marginTop: '4rem' }}
            label="Close"
            onclick={() => {
              Notify.isOpen = false;
            }}
          />
        </div>
      </>
    );
  }
}

module.exports = Notifications;
