import m from 'mithril';
import './steps.scss';

class Steps {
  view(vnode) {
    return (
      <>
        <div class="steps" style={vnode.attrs.style}>
          {[...Array(vnode.attrs.count)].map((s, idx) => {
            return (
              <div
                class={'step' + (idx === vnode.attrs.selected ? ' step--selected' : '')}
                onclick={() => {
                  vnode.attrs.selectedChange(idx);
                }}
              ></div>
            );
          })}
        </div>
      </>
    );
  }
}

module.exports = Steps;
