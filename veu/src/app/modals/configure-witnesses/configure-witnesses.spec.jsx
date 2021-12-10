import m from 'mithril';
import mq from 'mithril-query';
import ConfigureWitnesses from './configure-witnesses';

describe('ConfigureWitnesses component', () => {
  it('Should create', () => {
    let out = mq(m(ConfigureWitnesses));
    expect(out).toBeTruthy();
  });
});
