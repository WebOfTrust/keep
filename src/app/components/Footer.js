const m = require('mithril');
const { Colors } = require('construct-ui');
const Container = require('./Container');

function Footer() {
  return {
    view: function (vnode) {
      return m(
        'div',
        {
          style: {
            background: Colors.INDIGO400,
            color: Colors.WHITE,
            padding: '16px 0',
          },
        },
        m(Container, vnode.children)
      );
    },
  };
}

module.exports = Footer;
