import m from 'mithril';
// import { MDCFormField } from '@material/form-field';
import { MDCCheckbox } from '@material/checkbox';

class Checkbox {
  constructor() {
    this.mdcInstance = null;
    this.checkboxClass = 'mdc-checkbox mdc-checkbox--touch';
    this.optionDefaults = {
      id: null,
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
    this.checkboxClass = 'mdc-checkbox mdc-checkbox--touch';
    if (this.options.class) {
      this.checkboxClass += ` ${this.options.class}`;
    }
  }

  oninit(vnode) {
    this.assignOptions(vnode);
    this.setClass();
  }

  oncreate(vnode) {
    try {
      this.mdcInstance = new MDCCheckbox(vnode.dom);
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
          <div class={this.checkboxClass} onclick={this.options.onclick}>
            <input
              type="checkbox"
              class="mdc-checkbox__native-control"
              id={this.options.id}
              checked={this.options.checked}
              disabled={this.options.disabled}
            />
            <div class="mdc-checkbox__background">
              <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                <path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59" />
              </svg>
              <div class="mdc-checkbox__mixedmark"></div>
            </div>
            <div class="mdc-checkbox__ripple"></div>
          </div>
        </div>
      </>
    );
  }
}

module.exports = Checkbox;
