import m from 'mithril';
import mq from 'mithril-query';
import TextTooltip from './text-tooltip.jsx';

describe('TextTooltip component', () => {
  it('Should create', () => {
    let out = mq(m(TextTooltip));
    expect(out).toBeTruthy();
  });
});
