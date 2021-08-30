const m = require('mithril');
const { Col, Grid, Intent } = require('construct-ui');
const { Container, Tile } = require('../components');
const { PresentationRequest, Mailbox } = require('./verify');

function Verify() {
  const gridAttrs = { gutter: { xs: 0, sm: 8, md: 16, lg: 32, xl: 32 } };
  const colAttrs = { span: 6, style: { margin: '16px 0' } };

  return {
    view: function () {
      return m(
        Container,
        m(Grid, gridAttrs, [
          m(
            Col,
            colAttrs,
            m(
              Tile,
              {
                title: 'Presentation Request',
                intent: Intent.PRIMARY,
              },
              m(PresentationRequest)
            )
          ),
          m(
            Col,
            colAttrs,
            m(
              Tile,
              {
                title: 'Mailbox',
                intent: Intent.PRIMARY,
              },
              m(Mailbox)
            )
          ),
        ])
      );
    },
  };
}

module.exports = Verify;
