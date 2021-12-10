import m from 'mithril';
import mq from 'mithril-query';
import DatePicker from './date-picker.jsx';

describe('DatePicker component', () => {
  it('Should create', () => {
    let out = mq(m(DatePicker));
    expect(out).toBeTruthy();
  });
});
