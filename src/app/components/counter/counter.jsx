import m from 'mithril';
import IconButton from '../icon-button/icon-button';
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
          <div class={`counter-value ${vnode.attrs.disabled && 'counter-value--disabled'}`}>{vnode.attrs.value}</div>
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
