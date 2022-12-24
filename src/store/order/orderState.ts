import { Order } from '../../models/order';

export interface OrderState {
  Orders: {
    List?: Order[];
    IsLoading: boolean;
  };
}
