import m from 'mithril';
import mq from 'mithril-query';
import Error from './error';

describe('Error component', () => {
  it('Should create', () => {
    let out = mq(m(Error));
    expect(out).toBeTruthy();
  });
});
