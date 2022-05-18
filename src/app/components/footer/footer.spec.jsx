import m from 'mithril';
import mq from 'mithril-query';
import Footer from './footer.jsx';

describe('footer component', () => {
  it('Should create', () => {
    let out = mq(m(Footer));
    expect(out).toBeTruthy();
  });
});
