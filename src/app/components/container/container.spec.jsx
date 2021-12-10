import m from 'mithril';
import mq from 'mithril-query';
import Container from './container.jsx';

describe('Container component', () => {
  it('Should create', () => {
    let out = mq(m(Container));
    expect(out).toBeTruthy();
  });
});
