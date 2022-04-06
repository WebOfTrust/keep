class Notify {
  static notifications = [];

  static push(notification) {
    this.notifications.push(notification);
  }
}

module.exports = Notify;
