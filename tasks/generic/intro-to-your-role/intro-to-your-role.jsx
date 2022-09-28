import m from 'mithril';
import { Button } from '../../../src/app/components';
import approveRequest from '../../../src/assets/img/approve-request.svg';
import createIdentifier from '../../../src/assets/img/create-identifier.svg';

class IntroToYourRoleTask {
  constructor(config) {
    this.config = config;
    this.reset();
  }

  reset() {
    this._id = this.config.id;
    this._label = this.config.label;
    this._component = {
      view: (vnode) => {
        return <IntroToYourRole end={vnode.attrs.end} parent={this} variables={this.config.variables} />;
      },
    };
  }

  get imgSrc() {
    return createIdentifier;
  }

  get id() {
    return this._id;
  }

  get label() {
    return this._label;
  }

  get component() {
    return this._component;
  }
}

class IntroToYourRole {
  constructor(vnode) {
    this.step = 0;

    this.steps = [
      <>
        <h3 id="intro-header">
          {vnode.attrs.variables.main ? vnode.attrs.variables.main.title : 'Intro to your Role'}
        </h3>
        <img class="task-img task-img--centered" src={approveRequest} />
        <p class="body-text-2 font-color--battleship">
          {vnode.attrs.variables.main ? (
            vnode.attrs.variables.main.paragraph
          ) : (
            <>
              You have now created your Delegated AID! While you are waiting for your credentials, here is a brief
              introduction to some of the tasks you can complete in your role.
            </>
          )}
        </p>
        <div class="flex flex-justify-end margin-top-2">
          <Button
            id="skip"
            class="button--gray-dk margin-right-1"
            raised
            label="Skip"
            onclick={(e) => {
              vnode.attrs.end();
            }}
          />
          <Button
            id="continue"
            raised
            label="Continue"
            onclick={() => {
              this.nextOrEnd(vnode);
            }}
          />
        </div>
      </>,
    ];
    if (vnode.attrs.variables.steps) {
      vnode.attrs.variables.steps.forEach((step) => {
        this.steps.push(
          <>
            <h3 id="steps-header">{step.title}</h3>
            <img class="task-img task-img--centered" src={step.image} />
            <p class="body-text-2 font-color--battleship">{step.paragraph}</p>
            <div class="flex flex-justify-end margin-top-2">
              <Button
                id="steps-skip"
                class="button--gray-dk margin-right-1"
                raised
                label="Skip"
                onclick={(e) => {
                  vnode.attrs.end();
                }}
              />
              <Button
                id="steps-continue"
                raised
                label="Continue"
                onclick={() => {
                  this.nextOrEnd(vnode);
                }}
              />
            </div>
          </>
        );
      });
    }
  }

  nextOrEnd(vnode) {
    if (this.step + 1 >= this.steps.length) {
      vnode.attrs.end();
      return;
    }
    this.step++;
  }

  view() {
    return <>{this.steps[this.step]}</>;
  }
}

module.exports = IntroToYourRoleTask;
