import m from 'mithril';
import { Button } from '../../../src/app/components';
import approveRequest from '../../../src/assets/img/approve-request.png';

class IntroToYourRole {
  constructor(vnode) {
    this.step = 0;

    this.steps = [
      <>
        <h3>{vnode.attrs.main ? vnode.attrs.main.title : 'Intro to your Role'}</h3>
        <img src={approveRequest} style={{ display: 'block', margin: '5rem auto', width: '244px' }} />
        <p class="p-tag" style={{ margin: '0 0 7rem' }}>
          {vnode.attrs.main ? (
            vnode.attrs.main.paragraph
          ) : (
            <>
              You have now created your Delegated AID! While you are waiting for your credentials, here is a brief
              introduction to some of the tasks you can complete in your role.
            </>
          )}
        </p>
        <div class="flex flex-justify-between">
          <Button
            class="button--gray-dk button--big button--no-transform"
            raised
            label="Skip"
            onclick={(e) => {
              vnode.attrs.end(e, 'oobi');
            }}
          />
          <Button
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
    if (vnode.attrs.steps) {
      vnode.attrs.steps.forEach((step) => {
        this.steps.push(
          <>
            <h3>{step.title}</h3>
            <img src={step.image} style={{ width: '60%', margin: '4rem 0 4rem 4rem' }} />
            <p class="p-tag">{step.paragraph}</p>
            <div class="flex flex-justify-between">
              <Button
                class="button--gray-dk button--big button--no-transform"
                raised
                label="Skip"
                onclick={(e) => {
                  vnode.attrs.end(e, 'oobi');
                }}
              />
              <Button
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
      vnode.attrs.end(null, 'oobi');
      return;
    }
    this.step++;
  }

  view() {
    return <>{this.steps[this.step]}</>;
  }
}

module.exports = IntroToYourRole;
