import { Price } from '../../models/price';

type IntervalPrices = {
  [interval in string]: Price[];
};

export interface ProductPricesState {
  data: {
    [productId: string]: IntervalPrices;
  };
  isLoading: boolean;
}
