import m from 'mithril';

class Container {
  constructor() {}

  view(vnode) {
    return <div class={'container' + (vnode.attrs.class ? ` ${vnode.attrs.class}` : '')}>{vnode.children}</div>;
  }
}

module.exports = Container;
