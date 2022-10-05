import { Order } from './order';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  let aVal: any = a[orderBy];
  let bVal: any = b[orderBy];
  if (typeof a[orderBy] === 'string') {
    aVal = (aVal as string).toUpperCase();
    bVal = (bVal as string).toUpperCase();
  }
  if (bVal < aVal) {
    return -1;
  }
  if (bVal > aVal) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export { getComparator };
