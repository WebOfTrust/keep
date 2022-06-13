import KERI from './keri';

class Contacts {
  static list = [];

  static requestList() {
    return KERI.getContacts().then((contacts) => {
      this.list = contacts;
    });
  }

  static filterById(id) {
    return this.list.filter((contact) => {
      return contact.id === id;
    });
  }

  static filterByIds(ids) {
    return this.list.some((a) => {
      return ids.indexOf(a) >= 0;
    });
  }

  static filterByAlias(alias) {
    return this.list.filter((contact) => {
      return contact.alias === alias;
    });
  }
}

  module.exports = Contacts;
