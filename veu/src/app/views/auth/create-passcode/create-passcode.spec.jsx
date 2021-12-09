import m from 'mithril';
import mq from 'mithril-query';
import CreatePasscode from './create-passcode';

describe('CreatePasscode component', () => {
  it('Should create', () => {
    let out = mq(m(CreatePasscode));
    expect(out).toBeTruthy();
  });
});
