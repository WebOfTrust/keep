import m from 'mithril';
import Popover from '../popover/popover';

class TextTooltip {
  constructor(vnode) {
    this.isOpen = false;
  }

  view(vnode) {
    return (
      <>
        <span
          class="relative"
          onmouseover={() => {
            this.isOpen = true;
          }}
        >
          {vnode.attrs.label}
          <Popover
            visible={this.isOpen}
            onClose={() => {
              this.isOpen = false;
            }}
            padding={'16px'}
            style={{
              backgroundColor: '#eaeaea',
              fontSize: '14px',
              top: '-100px',
              right: '0',
              width: '200px',
            }}
          >
            {vnode.children}
          </Popover>
        </span>
      </>
    );
  }
}

module.exports = TextTooltip;
