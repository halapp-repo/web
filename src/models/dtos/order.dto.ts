import { OrganizationAddress } from '../organization';

class OrderItemDTO {
  ProductId: string;
  Price: number;
  Count: number;
  Unit: string;
}

class OrderDTO {
  Id?: string;
  OrganizationId: string;

  DeliveryAddress: OrganizationAddress;

  CreatedBy?: string;

  TS: number;

  Items: OrderItemDTO[];

  Note?: string;
}

export { OrderDTO, OrderItemDTO };
