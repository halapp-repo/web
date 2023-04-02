import 'reflect-metadata';

import { plainToClass } from 'class-transformer';
import timezone from 'moment-timezone';

import { Price } from '../../../src/models/price';
import { getNewestPricesByDate as getNewestPriceByDate } from '../../../src/models/services/price.model.service';

describe('PriceModelService', () => {
  test('getTodayPrices', () => {
    const prices: Price[] = [
      {
        Price: 12,
        ProductId: 'AB',
        Unit: 'AB',
        TS: timezone.tz('Europe/Istanbul').format()
      }
    ].map((r) => plainToClass(Price, r));
    const [today, yesterday] = getNewestPriceByDate(prices);
    expect(today).toEqual(prices[0]);
    expect(yesterday).toEqual(undefined);
  });

  test('getYesterdayPrices', () => {
    const prices: Price[] = [
      {
        Price: 12,
        ProductId: 'AB',
        Unit: 'AB',
        TS: timezone.tz('Europe/Istanbul').subtract(1, 'd').format()
      }
    ].map((r) => plainToClass(Price, r));
    const [today, yesterday] = getNewestPriceByDate(prices);
    expect(today).toEqual(prices[0]);
    expect(yesterday).toEqual(undefined);
  });
  test('getTodayPrices 2', () => {
    const prices: Price[] = [
      {
        Price: 12,
        ProductId: 'AB',
        Unit: 'AB',
        TS: timezone.tz('Europe/Istanbul').subtract(1, 'm').format()
      },
      {
        Price: 12,
        ProductId: 'AB',
        Unit: 'AB',
        TS: timezone.tz('Europe/Istanbul').format()
      }
    ].map((r) => plainToClass(Price, r));
    const [today, yesterday] = getNewestPriceByDate(prices);
    expect(today).toEqual(prices[1]);
    expect(yesterday).toEqual(undefined);
  });
  test('getYesterdayPrices 2', () => {
    const prices: Price[] = [
      {
        Price: 12,
        ProductId: 'Yesterday',
        Unit: 'AB',
        TS: timezone.tz('Europe/Istanbul').subtract(1, 'd').format()
      },
      {
        Price: 12,
        ProductId: 'Today',
        Unit: 'AB',
        TS: timezone.tz('Europe/Istanbul').format()
      }
    ].map((r) => plainToClass(Price, r));
    const [today, yesterday] = getNewestPriceByDate(prices);
    expect(today).toEqual(prices[1]);
    expect(yesterday).toEqual(prices[0]);
  });
});
