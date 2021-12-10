import m from 'mithril';
import mq from 'mithril-query';
import ConfigureIdentifier from './configure-identifier';

describe('ConfigureIdentifier component', () => {
  it('Should create', () => {
    let out = mq(m(ConfigureIdentifier));
    expect(out).toBeTruthy();
  });
});
