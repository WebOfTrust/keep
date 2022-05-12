class Tasks {
  static _all = {
    'create-passcode': [],
    'create-identifier': [],
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

  static find(name) {
    let tasks = this._all[name];
    if (tasks !== undefined) {
      return tasks[0];
    } else {
      return undefined;
    }
  }
}

module.exports = Tasks;
