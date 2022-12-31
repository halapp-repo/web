import { Transform, Type } from 'class-transformer';
import moment from 'moment';
import { trMoment } from '../utils/timezone';
import { OrganizationAddress } from './organization';

class OrderItem {
  ProductId: string;
  Price: number;
  Count: number;
  Unit: string;
}

class Order {
  Id: string;
  OrganizationId: string;

  @Type(() => OrganizationAddress)
  DeliveryAddress: OrganizationAddress;

  CreatedBy: string;

  @Type(() => Number)
  @Transform(({ value }: { value: string }) => trMoment(value), {
    toClassOnly: true
  })
  TS: moment.Moment;

  @Type(() => OrderItem)
  Items: OrderItem[];

  Note?: string;
}

export { Order, OrderItem };
