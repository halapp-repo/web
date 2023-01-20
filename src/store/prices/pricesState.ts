import { PriceVM } from '@halapp/common';

export interface PricesState {
  data: {
    [date: string]: PriceVM[];
  };
  isLoading: boolean;
}
