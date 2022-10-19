class MultiSig {
  static _currentEvent = {};
  static _participants = [];
  static _delegator = null;
  static _delegatorSigned = false;
  static _fractionallyWeighted = false;
  static _rotation = {};

  static get currentEvent() {
    return this._currentEvent;
  }
  static get participants() {
    return this._participants;
  }
  static get delegator() {
    return this._delegator;
  }
  static get delegatorSigned() {
    return this._delegatorSigned;
  }

  static set currentEvent(v) {
    this._currentEvent = v;
  }
  static set participants(v) {
    this._participants = v;
  }
  static set delegator(v) {
    this._delegator = v;
  }
  static set delegatorSigned(v) {
    this._delegatorSigned = v;
  }

  static get fractionallyWeighted() {
    return this._fractionallyWeighted;
  }

  static set fractionallyWeighted(value) {
    this._fractionallyWeighted = value;
  }

  static get rotation() {
    return this._rotation;
  }

  static set rotation(value) {
    this._rotation = value;
    console.log(this._rotation);
    this.fractionallyWeighted = Array.isArray(this._rotation.isith);
  }

  static updateParticipantLength(num) {
    if (num < this._participants.length) {
      this._participants.length = num;
    } else if (num > this._participants.length) {
      let toAdd = num - this._participants.length;
      for (let i = 0; i < toAdd; i++) {
        this._participants.push({
          id: '',
          alias: '',
          weight: '',
          signed: false,
        });
      }
    }
  }

  static validThreshold(s) {
    if (s === '') {
      return false;
    }

    let t = Number(s);
    if (!isNaN(t)) {
      return true;
    }

    let p = s.split('/');
    if (p.length !== 2) {
      return false;
    }

    let num = Number(p[0]);
    let dem = Number(p[1]);

    return !isNaN(num) && !isNaN(dem) && 0 < num < dem && dem > 0;
  }
}

module.exports = MultiSig;
