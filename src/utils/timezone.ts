import moment from 'moment';
import 'moment/locale/tr';
import('moment-timezone');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const trMoment = (...args: any) =>
  moment
    .utc(...args)
    .locale('tr')
    .tz('Europe/Istanbul');
