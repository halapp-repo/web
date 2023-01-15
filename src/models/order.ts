import { Transform, Type } from 'class-transformer';
import moment from 'moment';
import { trMoment } from '../utils/timezone';
import { OrderStatus } from './order-status';
import { OrganizationAddress } from './organization';

class OrderItem {
  ProductId: string;
  ProductName?: string;
  Price: number;
  Count: number;
  Unit: string;

  totalPrice(): number {
    return this.Count * this.Price;
  }
}

class Order {
  Id: string;
  OrganizationId: string;

  @Type(() => OrganizationAddress)
  DeliveryAddress: OrganizationAddress;

  CreatedBy: string;

  @Type(() => String)
  @Transform(({ value }: { value: string }) => trMoment(value), {
    toClassOnly: true
  })
  TS: moment.Moment;

  @Type(() => OrderItem)
  Items: OrderItem[];

  Note?: string;

  @Type(() => String)
  @Transform(({ value }: { value: string }) => trMoment(value), {
    toClassOnly: true
  })
  CreatedDate: moment.Moment;

  @Type(() => String)
  @Transform(({ value }: { value: string }) => OrderStatus[value as keyof typeof OrderStatus], {
    toClassOnly: true
  })
  Status: OrderStatus;

  totalPrice(): number {
    return this.Items.reduce((acc, curr) => {
      return acc + curr.totalPrice();
    }, 0);
  }
}

export { Order, OrderItem };
