import { DurationType } from '../../models/duration-type';
import { Price } from '../../models/price';

type PriceDuration = {
  [duration in DurationType]: Price[];
};

export interface ProductPricesState {
  data: {
    [productId: string]: PriceDuration;
  };
  isLoading: boolean;
}
