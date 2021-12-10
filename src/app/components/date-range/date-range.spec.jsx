import m from 'mithril';
import mq from 'mithril-query';
import moment from 'moment';
import DateRange from './date-range';

describe('DateRange component', () => {
  it('Should create', () => {
    let out = mq(
      m(DateRange, {
        startDate: moment(),
        endDate: moment(),
      })
    );
    expect(out).toBeTruthy();
  });
});
