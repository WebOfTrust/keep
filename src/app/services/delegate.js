class Delegation {
  static _aids = [];
  static _ked = []
  static _delegator = '';


  static get aids() {
    return this._aids;
  }

  static get ked() {
    return this._ked;
  }

  static get delegator() {
    return this._delegator;
  }


  static set aids(value) {
    this._aids = value;
  }

  static set ked(value) {
    this._ked = value;
  }

  static set delegator(value) {
    this._delegator = value;
  }

}

module.exports = Delegation;
