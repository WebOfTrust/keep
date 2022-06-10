class MultiSig {
  static _currentEvent = {};
  static _participants = [];
  static _delegator = null;
  static _delegatorSigned = false;

  static get currentEvent() {
    return self._currentEvent
  }
  static get participants() {
    return self._participants
  }
  static get delegator() {
    return self._delegator
  }
  static get delegatorSigned() {
    return self._delegatorSigned
  }

  static set currentEvent(v) {
    self._currentEvent = v;
  }
  static set participants(v) {
    self._participants = v;
  }
  static set delegator(v) {
    self._delegator = v;
  }
  static set delegatorSigned(v) {
    self._delegatorSigned = v;
  }

}

module.exports = MultiSig;
