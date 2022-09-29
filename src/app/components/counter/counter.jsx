import m from 'mithril';
import IconButton from '../icon-button/icon-button';
import TextField from '../text-field/text-field';
import './counter.scss';

class Counter {
  view(vnode) {
    return (
      <>
        <div class="counter">
          <IconButton
            icon="remove"
            disabled={vnode.attrs.disabled || (vnode.attrs.min && vnode.attrs.value <= vnode.attrs.min)}
            onclick={() => {
              vnode.attrs.onchange(vnode.attrs.value - 1);
            }}
          />
          <TextField
            outlined
            disabled={vnode.attrs.disabled}
            style={{ margin: '0 0.5rem', width: '48px' }}
            value={vnode.attrs.value}
            oninput={(e) => {
              let val = parseInt(e.target.value);
              // If empty string, set to min or 0
              if (e.target.value === '') {
                if (vnode.attrs.min) {
                  vnode.attrs.onchange(vnode.attrs.min);
                } else {
                  vnode.attrs.onchange(0);
                }
                return;
              }
              // If parsed value is NaN, return
              if (isNaN(val)) {
                return;
              }
              // If parsed value is less than min, set to min
              if (vnode.attrs.min && val <= vnode.attrs.min) {
                vnode.attrs.onchange(vnode.attrs.min);
                return;
              }
              // If value is greater than max, set to max
              if (vnode.attrs.max && val >= vnode.attrs.max) {
                vnode.attrs.onchange(vnode.attrs.max);
                return;
              }
              vnode.attrs.onchange(val);
            }}
          />
          <IconButton
            icon="add"
            disabled={vnode.attrs.disabled || (vnode.attrs.max && vnode.attrs.value >= vnode.attrs.max)}
            onclick={() => {
              vnode.attrs.onchange(vnode.attrs.value + 1);
            }}
          />
        </div>
      </>
    );
  }
}

module.exports = Counter;
