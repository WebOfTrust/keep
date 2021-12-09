import m from 'mithril';
import { MDCTextField } from '@material/textfield';
import { UUID } from '../../services';

class TextField {
  constructor() {
    this.randomId = 'u' + UUID.uuidv4().substring(0, 8);
    this.textfieldClass = 'mdc-text-field';
    this.optionDefaults = {
      filled: false,
      outlined: false,
      textarea: false,
      rows: 4,
      cols: 40,
      class: null,
      style: null,
      label: null,
      pattern: null,
      // iconLeading: null,
      // iconTrailing: null,
      disabled: false,
      oninput: null,
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

  oncreate() {
    try {
      this.mdcInstance = new MDCTextField(document.getElementById(this.randomId));
    } catch (e) {}
  }

  view(vnode) {
    return (
      <>
        <label id={this.randomId} class={this.textfieldClass} style={this.options.style}>
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
