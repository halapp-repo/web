import axios from 'axios';
import { Moment } from 'moment';
import { OrderItemDTO } from '../../models/dtos/order-item.dto';
import { OrganizationAddress } from '../../models/organization';

export class OrderApi {
  baseUrl: string;

  async createOrder({
    token,
    organizationId,
    deliveryAddress,
    orderNote,
    orderItems,
    orderDate
  }: {
    token: string;
    organizationId: string;
    deliveryAddress: OrganizationAddress;
    orderNote: string;
    orderItems: OrderItemDTO[];
    orderDate: Moment;
  }): Promise<void> {
    return await axios.post(
      '/orders',
      JSON.stringify({
        organizationId,
        deliveryAddress,
        orderNote,
        orderItems,
        orderDate: orderDate.valueOf()
      }),
      {
        baseURL: this.baseUrl,
        headers: {
          Accept: 'application/json',
          'content-type': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          Authorization: `Bearer ${token}`
        }
      }
    );
  }
}
