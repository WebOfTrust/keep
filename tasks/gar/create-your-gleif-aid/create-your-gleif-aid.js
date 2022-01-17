import m from 'mithril';
import { Button, Card } from '../../../src/app/components';

class CreateYourGleifAID {
  constructor() {
    this.step = 0;
    this.steps = [
      <>
        <h3>
          Welcome to your <u>GAR</u> Software
        </h3>
        <p>
          This software is designed to help you complete verification of authorized representatives on behalf of GLEIF
          and also as a storage place for all of your credentials.
          <br />
          <br />
          The first step will be to create your Delegated AID, then you will receive a short tutorial, You may skip the
          tutorial by selecting the “skip” button.
        </p>
        <div class="flex flex-justify-between">
          <Button class="button--gray button--big" raised label="Go Back" />
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
    ];
  }

  view() {
    return <>{this.steps[this.step]}</>;
  }
}

module.exports = CreateYourGleifAID;
