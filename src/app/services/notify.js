import m from 'mithril';
import KERI from "./keri";

class Notify {
  static isOpen = false;
  static notifications = [];
  static _selected = {};

  static requestList() {
    return KERI.getNotifications().then((notes) => {
      this.notifications = notes;
    });
  }

  static deleteNotification(rid) {
    return KERI.deleteNotification(rid).then(() => {
      this.requestList();
    })
  }

  static markNotificationRead(rid) {
    return KERI.putNotification(rid).then(() => {
      this.requestList();
    })
  }

  static get unread() {
    return this.notifications.filter((notification) => { return !notification.r});
  }

  static set selected(notification) {
    this._selected = notification;
  }

  static get selected() {
    return this._selected;
  }

  static findByType(type) {
    let idx = this.notifications.findIndex((element) => element.type === type);
    if (idx === -1) {
      return undefined;
    }

    let notif = this.notifications.splice(idx, 1);
    return notif[0];
  }

  static open() {
    this.requestList().then(() => {
      m.route.set('/dashboard');
      this.isOpen = true;
    })
  }
}

module.exports = Notify;
