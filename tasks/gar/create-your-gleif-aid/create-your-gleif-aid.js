import m from 'mithril';
import { Button, Card } from '../../../src/app/components';
import createIdentifier from '../../../src/assets/img/create-identifier.png'
class CreateYourGleifAID {
  constructor() {
    this.step = 0;

    this.steps = [
      <>
        <h3>
          Welcome to your <u>GAR</u> Software
        </h3>
        <img src={createIdentifier}
          style={{ width: '70%', margin: '4rem 0 0 2rem' }}
        />
        <p class='font-color--battleship'
          style={{ letterSpacing: '.15px', lineHeight: '1.38', marginTop: '4rem', marginBottom: '4rem' }}
        >
          This software is designed to help you complete verification of authorized representatives on behalf of GLEIF
          and also as a storage place for all of your credentials.
          <br />
          <br />
          The first step will be to create your Delegated AID, then you will receive a short tutorial, You may skip the
          tutorial by selecting the “skip” button.
        </p>
        <div class="flex flex-justify-between">
          <Button class="button--gray button--big" raised label="Skip" />
          <Button
            class="button--big"
            raised
            label="Continue"
            onclick={() => {
              this.steps++;
            }}
          />
        </div>
      </>,
      <>
        <h3>
          Creating your <u>AID</u>
        </h3>
        <img src={createIdentifier}
          style={{ width: '70%', margin: '4rem 0 0 2rem' }}
        />
        <p class='font-color--battleship'
          style={{ letterSpacing: '.15px', lineHeight: '1.38', marginTop: '4rem', marginBottom: '4rem' }}
        >
          In order to provide authorization, you will first have to create your own GLEIF Delegated AID within the software and GLEIF will verify you as an authorized representative (GAR) to act on their behalf.


          <br />
          <br />

        </p>
        <div class="flex flex-justify-between">
          <Button class="button--gray button--big" raised label="Skip" />
          <Button
            class="button--big"
            raised
            label="Continue"
            onclick={() => {
              this.step++;

            }}
          />
        </div>
      </>

    ];
    console.log(this.steps, this.step)
  }


  view() {
    return <>{this.steps[this.step]}</>;
  }
}

module.exports = CreateYourGleifAID;
