import axios from 'axios';
import { OrderDTO } from '../../models/dtos/order.dto';
import { Order } from '../../models/order';

export class OrderApi {
  baseUrl: string;
  constructor() {
    const baseUrl = process.env.REACT_APP_ORDER_BASE_URL;
    if (!baseUrl) {
      throw new Error('REACT_APP_ORDER_BASE_URL is not set!');
    }
    this.baseUrl = baseUrl;
  }
  async createOrder({ token, order }: { token: string; order: OrderDTO }): Promise<Order> {
    return await axios.post('/orders', JSON.stringify(order), {
      baseURL: this.baseUrl,
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${token}`
      }
    });
  }
}
