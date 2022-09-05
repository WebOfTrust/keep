import m from 'mithril';
import { Checkbox} from '../../../components';
import { Notify} from '../../../services';
import {Tasks} from '../../../services/tasks';

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
    Tasks.active = task
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
    let rType = notification.a.r;
    if (rType === '/multisig/icp/complete') {
      meta.title = `Multi-Sig Inception Complete`;
      meta.clickHandler = this.multisigCompleteClick;
    } else if (rType === '/multisig/ixn/complete') {
      meta.title = 'Delegated Identifier Created';
      meta.clickHandler = this.challengeNotificationClick;
    } else if (rType.includes('/init')) {
      meta.title = 'Multi-Sig Verification Request';
      meta.clickHandler = this.multisigInitClick;
    } else if (rType === '/multisig/issue') {
      meta.title = 'Credential Issuance Request';
      meta.clickHandler = this.multisigIssueClick;
    } else if (rType === '/multisig/iss/complete') {
      meta.title = 'Credential Issuance Complete';
      meta.clickHandler = this.issueCompleteClick;
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

  selectedNotifications() {
    let found = Notify.notifications.find(notification => {
      return notification.selected
    })

    return found !== undefined;
  }

  view() {
    return (
      <>
        <div class="flex flex-row flex-align-left flex-justify-between">
          <h3>Notifications</h3>
          {this.selectedNotifications() &&
              <a style={{paddingTop: "1rem "}} onclick={() => {
                Notify.notifications.forEach((notification) => {
                  Notify.deleteNotification(notification.i);
                })
              }}>Delete</a>
          }
        </div>
        {Notify.notifications.map((notification) => {
          let meta = this.getNotificationMeta(notification);
          let bg = notification.selected ? "#c2dbff" : notification.r ? "#d5dbe1" : "#f7f9fa";
          let weight = notification.r ? "normal" : "bold";
          return (
            <div
              class="font-weight--bold font-color--battleship flex flex-align-left"
              style={{ backgroundColor: bg, borderBottom: "1px solid #aaaaaa", fontWeight: weight, color: "#666666" }}
            >
              <Checkbox
                checked={notification.selected}
                onclick={() => {
                  notification.selected = !notification.selected;
                  m.redraw()
                }}
              />
              <p class="pointer" onclick={() => {
                Notify.isOpen = false;
                Notify.markNotificationRead(notification.i);
                if (meta.clickHandler) {
                  meta.clickHandler(notification);
                }
              }}
              >{meta.title}</p>
            </div>
          );
        })}

        {Notify.notifications.length === 0 &&
            <div
                className="font-weight--bold font-color--battleship flex flex-align-left"

            >
              <i style={{marginLeft: "0.5rem"}}>No notifications</i>
            </div>
        }
      </>
    );
  }
}

module.exports = Notifications;
