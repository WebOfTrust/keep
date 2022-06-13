import m from 'mithril';

import { MDCRadio } from '@material/radio';

class Radio {
  constructor() {
    this.mdcInstance = null;
    this.radioClass = 'mdc-radio mdc-radio--touch';
    this.optionDefaults = {
      id: null,
      name: null,
      class: null,
      checked: false,
      onclick: null,
      disabled: false,
    };
    this.options = null;
  }

  assignOptions(vnode) {
    this.options = Object.assign({}, this.optionDefaults, vnode.attrs);
  }

  setClass() {
    this.radioClass = 'mdc-radio mdc-radio--touch';
    if (this.options.class) {
      this.radioClass += ` ${this.options.class}`;
    }
  }

  oninit(vnode) {
    this.assignOptions(vnode);
    this.setClass();
  }

  oncreate(vnode) {
    try {
      this.mdcInstance = new MDCRadio(vnode.dom);
    } catch (e) {
      console.log(e);
    }
  }

  onbeforeupdate(vnode) {
    this.assignOptions(vnode);
    this.setClass();
  }

  view(vnode) {
    return (
      <>
        <div class="mdc-touch-target-wrapper">
          <div class={this.radioClass} onclick={this.options.onclick}>
            <input
              class="mdc-radio__native-control"
              type="radio"
              id={this.options.id}
              name={this.options.name}
              checked={this.options.checked}
              disabled={this.options.disabled}
            />
            <div class="mdc-radio__background">
              <div class="mdc-radio__outer-circle"></div>
              <div class="mdc-radio__inner-circle"></div>
            </div>
            <div class="mdc-radio__ripple"></div>
          </div>
        </div>
      </>
    );
  }
}

module.exports = Radio;
