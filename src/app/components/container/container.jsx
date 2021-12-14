import m from 'mithril';

class Container {
  constructor() {}

  view(vnode) {
    return (
      <div class={'container' + (vnode.attrs.class ? ` ${vnode.attrs.class}` : '')} style={vnode.attrs.style}>
        {vnode.children}
      </div>
    );
  }
}

module.exports = Container;
