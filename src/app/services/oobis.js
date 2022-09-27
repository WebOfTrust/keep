class Participants {
  static instance = undefined;

  constructor(count = 1) {
    this.oobis = [];
    for (let i = 0; i < count; i++) {
      this.addOOBI('', '');
    }
    this.words = [];
    Participants.instance = this;
  }

  get length() {
    return this.oobis.length
  }

  updateWords(words) {
    this.words.length = 0;
    this.words.push(...words);
  }

  addOOBI(alias, url) {
    this.oobis.push({
      alias: alias,
      url: url,
      status: 'none',
      challengeMessage: '',
      signed: false,
      confirmed: false,
    });
  }

  oobisResolved() {
    return (
      this.oobis.length > 0 &&
      this.oobis.every((oobi) => {
        return oobi.status === 'resolved';
      })
    );
  }

  oobisVerified() {
    return (
      this.oobis.length > 0 &&
      this.oobis.every((oobi) => {
        return oobi.verified;
      })
    );
  }

  oobisConfirmed() {
    return (
      this.oobis.length > 0 &&
      this.oobis.every((oobi) => {
        return oobi.confirmed;
      })
    );
  }
}

module.exports = Participants;
