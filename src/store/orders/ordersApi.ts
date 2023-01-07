import axios from 'axios';
import moment from 'moment';
import { OrderToOrderDTOMapper } from '../../mappers/order-to-order-dto.mapper';
import { OrderDTO } from '../../models/dtos/order.dto';
import { Order } from '../../models/order';

export class OrderApi {
  baseUrl: string;
  mapper: OrderToOrderDTOMapper;
  constructor() {
    const baseUrl = process.env.REACT_APP_ORDER_BASE_URL;
    if (!baseUrl) {
      throw new Error('REACT_APP_ORDER_BASE_URL is not set!');
    }
    this.baseUrl = baseUrl;
    this.mapper = new OrderToOrderDTOMapper();
  }
  async createOrder({ token, order }: { token: string; order: OrderDTO }): Promise<Order> {
    return await axios
      .post<OrderDTO>('/orders', JSON.stringify(order), {
        baseURL: this.baseUrl,
        headers: {
          Accept: 'application/json',
          'content-type': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        const { data } = response;
        return this.mapper.toModel(data);
      });
  }
  async fetchOrders({
    token,
    organizationId,
    fromDate,
    toDate
  }: {
    token: string;
    organizationId: string;
    fromDate?: moment.Moment;
    toDate?: moment.Moment;
  }): Promise<Order[] | null> {
    return await axios
      .get<OrderDTO[]>('/orders', {
        baseURL: this.baseUrl,
        headers: {
          Accept: 'application/json',
          'content-type': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          Authorization: `Bearer ${token}`
        },
        params: {
          OrganizationId: organizationId,
          ...(fromDate
            ? {
                FromDate: fromDate.format()
              }
            : null),
          ...(toDate
            ? {
                ToDate: toDate.format()
              }
            : null)
        }
      })
      .then((response) => {
        const { data } = response;
        return this.mapper.toListModel(data);
      });
  }
}
