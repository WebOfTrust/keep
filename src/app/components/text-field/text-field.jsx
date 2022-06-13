import m from 'mithril';
import { MDCTextField } from '@material/textfield';

class TextField {
  constructor() {
    this.mdcInstance = null;
    this.textfieldClass = 'mdc-text-field';
    this.optionDefaults = {
      cols: 40,
      class: null,
      disabled: false,
      filled: false,
      fluid: false,
      iconLeading: null,
      iconTrailing: null,
      label: null,
      maxlength: null,
      minlength: null,
      oninput: null,
      outlined: false,
      pattern: null,
      placeholder: '',
      rows: 4,
      style: null,
      textarea: false,
      type: 'text',
      value: '',
    };
    this.options = null;
  }

  assignOptions(vnode) {
    this.options = Object.assign({}, this.optionDefaults, vnode.attrs);
  }

  setClass() {
    this.textfieldClass = 'mdc-text-field';
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
    if (this.options.iconLeading) {
      this.textfieldClass += ' mdc-text-field--with-leading-icon';
    }
    if (this.options.iconTrailing) {
      this.textfieldClass += ' mdc-text-field--with-trailing-icon';
    }
    if (this.options.class) {
      this.textfieldClass += ` ${this.options.class}`;
    }
  }

  oninit(vnode) {
    this.assignOptions(vnode);
    this.setClass();
  }

  oncreate(vnode) {
    try {
      this.mdcInstance = new MDCTextField(vnode.dom);
    } catch (e) {}
  }

  onbeforeupdate(vnode) {
    this.assignOptions(vnode);
    this.setClass();
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
          {this.options.iconLeading && (
            <i
              class="material-icons mdc-text-field__icon mdc-text-field__icon--leading"
              tabindex={this.options.iconLeading.onclick ? '0' : null}
              role={this.options.iconLeading.onclick ? 'button' : null}
              onclick={this.options.iconLeading.onclick}
            >
              {this.options.iconLeading.icon}
            </i>
          )}
          {this.options.textarea ? (
            <span class="mdc-text-field__resizer">
              <textarea
                class="mdc-text-field__input"
                rows={this.options.rows}
                cols={this.options.cols}
                pattern={this.options.pattern}
                minlength={this.options.minlength}
                maxlength={this.options.maxlength}
                disabled={this.options.disabled}
                placeholder={this.options.placeholder}
                oninput={(e) => {
                  if (this.options.oninput) {
                    this.options.oninput(e);
                  }
                }}
              >
                {this.options.value}
              </textarea>
            </span>
          ) : (
            <input
              class="mdc-text-field__input"
              type={this.options.type}
              pattern={this.options.pattern}
              minlength={this.options.minlength}
              maxlength={this.options.maxlength}
              placeholder={this.options.placeholder}
              disabled={this.options.disabled}
              value={this.options.value}
              oninput={(e) => {
                if (this.options.oninput) {
                  this.options.oninput(e);
                }
              }}
            />
          )}
          {this.options.iconTrailing && (
            <i
              class="material-icons mdc-text-field__icon mdc-text-field__icon--trailing"
              tabindex={this.options.iconTrailing.onclick ? '0' : null}
              role={this.options.iconTrailing.onclick ? 'button' : null}
              onclick={this.options.iconTrailing.onclick}
            >
              {this.options.iconTrailing.icon}
            </i>
          )}
          {this.options.filled && <span class="mdc-line-ripple"></span>}
        </label>
      </>
    );
  }
}

module.exports = TextField;
