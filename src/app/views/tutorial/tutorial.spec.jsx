import m from 'mithril';
import mq from 'mithril-query';
import Tutorial from './tutorial';

describe('Tutorial component', () => {
  it('Should create', () => {
    let out = mq(m(Tutorial));
    expect(out).toBeTruthy();
  });
});
