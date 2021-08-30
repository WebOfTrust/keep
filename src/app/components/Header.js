const m = require('mithril');
const { Colors } = require('construct-ui');
const Container = require('./Container');

function Header() {
  return {
    view: function (vnode) {
      return m(
        'div',
        {
          style: {
            background: Colors.INDIGO400,
            color: Colors.WHITE,
            paddingTop: '16px',
            paddingBottom: '16px',
          },
        },
        m(Container, vnode.children)
      );
    },
  };
}

module.exports = Header;
