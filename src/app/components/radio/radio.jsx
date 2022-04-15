import m from 'mithril';

import { MDCRadio } from '@material/radio';

class Radio {
  oncreate(vnode) {
    try {
      this.radio = new MDCRadio(vnode.dom);
    } catch (e) {
      console.log(e);
    }
  }

  view(vnode) {
    return (
      <>
        <div class="mdc-touch-target-wrapper">
          <div class="mdc-radio mdc-radio--touch">
            <input class="mdc-radio__native-control" type="radio" id="radio-1" name="radios" checked />
            <div class="mdc-radio__background">
              <div class="mdc-radio__outer-circle"></div>
              <div class="mdc-radio__inner-circle"></div>
            </div>
            <div class="mdc-radio__ripple"></div>
          </div>
        </div>
      </>
    );
  }
}

module.exports = Radio;
