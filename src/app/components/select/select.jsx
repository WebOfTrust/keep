import m from 'mithril';
import { MDCSelect } from '@material/select';

class Select {
  constructor() {}

  oncreate(vnode) {
    try {
      this.select = new MDCSelect(document.querySelector('.mdc-select'));
      // Set initial value if passed in attrs
      if (vnode.attrs.initialSelection) {
        this.select.value = vnode.attrs.initialSelection;
      }
      // Set up value change listener
      this.select.listen('MDCSelect:change', () => {
        vnode.attrs.selectedChange(this.select.value);
        m.redraw();
      });
    } catch (e) {
      console.log(e);
    }
  }

  view(vnode) {
    return (
      <>
        <div class="mdc-select mdc-select--filled">
          <div class="mdc-select__anchor" role="button">
            <span class="mdc-select__ripple"></span>
            <span class="mdc-floating-label">{vnode.attrs.label}</span>
            <span class="mdc-select__selected-text-container">
              <span class="mdc-select__selected-text"></span>
            </span>
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
            <span class="mdc-line-ripple"></span>
          </div>
          <div class="mdc-select__menu mdc-menu mdc-menu-surface mdc-menu-surface--fullwidth">
            <ul class="mdc-deprecated-list" role="listbox">
              {vnode.attrs.options.map((option) => {
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
        </div>
      </>
    );
  }
}

module.exports = Select;
