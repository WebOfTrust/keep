import m from 'mithril';
import { MDCTextField } from '@material/textfield';

class TextField {
  constructor() {
    this.textfieldClass = 'mdc-text-field';
    this.optionDefaults = {
      cols: 40,
      class: null,
      disabled: false,
      filled: false,
      fluid: false,
      label: null,
      maxlength: null,
      minlength: null,
      oninput: null,
      outlined: false,
      pattern: null,
      rows: 4,
      style: null,
      textarea: false,
      // iconLeading: null,
      // iconTrailing: null,
    };
    this.options = null;
  }

  oninit(vnode) {
    this.options = Object.assign({}, this.optionDefaults, vnode.attrs);
    if (this.options.filled) {
      this.textfieldClass += ' mdc-text-field--filled';
    }
    if (this.options.outlined) {
      this.textfieldClass += ' mdc-text-field--outlined';
    }
    if (this.options.textarea) {
      this.textfieldClass += ' mdc-text-field--textarea';
    }
    if (!this.options.label) {
      this.textfieldClass += ' mdc-text-field--no-label';
    }
    if (this.options.disabled) {
      this.textfieldClass += ' mdc-text-field--disabled';
    }
    if (this.options.class) {
      this.textfieldClass += ` ${this.options.class}`;
    }
  }

  oncreate(vnode) {
    try {
      this.mdcInstance = new MDCTextField(vnode.dom);
    } catch (e) {}
  }

  view(vnode) {
    return (
      <>
        <label
          class={this.textfieldClass}
          style={{ width: this.options.fluid ? '100%' : 'auto', ...this.options.style }}
        >
          <span class="mdc-text-field__ripple"></span>
          {this.options.filled && this.options.label && !this.options.textarea && (
            <>
              <span class="mdc-floating-label">{this.options.label}</span>
            </>
          )}
          {this.options.outlined && !this.options.textarea && (
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
          {this.options.outlined && this.options.textarea && (
            <>
              <span class="mdc-notched-outline">
                <span class="mdc-notched-outline__leading"></span>
                <span class="mdc-notched-outline__trailing"></span>
              </span>
            </>
          )}
          {this.options.textarea ? (
            <span class="mdc-text-field__resizer">
              <textarea
                class="mdc-text-field__input"
                rows={this.options.rows}
                cols={this.options.cols}
                placeholder={this.options.placeholder}
                pattern={this.options.pattern}
                maxlength={this.options.maxlength}
                disabled={this.options.disabled}
                oninput={(e) => {
                  if (this.options.oninput) {
                    this.options.oninput(e);
                  }
                }}
              ></textarea>
            </span>
          ) : (
            <input
              class="mdc-text-field__input"
              type="text"
              placeholder={this.options.placeholder}
              pattern={this.options.pattern}
              minlength={this.options.minlength}
              maxlength={this.options.maxlength}
              disabled={this.options.disabled}
              oninput={(e) => {
                if (this.options.oninput) {
                  this.options.oninput(e);
                }
              }}
            />
          )}
          {this.options.filled && <span class="mdc-line-ripple"></span>}
        </label>
      </>
    );
  }
}

module.exports = TextField;
