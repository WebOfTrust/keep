import m from 'mithril';
import { MDCRipple } from '@material/ripple';

class IconButton {
  constructor() {
    this.mdcRipple = null;
    this.buttonClass = `material-icons mdc-icon-button`;
    this.optionDefaults = {
      class: null,
      disabled: false,
      icon: '',
      iconOutlined: false,
      onclick: null,
      ripple: true,
      title: null,
      style: null,
    };
    this.options = null;
  }

  assignOptions(vnode) {
    this.options = Object.assign({}, this.optionDefaults, vnode.attrs);
  }

  setClass() {
    this.buttonClass = `mdc-icon-button`;
    if (this.options.class) {
      this.buttonClass += ` ${this.options.class}`;
    }
    if (this.options.iconOutlined) {
      this.buttonClass += ' material-icons-outlined';
    } else {
      this.buttonClass += ' material-icons';
    }
  }

  oninit(vnode) {
    this.assignOptions(vnode);
    this.setClass();
  }

  oncreate(vnode) {
    if (this.options.ripple) {
      try {
        this.mdcRipple = new MDCRipple(vnode.dom);
        this.mdcRipple.unbounded = true;
      } catch (e) {}
    }
  }

  onbeforeupdate(vnode) {
    this.assignOptions(vnode);
    this.setClass();
  }

  view(vnode) {
    return (
      <button
        class={this.buttonClass}
        disabled={this.options.disabled}
        onclick={this.options.onclick}
        aria-label={this.options.title}
        title={this.options.title}
        style={this.options.style}
      >
        <div class="mdc-icon-button__ripple"></div>
        {this.options.icon}
      </button>
    );
  }
}

module.exports = IconButton;
