import m from 'mithril';
import './steps.scss';

class Steps {
  constructor() {}

  view(vnode) {
    return (
      <>
        <div class="steps" style={vnode.attrs.style}>
          {[...Array(vnode.attrs.count)].map((s, idx) => {
            return (
              <div
                class={'step' + (idx === vnode.attrs.selected ? ' step--selected' : '')}
                style={{ cursor: 'pointer' }}
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
