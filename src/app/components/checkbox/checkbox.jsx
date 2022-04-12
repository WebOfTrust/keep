import m from 'mithril';
// import { MDCFormField } from '@material/form-field';
import { MDCCheckbox } from '@material/checkbox';

class Checkbox {
  oncreate(vnode) {
    try {
      this.checkbox = new MDCCheckbox(vnode.dom);
    } catch (e) {
      console.log(e);
    }
  }

  view(vnode) {
    return (
      <>
        <div class="mdc-touch-target-wrapper">
          <div class="mdc-checkbox mdc-checkbox--touch">
            <input type="checkbox" class="mdc-checkbox__native-control" id="checkbox-1" />
            <div class="mdc-checkbox__background">
              <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                <path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59" />
              </svg>
              <div class="mdc-checkbox__mixedmark"></div>
            </div>
            <div class="mdc-checkbox__ripple"></div>
          </div>
        </div>
      </>
    );
  }
}

module.exports = Checkbox;
