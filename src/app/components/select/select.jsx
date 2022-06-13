import m from 'mithril';
import { MDCSelect } from '@material/select';

class Select {
  constructor() {
    this.mdcInstance = null;
    this.selectClass = 'mdc-select';
    this.optionDefaults = {
      class: null,
      disabled: false,
      filled: false,
      fluid: false,
      // iconLeading: null,
      // iconTrailing: null,
      label: null,
      // maxlength: null,
      // minlength: null,
      onchange: null,
      outlined: false,
      // pattern: null,
      // placeholder: '',
      style: null,
      // textarea: false,
      // type: 'text',
      options: [],
      value: null,
    };
    this.options = null;
    this.optionsChanged = false;
  }

  assignOptions(vnode) {
    this.options = Object.assign({}, this.optionDefaults, vnode.attrs);
  }

  setClass() {
    this.selectClass = 'mdc-select';
    if (this.options.filled) {
      this.selectClass += ' mdc-select--filled';
    }
    if (this.options.outlined) {
      this.selectClass += ' mdc-select--outlined';
    }
    if (!this.options.label) {
      this.selectClass += ' mdc-select--no-label';
    }
    if (this.options.disabled) {
      this.selectClass += ' mdc-select--disabled';
    }
    // if (this.options.iconLeading) {
    //   this.selectClass += ' mdc-select--with-leading-icon';
    // }
    // if (this.options.iconTrailing) {
    //   this.selectClass += ' mdc-select--with-trailing-icon';
    // }
    if (this.options.class) {
      this.selectClass += ` ${this.options.class}`;
    }
  }

  oninit(vnode) {
    this.assignOptions(vnode);
    this.setClass();
  }

  oncreate(vnode) {
    try {
      this.mdcInstance = new MDCSelect(vnode.dom);
      // Set initial value if passed in attrs
      if (this.options.value) {
        this.mdcInstance.value = this.options.value;
      }
      // Set up value change listener
      this.mdcInstance.listen('MDCSelect:change', () => {
        this.options.onchange(this.mdcInstance.value);
        m.redraw();
      });
    } catch (e) {
      console.log(e);
    }
  }

  onbeforeupdate(vnode) {
    if (vnode.attrs.options && vnode.attrs.options !== this.options.options) {
      this.optionsChanged = true;
    }
    this.assignOptions(vnode);
    this.setClass();
  }

  onupdate(vnode) {
    if (this.mdcInstance && this.optionsChanged) {
      console.log('destroying');
      this.mdcInstance.destroy();
      this.mdcInstance = new MDCSelect(vnode.dom);
    }
    this.optionsChanged = false;
  }

  view(vnode) {
    return (
      <>
        <div class={this.selectClass} style={{ width: this.options.fluid ? '100%' : 'auto', ...this.options.style }}>
          <div class="mdc-select__anchor" role="button">
            {this.options.filled && <span class="mdc-select__ripple"></span>}
            {this.options.filled && this.options.label && (
              <>
                <span class="mdc-floating-label">{this.options.label}</span>
              </>
            )}
            <span class="mdc-select__selected-text-container">
              <span class="mdc-select__selected-text"></span>
            </span>
            {this.options.outlined && (
              <>
                <span class="mdc-notched-outline">
                  <span class="mdc-notched-outline__leading"></span>
                  {this.options.label && (
                    <span class="mdc-notched-outline__notch">
                      <span class="mdc-floating-label">{this.options.label}</span>
                    </span>
                  )}
                  <span class="mdc-notched-outline__trailing"></span>
                </span>
              </>
            )}
            <span class="mdc-select__dropdown-icon">
              <svg class="mdc-select__dropdown-icon-graphic" viewBox="7 10 10 5" focusable="false">
                <polygon
                  class="mdc-select__dropdown-icon-inactive"
                  stroke="none"
                  fill-rule="evenodd"
                  points="7 10 12 15 17 10"
                ></polygon>
                <polygon
                  class="mdc-select__dropdown-icon-active"
                  stroke="none"
                  fill-rule="evenodd"
                  points="7 15 12 10 17 15"
                ></polygon>
              </svg>
            </span>
            {this.options.filled && <span class="mdc-line-ripple"></span>}
          </div>
          {this.options.options && (
            <div class="mdc-select__menu mdc-menu mdc-menu-surface mdc-menu-surface--fullwidth">
              <ul class="mdc-deprecated-list" role="listbox">
                {this.options.options.map((option) => {
                  return (
                    <>
                      <li class="mdc-deprecated-list-item" data-value={option.value} role="option">
                        <span class="mdc-deprecated-list-item__ripple"></span>
                        <span class="mdc-deprecated-list-item__text">{option.label}</span>
                      </li>
                    </>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </>
    );
  }
}

module.exports = Select;
