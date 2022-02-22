import m from 'mithril';
import mq from 'mithril-query';
import CreatePasscode from './create-passcode.jsx';

describe('CreatePasscode component', () => {
  it('Should create', () => {
    let out = mq(m(CreatePasscode));
    expect(out).toBeTruthy();
  });
});
