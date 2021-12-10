import m from 'mithril';
import { MDCRipple } from '@material/ripple';
import { UUID } from '../../services';

class Button {
  constructor() {
    this.randomId = 'u' + UUID.uuidv4().substring(0, 8);
    this.buttonClass = `mdc-button`;
    this.optionDefaults = {
      outlined: false,
      raised: false,
      ripple: true,
      class: null,
      style: null,
      label: '',
      iconLeading: null,
      iconTrailing: null,
      disabled: false,
      onclick: null,
    };
    this.options = null;
    this.mdcRipple = null;
  }

  oninit(vnode) {
    this.update(vnode);
  }

  oncreate(vnode) {
    if (this.options.ripple) {
      try {
        this.mdcRipple = new MDCRipple(document.getElementById(this.randomId));
      } catch (e) {}
    }
  }

  onupdate(vnode) {
    this.update(vnode);
  }

  update(vnode) {
    this.options = Object.assign({}, this.optionDefaults, vnode.attrs);
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

  view(vnode) {
    return (
      <button
        id={this.randomId}
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
