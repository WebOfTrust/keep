import m from 'mithril';
import mq from 'mithril-query';
import Card from './card.jsx';

describe('Card component', () => {
  it('Should create', () => {
    let out = mq(m(Card));
    expect(out).toBeTruthy();
  });
});
