class Participants {
  static instances = [];

  constructor() {
    this.oobis = [
      {
        alias: '',
        url: '',
        status: 'none',
        challengeMessage: '',
        verified: false,
        sent: false,
        confirmed: false,
      },
    ];
    this.words = [];
    Participants.instances.push(this);
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
