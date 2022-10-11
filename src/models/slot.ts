import { IntervalType } from './interval-type';

export interface Slot {
  key: string;
  interval: IntervalType;
  fromDate: () => string;
  toDate: () => string | undefined;
}
