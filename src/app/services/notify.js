class Notify {
  static notifications = [];

  static push(notification) {
    this.notifications.push(notification);
  }

  static findByType(type) {
    let idx = this.notifications.findIndex(element => element.type === type)
    if (idx === -1) {
      return undefined;
    }

    let notif = this.notifications.splice(idx, 1)
    return notif[0];
  }
}

module.exports = Notify;
