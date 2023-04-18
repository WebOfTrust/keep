import m from 'mithril';
import { Checkbox } from '../../../components';
import { Notify, Delegation, MultiSig, Profile } from '../../../services';
import { Tasks } from '../../../services/tasks';

class Notifications {
  challengeNotificationClick() {
    m.route.set('/contacts');
  }

  multisigCompleteClick() {
    m.route.set('/profile');
  }

  multisigInitClick(notification) {
    let task = Tasks.find('join-multisig');
    task.notification = notification;
    Tasks.active = task;
  }

  rotationCompleteClick(notification) {
    let task = Tasks.find('view-event-logs');
    Tasks.active = task;
  }

  joinManualKeyRotation(notification) {
    MultiSig.rotation = notification.a;
    Tasks.active = Tasks.find('join-multisig-rotation');
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
    Delegation.aids = notification.a.aids;
    Delegation.ked = notification.a.ked;
    Delegation.delegator = Profile.filterIdentifiersById(notification.a.delpre);
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
    let rType = notification.a.r;
    if (rType === '/multisig/icp/complete') {
      meta.title = `Multi-Sig Inception Complete`;
      meta.clickHandler = this.multisigCompleteClick;
    } else if (rType === '/multisig/ixn/complete') {
      meta.title = 'Delegated Identifier Created';
      meta.clickHandler = this.challengeNotificationClick;
    } else if (rType === '/multisig/rot') {
      meta.title = 'Multi-Sig Rotation Signed';
      meta.clickHandler = this.joinManualKeyRotation;
    } else if (rType === '/multisig/rot/complete') {
      meta.title = 'Multi-Sig Rotation Complete';
      meta.clickHandler = this.rotationCompleteClick;
    } else if (rType.includes('/init')) {
      meta.title = 'Multi-Sig Verification Request';
      meta.clickHandler = this.multisigInitClick;
    } else if (rType === '/multisig/issue') {
      meta.title = 'Credential Issuance Request';
      meta.clickHandler = this.multisigIssueClick;
    } else if (rType === '/multisig/iss/complete') {
      meta.title = 'Credential Issuance Complete';
      meta.clickHandler = this.issueCompleteClick;
    } else if (rType === '/delegate/request') {
      meta.title = `Delegation Request`;
      meta.clickHandler = this.delegationRequestClick;
    }

    // Credential
    if (rType === '/credential/issue') {
      meta.title = `Credential Received`;
      meta.clickHandler = this.credentialReceivedClick;
    } else if (rType === '/iss/complete') {
      meta.title = 'Credential Issuance Complete';
      meta.clickHandler = this.issueCompleteClick;
    }

    // Contacts
    if (rType === '/oobi') {
      meta.title = `New Shared Contact`;
      meta.clickHandler = () => {
        m.route.set('/contacts');
      };
    }
    return meta;
  }

  selectedNotifications() {
    let found = Notify.notifications.find((notification) => {
      return notification.selected;
    });

    return found !== undefined;
  }

  view() {
    return (
      <>
        <div class="flex flex-row flex-align-left flex-justify-between" style={{ paddingTop: '2rem ' }}>
          <h3>Notifications</h3>
          {this.selectedNotifications() && (
            <a
              style={{ paddingTop: '1rem ' }}
              onclick={() => {
                Notify.notifications.forEach((notification) => {
                  if (notification.selected) {
                    Notify.deleteNotification(notification.i);
                  }
                });
              }}
            >
              Delete
            </a>
          )}
        </div>
        {Notify.notifications.map((notification) => {
          let meta = this.getNotificationMeta(notification);
          let bg = notification.selected ? '#c2dbff' : notification.r ? '#d5dbe1' : '#f7f9fa';
          let weight = notification.r ? 'normal' : 'bold';
          return (
            <div
              class="font-weight--bold font-color--battleship flex flex-align-left"
              style={{ backgroundColor: bg, borderBottom: '1px solid #aaaaaa', fontWeight: weight, color: '#666666' }}
            >
              <Checkbox
                checked={notification.selected}
                onclick={() => {
                  notification.selected = !notification.selected;
                  m.redraw();
                }}
              />
              <p
                class="pointer"
                onclick={() => {
                  Notify.isOpen = false;
                  Notify.markNotificationRead(notification.i);
                  if (meta.clickHandler) {
                    meta.clickHandler(notification);
                  }
                }}
              >
                {meta.title}
              </p>
            </div>
          );
        })}

        {Notify.notifications.length === 0 && (
          <div className="font-weight--bold font-color--battleship flex flex-align-left">
            <i style={{ marginLeft: '0.5rem' }}>No notifications</i>
          </div>
        )}
      </>
    );
  }
}

module.exports = Notifications;
