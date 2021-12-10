import m from 'mithril';
import mq from 'mithril-query';
import StyleGuide from './style-guide';

describe('StyleGuide component', () => {
  it('Should create', () => {
    let out = mq(m(StyleGuide));
    expect(out).toBeTruthy();
  });
});
