import m from 'mithril';
import { MDCTabBar } from '@material/tab-bar';

class TabBar {
  constructor() {
    this.mdcInstance = null;
    this.tabBarClass = 'mdc-tab-bar';
    this.optionDefaults = {
      class: null,
      style: null,
    };
    this.options = null;
  }

  assignOptions(vnode) {
    this.options = Object.assign({}, this.optionDefaults, vnode.attrs);
  }

  setClass() {
    this.tabBarClass = 'mdc-tab-bar';
    if (this.options.class) {
      this.tabBarClass += ` ${this.options.class}`;
    }
  }

  oninit(vnode) {
    this.assignOptions(vnode);
    this.setClass();
  }

  oncreate(vnode) {
    try {
      this.mdcInstance = new MDCTabBar(vnode.dom);
    } catch (e) {}
  }

  onbeforeupdate(vnode) {
    this.assignOptions(vnode);
    this.setClass();
  }

  view(vnode) {
    return (
      <>
        <div class={this.tabBarClass} style={{ ...this.options.style }} role="tablist">
          <div class="mdc-tab-scroller">
            <div class="mdc-tab-scroller__scroll-area">
              <div class="mdc-tab-scroller__scroll-content">{vnode.children}</div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

module.exports = TabBar;
