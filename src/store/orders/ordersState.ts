import { OrderVM } from '@halapp/common';

export interface OrdersState {
  List: {
    [orgId: string]: {
      [filterName: string]: OrderVM[] | undefined;
    };
  };
  IsLoading: boolean;
}
