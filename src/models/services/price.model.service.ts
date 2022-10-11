import { Price } from '../price';
import moment from 'moment';
import { getComparator } from '../../utils/sort';

interface PriceGroup {
  [key: string]: Price[];
}

export const getNewestPricesByDate = (prices: Price[]): Price[] => {
  return Object.values(
    prices.reduce((group: PriceGroup, price: Price) => {
      const format = moment(price.TS).format('YYYY-MM-DD');
      if (group[format]) {
        group[format].push(price);
      } else {
        group[format] = [price];
      }
      return group;
    }, {})
  )
    .map((prices): Price => {
      prices.sort(getComparator('desc', 'TS'));
      return prices[0];
    })
    .sort(getComparator('desc', 'TS'));
};
