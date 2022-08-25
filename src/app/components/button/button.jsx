import m from 'mithril';
import { MDCRipple } from '@material/ripple';

class Button {
  constructor() {
    this.mdcRipple = null;
    this.buttonClass = 'mdc-button';
    this.optionDefaults = {
      id: '',
      class: null,
      disabled: false,
      iconLeading: null,
      iconTrailing: null,
      label: '',
      onclick: null,
      outlined: false,
      raised: false,
      ripple: true,
      style: null,
      type: 'button',
    };
    this.options = null;
  }

  assignOptions(vnode) {
    this.options = Object.assign({}, this.optionDefaults, vnode.attrs);
  }

  setClass() {
    this.buttonClass = 'mdc-button';
    if (this.options.raised) {
      this.buttonClass += ' mdc-button--raised';
    }
    if (this.options.outlined) {
      this.buttonClass += ' mdc-button--outlined';
    }
    if (this.options.iconLeading) {
      this.buttonClass += ' mdc-button--icon-leading';
    }
    if (this.options.iconTrailing) {
      this.buttonClass += ' mdc-button--icon-trailing';
    }
    if (this.options.class) {
      this.buttonClass += ` ${this.options.class}`;
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
        id={this.options.id}
        type={this.options.type}
        class={this.buttonClass}
        style={this.options.style}
        disabled={this.options.disabled}
        onclick={this.options.onclick}
      >
        <div class="mdc-button__ripple"></div>
        {this.options.iconLeading && (
          <div class="mdc-button__icon">
            <span class="material-icons md-18">{this.options.iconLeading}</span>
          </div>
        )}
        <span class="mdc-button__label">{this.options.label}</span>
        {this.options.iconTrailing && (
          <div class="mdc-button__icon">
            <span class="material-icons md-18">{this.options.iconTrailing}</span>
          </div>
        )}
      </button>
    );
  }
}

module.exports = Button;
