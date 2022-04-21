import m from 'mithril';

class Tasks {
  static _all = {
    'create-passcode': [],
    'create-identifier': [],
    'intro-to-role': [],
    'main': [],
  };
  static _active = null;

  static get all() {
    return this._all;
  }

  static set all(_all) {
    this._all = _all;
  }

  static get active() {
    return this._active;
  }

  static set active(_active) {
    this._active = _active;
  }
}

module.exports = Tasks;
