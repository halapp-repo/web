import { Price } from '../price';
import moment from 'moment';

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
      prices.sort((a: Price, b: Price) => {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        const mA = moment(a.TS);
        const mB = moment(b.TS);
        return mA > mB ? -1 : mA < mB ? 1 : 0;
      });
      return prices[0];
    })
    .sort((a: Price, b: Price) => {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      const mA = moment(a.TS);
      const mB = moment(b.TS);
      return mA > mB ? -1 : mA < mB ? 1 : 0;
    });
};
