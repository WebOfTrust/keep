import m from 'mithril';
import mq from 'mithril-query';
import UnauthedNav from './unauthed-nav';

describe('UnauthedNav component', () => {
  it('Should create', () => {
    let out = mq(m(UnauthedNav));
    expect(out).toBeTruthy();
  });
});
