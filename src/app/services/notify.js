import m from 'mithril';

class Notify {
  static isOpen = false;
  static notifications = [];
  static _selected = {};

  static push(notification) {
    this.notifications.push(notification);
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
    m.route.set('/dashboard');
    this.isOpen = true;
  }
}

module.exports = Notify;
