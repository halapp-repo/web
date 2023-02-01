import { Transform, Type } from 'class-transformer';
import moment from 'moment';
import { trMoment } from '../utils/timezone';
import { OrderEventType, OrderStatusType } from '@halapp/common';
import { OrganizationAddress } from './organization';

class OrderEvent {
  @Type(() => String)
  @Transform(({ value }: { value: string }) => trMoment(value), {
    toClassOnly: true
  })
  TS: moment.Moment;

  @Type(() => String)
  @Transform(
    ({ value }: { value: string }) => OrderEventType[value as keyof typeof OrderEventType],
    {
      toClassOnly: true
    }
  )
  EventType: OrderEventType;

  Payload: string;
}

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
  @Transform(
    ({ value }: { value: string }) => OrderStatusType[value as keyof typeof OrderStatusType],
    {
      toClassOnly: true
    }
  )
  Status: OrderStatusType;

  @Type(() => String)
  @Transform(({ value }: { value: string }) => trMoment(value), {
    toClassOnly: true
  })
  DeliveryTime: moment.Moment;

  @Type(() => OrderEvent)
  Events?: OrderEvent[];

  totalPrice(): number {
    return this.Items.reduce((acc, curr) => {
      return acc + curr.totalPrice();
    }, 0);
  }

  canCancel(): boolean {
    return this.Status === OrderStatusType.Created;
  }
  canBeDelivered(): boolean {
    return this.Status === OrderStatusType.Created;
  }
}

export { Order, OrderItem, OrderEvent };
