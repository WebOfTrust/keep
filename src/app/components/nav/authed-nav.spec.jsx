import m from 'mithril';
import mq from 'mithril-query';
import AuthedNav from './authed-nav';

describe('AuthedNav component', () => {
  it('Should create', () => {
    let out = mq(m(AuthedNav));
    expect(out).toBeTruthy();
  });
});