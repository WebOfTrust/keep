import m from 'mithril';
import { MDCRipple } from '@material/ripple';

class IconButton {
  constructor() {
    this.buttonClass = `material-icons mdc-icon-button`;
    this.optionDefaults = {
      class: null,
      icon: '',
      onclick: null,
      ripple: true,
      title: null,
    };
    this.options = null;
    this.mdcRipple = null;
  }

  oninit(vnode) {
    this.options = Object.assign({}, this.optionDefaults, vnode.attrs);
    if (this.options.class) {
      this.buttonClass += ` ${this.options.class}`;
    }
  }

  oncreate(vnode) {
    if (this.options.ripple) {
      try {
        this.mdcRipple = new MDCRipple(vnode.dom);
        this.mdcRipple.unbounded = true;
      } catch (e) {}
    }
  }

  view(vnode) {
    return (
      <button
        class={this.buttonClass}
        onclick={this.options.onclick}
        aria-label={this.options.title}
        title={this.options.title}
      >
        <div class="mdc-icon-button__ripple"></div>
        {this.options.icon}
      </button>
    );
  }
}

module.exports = IconButton;
