import { Order } from '../../models/order';

export interface OrdersState {
  List: {
    [k: string]: Order[] | undefined;
  };
  IsLoading: boolean;
}
