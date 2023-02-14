import { OrderItem } from '../../order';

export class OrderItemsUpdatedV1Payload {
  DeletedItems: OrderItem[];
  UpdatedBy: string;
}
