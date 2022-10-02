import { Price } from '../../models/price';

export interface PricesState {
  data: {
    [date: string]: Price[];
  };
  isLoading: boolean;
}
