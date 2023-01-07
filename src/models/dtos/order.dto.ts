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
  Status?: string;
  DeliveryAddress: OrganizationAddress;
  CreatedBy?: string;
  CreatedDate?: string;
  Items: OrderItemDTO[];
  TS: string;
  Note?: string;
}

export { OrderDTO, OrderItemDTO };
