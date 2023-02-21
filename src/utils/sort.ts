import moment from 'moment';
import { Order } from './order';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const aVal: any = a[orderBy];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bVal: any = b[orderBy];
  if (typeof a[orderBy] === 'string') {
    const aValStr = (aVal as string).toLocaleUpperCase('tr-TR');
    const bValStr = (bVal as string).toLocaleUpperCase('tr-TR');
    return bValStr.localeCompare(aValStr, 'en');
  }
  if (typeof aVal === 'undefined') {
    return -1;
  }
  if (typeof bVal === 'undefined') {
    return -1;
  }
  if (bVal < aVal) {
    return -1;
  }
  if (bVal > aVal) {
    return 1;
  }
  return 0;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]?: number | string | moment.Moment },
  b: { [key in Key]?: number | string | moment.Moment }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export { getComparator, descendingComparator };
