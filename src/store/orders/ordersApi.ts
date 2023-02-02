import axios from 'axios';
import moment from 'moment';
import { OrderToOrderVMMapper } from '../../mappers/order-to-order-vm.mapper';
import { OrderStatusType, OrderVM } from '@halapp/common';

export class OrderApi {
  baseUrl: string;
  mapper: OrderToOrderVMMapper;
  constructor() {
    const baseUrl = process.env.REACT_APP_ORDER_BASE_URL;
    if (!baseUrl) {
      throw new Error('REACT_APP_ORDER_BASE_URL is not set!');
    }
    this.baseUrl = baseUrl;
    this.mapper = new OrderToOrderVMMapper();
  }
  async createOrder({ token, order }: { token: string; order: OrderVM }): Promise<OrderVM> {
    return await axios
      .post<OrderVM>('/orders', JSON.stringify(order), {
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
        return data;
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
  }): Promise<OrderVM[] | null> {
    return await axios
      .get<OrderVM[]>('/orders', {
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
        return data;
      });
  }
  async fetchOrder({
    token,
    orderId
  }: {
    token: string;
    orderId: string;
  }): Promise<OrderVM | null> {
    return await axios
      .get<OrderVM>(`/orders/${orderId}`, {
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
        return data;
      });
  }
  async updateOrderStatus({
    token,
    orderId,
    newOrderStatus
  }: {
    token: string;
    orderId: string;
    newOrderStatus: OrderStatusType;
  }): Promise<OrderVM> {
    return await axios
      .put<OrderVM>(
        `/orders/${orderId}/status`,
        { Status: newOrderStatus },
        {
          baseURL: this.baseUrl,
          headers: {
            Accept: 'application/json',
            'content-type': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then((response) => {
        const { data } = response;
        return data;
      });
  }
}
