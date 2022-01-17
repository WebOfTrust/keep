import m from 'mithril';

class CreateYourGleifAID {
  constructor() {}

  view() {
    return (
      <>
        <h3>Welcome to your GAR Software</h3>
        <p>
          This software is designed to help you complete verification of authorized representatives on behalf of GLEIF
          and also as a storage place for all of your credentials.
          <br />
          The first step will be to create your Delegated AID, then you will receive a short tutorial, You may skip the
          tutorial by selecting the “skip” button.
        </p>
      </>
    );
  }
}

module.exports = CreateYourGleifAID;
