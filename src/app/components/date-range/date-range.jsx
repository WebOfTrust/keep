import m from 'mithril';
import moment from 'moment';
import DatePicker from '../date-picker/date-picker.jsx';
import Popover from '../popover/popover.jsx';
import './date-range.scss';

class DateRange {
  constructor() {
    this.datePickerVisible = false;
    this.rangeDropdownVisible = false;
    this.ranges = [
      {
        id: 'today',
        label: 'Today',
      },
      {
        id: 'week',
        label: 'This Week',
      },
      {
        id: 'month',
        label: 'This Month',
      },
      {
        id: 'year',
        label: 'This Year',
      },
      {
        id: 'twoWeeks',
        label: 'Two Weeks',
      },
      {
        id: 'all',
        label: 'All',
      },
    ];
  }

  oninit() {
    this.setRange('today');
  }

  openDatePicker() {
    this.datePickerVisible = true;
  }

  selectedRange(vnode) {
    let diffDays = vnode.attrs.endDate.diff(vnode.attrs.startDate, 'days', true);
    let diffMonths = vnode.attrs.endDate.diff(vnode.attrs.startDate, 'months', true);
    let diffYears = vnode.attrs.endDate.diff(vnode.attrs.startDate, 'years', true);
    if (vnode.attrs.endDate.date() === moment().date()) {
      if (vnode.attrs.startDate.isBefore(moment('0001-01-02'))) {
        return 'All';
      } else if (diffYears >= 1 && diffYears <= 1.005) {
        return 'This Year';
      } else if (diffMonths >= 1 && diffMonths <= 1.035) {
        return 'This Month';
      } else if (diffDays >= 14 && diffDays <= 15) {
        return 'Two Weeks';
      } else if (diffDays >= 7 && diffDays <= 8) {
        return 'This Week';
      } else if (diffDays >= 0 && diffDays <= 1) {
        return 'Today';
      }
    }
    return 'Custom';
  }

  openRangeDropdown() {
    this.rangeDropdownVisible = true;
  }

  setRange(vnode, range) {
    switch (range) {
      case 'today':
        vnode.attrs.startDateChange(moment().startOf('day'));
        vnode.attrs.endDateChange(moment().endOf('day'));
        break;
      case 'week':
        vnode.attrs.startDateChange(moment().subtract(1, 'weeks').startOf('day'));
        vnode.attrs.endDateChange(moment().endOf('day'));
        break;
      case 'month':
        vnode.attrs.startDateChange(moment().subtract(1, 'months').startOf('day'));
        vnode.attrs.endDateChange(moment().endOf('day'));
        break;
      case 'year':
        vnode.attrs.startDateChange(moment().subtract(1, 'years').startOf('day'));
        vnode.attrs.endDateChange(moment().endOf('day'));
        break;
      case 'twoWeeks':
        vnode.attrs.startDateChange(moment().subtract(2, 'weeks').startOf('day'));
        vnode.attrs.endDateChange(moment().endOf('day'));
        break;
      case 'all':
        vnode.attrs.startDateChange(moment('0001-01-01'));
        vnode.attrs.endDateChange(moment().endOf('day'));
        break;
    }
    this.rangeDropdownVisible = false;
  }

  view(vnode) {
    return (
      <div class="dateRange">
        <div class="dateRange__flex">
          <div class="dateRange__segment">
            <div
              class="dateRange__segment__content"
              onclick={() => {
                this.openDatePicker();
              }}
            >
              <span class="material-icons" style={{ marginRight: '.25rem' }}>
                calendar_today
              </span>
              <span>
                {vnode.attrs.startDate.format('MMM D, y')} - {vnode.attrs.endDate.format('MMM D, y')}
              </span>
            </div>
            <Popover
              style={{
                top: '48px',
                width: '640px',
              }}
              onClose={() => {
                this.datePickerVisible = false;
              }}
              visible={this.datePickerVisible}
            >
              <div class="dateRange__popover__flex">
                <DatePicker
                  initialDate={vnode.attrs.startDate}
                  selectedChange={(date) => {
                    vnode.attrs.startDateChange(date);
                  }}
                />
                <DatePicker
                  initialDate={vnode.attrs.endDate}
                  selectedChange={(date) => {
                    vnode.attrs.endDateChange(date);
                  }}
                />
              </div>
            </Popover>
          </div>
          <div class="dateRange__segment">
            <div
              class="dateRange__segment__content"
              onclick={() => {
                this.openRangeDropdown();
              }}
            >
              <div class="segment__selected">{this.selectedRange(vnode)}</div>
              <span class="material-icons">arrow_drop_down</span>
            </div>
            <Popover
              style={{
                top: '48px',
                width: '150px',
              }}
              onClose={() => {
                this.rangeDropdownVisible = false;
              }}
              visible={this.rangeDropdownVisible}
            >
              {this.ranges.map((range) => {
                return [
                  <div
                    class="dateRange__popover__item"
                    onclick={() => {
                      this.setRange(vnode, range.id);
                    }}
                  >
                    {range.label}
                  </div>,
                ];
              })}
            </Popover>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = DateRange;
