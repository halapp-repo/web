import { PriceVM } from '@halapp/common';

export interface PricesState {
  data: {
    [date: string]: {
      [city: string]: PriceVM[] | undefined | null;
    };
  };
  isLoading: boolean;
}
