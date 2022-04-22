class Participants {
  static oobis = [
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

  static words = [];

  static updateWords(words) {
    this.words.length = 0;
    this.words.push(...words);
  }

  static addOOBI(alias, url) {
    this.oobis.push({
      alias: alias,
      url: url,
      status: 'none',
      challengeMessage: '',
      signed: false,
      confirmed: false,
    });
  }

  static oobisResolved() {
    return (
      this.oobis.length > 0 &&
      this.oobis.every((oobi) => {
        return oobi.status === 'resolved';
      })
    );
  }

  static oobisVerified() {
    return (
      this.oobis.length > 0 &&
      this.oobis.every((oobi) => {
        return oobi.verified;
      })
    );
  }

  static oobisConfirmed() {
    return (
      this.oobis.length > 0 &&
      this.oobis.every((oobi) => {
        return oobi.confirmed;
      })
    );
  }
}

module.exports = Participants;
