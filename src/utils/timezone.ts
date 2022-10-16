import moment from 'moment';
import('moment-timezone');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const trMoment = (...args: any) => moment(...args).tz('Europe/Istanbul');
