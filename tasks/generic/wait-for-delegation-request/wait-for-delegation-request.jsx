import m from 'mithril';
import {Button} from '../../../src/app/components';
import loanApproved from '../../../src/assets/img/loan-approved.svg';


class WaitForDelegationRequestTask {
    constructor(config) {
        this.config = config;
        this.reset();
    }

    reset() {
        this._label = this.config.label;
        this.next = this.config.next;
        this._component = {
            view: (vnode) => {
                return <WaitForDelegationRequest end={vnode.attrs.end}/>;
            },
        };
    }

    get imgSrc() {
        return loanApproved;
    }

    get label() {
        return this._label;
    }

    get component() {
        return this._component;
    }
}

class WaitForDelegationRequest {
    constructor(vnode) {

    }

    view(vnode) {
        return (
            <>
                <h3>Wait for Delegation Request</h3>
                <p
                    class="font-color--battleship"
                    style={{ lineHeight: '1.38', letterSpacing: '0.3px', margin: '3rem 0 4rem 0' }}
                >
                    You just completed Identity Authentication with members of a new AID for which you will be the
                    delegator.  You will receive a notification from one of the members of the new AID with a request
                    to approve their new AID with you as the delegator.
                    <br />
                    <br />
                    It is safe to close this task.
                </p>
                <div class="flex flex-justify-end">
                    <Button
                        class="button--no-transform button--big"
                        raised
                        label="Dismiss"
                        onclick={() => {
                            vnode.attrs.end();
                        }}
                    />

                </div>
            </>
        );
    }
}

module.exports = WaitForDelegationRequestTask;
