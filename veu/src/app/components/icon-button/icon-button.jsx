import m from 'mithril';
import { MDCRipple } from '@material/ripple';
import { UUID } from '../../services';

class IconButton {
  constructor() {
    this.randomId = 'u' + UUID.uuidv4().substring(0, 8);
    this.buttonClass = `material-icons mdc-icon-button`;
    this.optionDefaults = {
      icon: '',
      ariaLabel: '',
      ripple: true,
      onclick: null,
    };
    this.options = null;
    this.mdcRipple = null;
  }

  oninit(vnode) {
    this.options = Object.assign({}, this.optionDefaults, vnode.attrs);
  }

  oncreate(vnode) {
    if (this.options.ripple) {
      try {
        this.mdcRipple = new MDCRipple(document.getElementById(this.randomId));
        this.mdcRipple.unbounded = true;
      } catch (e) {}
    }
  }

  view(vnode) {
    return (
      <button
        id={this.randomId}
        class={this.buttonClass}
        onclick={this.options.onclick}
        aria-label={this.options.ariaLabel}
      >
        <div class="mdc-icon-button__ripple"></div>
        {this.options.icon}
      </button>
    );
  }
}

module.exports = IconButton;
