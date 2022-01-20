import m from 'mithril';
import mq from 'mithril-query';
import ToastOutlet from './toast-outlet.jsx';

describe('ToastOutlet component', () => {
  it('Should create', () => {
    let out = mq(m(ToastOutlet));
    expect(out).toBeTruthy();
  });
});
