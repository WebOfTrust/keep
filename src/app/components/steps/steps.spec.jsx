import m from 'mithril';
import mq from 'mithril-query';
import Steps from './steps.jsx';

describe('Steps component', () => {
  it('Should create', () => {
    let out = mq(m(Steps));
    expect(out).toBeTruthy();
  });
});
