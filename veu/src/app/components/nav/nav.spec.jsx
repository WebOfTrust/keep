import m from 'mithril';
import mq from 'mithril-query';
import Nav from './nav';

describe('Nav component', () => {
  it('Should create', () => {
    let out = mq(m(Nav));
    expect(out).toBeTruthy();
  });
});
