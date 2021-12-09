import m from 'mithril';
import './popover.scss';

class Popover {
  constructor() {}

  close(vnode) {
    vnode.attrs.onClose();
  }

  view(vnode) {
    return (
      vnode.attrs.visible && (
        <>
          <div class="popover" style={vnode.attrs.style}>
            <div class="popover__content" style={{ padding: vnode.attrs.padding }}>
              {vnode.children}
            </div>
          </div>
          <div
            class="popover__overlay"
            onclick={() => {
              this.close(vnode);
            }}
          ></div>
        </>
      )
    );
  }
}

module.exports = Popover;
