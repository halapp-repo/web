import { Price } from '../../models/price';

type PriceDuration = {
  [slot in string]: Price[];
};

export interface ProductPricesState {
  data: {
    [productId: string]: PriceDuration;
  };
  isLoading: boolean;
}
