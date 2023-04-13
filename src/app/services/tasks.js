import Profile from './profile';

class DefaultMapTask {
  _all = [];

  constructor(tasks) {
    this._all = tasks;
  }

  find(name) {
    let tasks = this._all[name];
    if (tasks !== undefined) {
      return tasks[0];
    } else {
      return undefined;
    }
  }

  get all() {
    return this._all;
  }

  get tasksList() {
    if (Profile.created === undefined) {
      return [];
    }
    if (!Profile.created) {
      return this._all['create-passcode'];
    }
    if (!Profile.isLoggedIn) {
      return this._all['login'];
    }
    if (Profile.identifiers.length === 0) {
      return this._all['create-identifier'];
    } else if (Profile.identifiers.length === 1 && 'create-multisig' in this._all) {
      return this._all['create-multisig'];
    } else {
      return this._all['main'];
    }
  }
}

class Tasks {
  static _impl = new DefaultMapTask({
    'create-passcode': [],
    'create-identifier': [],
    'main': [],
  });

  static _active = null;

  static set impl(_impl) {
    this._impl = _impl;
  }

  static get all() {
    return this._impl.all;
  }

  static get tasksList() {
    return this._impl.tasksList;
  }

  static get active() {
    return this._active;
  }

  static set active(_active) {
    this._active = _active;
  }

  static find(name) {
    return this._impl.find(name);
  }
}

module.exports = { Tasks, DefaultMapTask };
