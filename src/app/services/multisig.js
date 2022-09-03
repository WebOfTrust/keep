class MultiSig {
  static _currentEvent = {};
  static _participants = [];
  static _delegator = null;
  static _delegatorSigned = false;

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

  static updateParticipantLength(num) {
    if(num < this._participants.length) {
      this._participants.length = num
    } else if (num > this._participants.length) {
      let toAdd = num - this._participants.length
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
}

module.exports = MultiSig;
