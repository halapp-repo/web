import moment from 'moment';

import { DateRangeType } from '../../../models/types/date-range.type';

export type DateRange = {
  [range in DateRangeType]: {
    from: moment.Moment;
    to: moment.Moment;
  };
};
