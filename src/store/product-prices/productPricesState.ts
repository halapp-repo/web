import { ChartSlot } from '../../models/chart-slot';
import { Price } from '../../models/price';

type IntervalPrices = {
  [interval in string]: Price[];
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
