import m from 'mithril';
import { MDCTab } from '@material/tab';

class Tab {
  constructor() {
    this.mdcInstance = null;
    this.tabClass = 'mdc-tab';
    this.optionDefaults = {
      active: false,
      class: null,
      onclick: null,
      label: '',
      icon: null,
      style: null,
    };
    this.options = null;
  }

  assignOptions(vnode) {
    this.options = Object.assign({}, this.optionDefaults, vnode.attrs);
  }

  setClass() {
    this.tabClass = 'mdc-tab';
    if (this.options.active) {
      this.tabClass += ` mdc-tab--active`;
    }
    if (this.options.class) {
      this.tabClass += ` ${this.options.class}`;
    }
  }

  oninit(vnode) {
    this.assignOptions(vnode);
    this.setClass();
  }

  oncreate(vnode) {
    try {
      this.mdcInstance = new MDCTab(vnode.dom);
    } catch (e) {}
  }

  onbeforeupdate(vnode) {
    this.assignOptions(vnode);
    this.setClass();
  }

  view(vnode) {
    return (
      <>
        <button
          class={this.tabClass}
          style={{ ...this.options.style }}
          role="tab"
          aria-selected={this.options.active ? 'true' : 'false'}
          tabindex="0"
          onclick={this.options.onclick}
        >
          <span class="mdc-tab__content">
            {this.options.icon && (
              <span class="mdc-tab__icon material-icons" aria-hidden="true">
                {this.options.icon}
              </span>
            )}
            <span class="mdc-tab__text-label">{this.options.label}</span>
          </span>
          <span class={'mdc-tab-indicator' + (this.options.active ? ' mdc-tab-indicator--active' : '')}>
            <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
          </span>
          <span class="mdc-tab__ripple"></span>
        </button>
      </>
    );
  }
}

module.exports = Tab;
