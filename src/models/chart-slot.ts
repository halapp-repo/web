import { IntervalType } from './interval-type';

interface ChartSlot {
  key: string;
  interval: IntervalType;
  fromDate: () => string;
  toDate: () => string | undefined;
}

export type { ChartSlot };
