import KERI from './keri';

class Contacts {
  static list = [];
  static _selected = undefined;

  static requestList() {
    return KERI.getContacts().then((contacts) => {
      this.list = contacts;
    });
  }

  static filterById(id) {
    return this.list.find((contact) => {
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

  static get selected() {
    return this._selected;
  }

  static set selected(_selected) {
    this._selected = _selected;
  }
}

module.exports = Contacts;
