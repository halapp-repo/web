import { PriceVM } from '@halapp/common';
import { ChartSlot } from '../../models/chart-slot';

type IntervalPrices = {
  [interval in string]: PriceVM[];
};
type ProductProps = {
  currentPrice: number;
  dailyPriceIncrease: number;
  intervalPrices: IntervalPrices;
};
export interface ProductPricesState {
  data: {
    [productId: string]: ProductProps;
  };
  chart: {
    slot: { [key: string]: ChartSlot };
  };
  isLoading: boolean;
}
