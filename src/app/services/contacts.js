import KERI from './keri';

class Contacts {
  static list = [];

  static requestList() {
    KERI.getContacts().then((contacts) => {
      this.list = contacts;
    });
  }

  static filterById(id) {
    return this.list.filter((contact) => {
      return contact.id === id;
    });
  }

  static filterByAlias(alias) {
    return this.list.filter((contact) => {
      return contact.alias === alias;
    });
  }
}

module.exports = Contacts;
