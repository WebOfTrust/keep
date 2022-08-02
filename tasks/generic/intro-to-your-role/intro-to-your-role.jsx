import m from 'mithril';
import { Button } from '../../../src/app/components';
import approveRequest from '../../../src/assets/img/approve-request.svg';
import createIdentifier from '../../../src/assets/img/create-identifier.svg';

class IntroToYourRoleTask {
  constructor(config) {
    this._id = config.id;
    this._label = config.label;
    this._component = {
      view: (vnode) => {
        return <IntroToYourRole end={vnode.attrs.end} parent={this} variables={config.variables} />;
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
        <img src={approveRequest} style={{ display: 'block', margin: '4rem auto', width: '244px' }} />
        <p class="p-tag">
          {vnode.attrs.variables.main ? (
            vnode.attrs.variables.main.paragraph
          ) : (
            <>
              You have now created your Delegated AID! While you are waiting for your credentials, here is a brief
              introduction to some of the tasks you can complete in your role.
            </>
          )}
        </p>
        <div class="flex flex-justify-between" style={{ marginTop: '4rem' }}>
          <Button
            id="skip"
            class="button--gray-dk button--big button--no-transform"
            raised
            label="Skip"
            onclick={(e) => {
              vnode.attrs.end();
            }}
          />
          <Button
            id="continue"
            class="button--big button--no-transform"
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
            <img src={step.image} style={{ display: 'block', width: '200px', margin: '4rem auto' }} />
            <p class="p-tag">{step.paragraph}</p>
            <div class="flex flex-justify-between" style={{ marginTop: '4rem' }}>
              <Button
                id="steps-skip"
                class="button--gray-dk button--big button--no-transform"
                raised
                label="Skip"
                onclick={(e) => {
                  vnode.attrs.end();
                }}
              />
              <Button
                id="steps-continue"
                class="button--big button--no-transform"
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
