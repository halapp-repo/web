import { Transform, Type } from 'class-transformer';
import moment from 'moment';
import { trMoment } from '../utils/timezone';
import {
  CityType,
  ExtraCharge,
  OrderEventType,
  OrderStatusType,
  PaymentMethodType
} from '@halapp/common';
import { OrganizationAddress } from './organization';
import { OrderEvent } from './events/order-event';

class OrderItem {
  ProductId: string;
  ProductName?: string;
  Price: number;
  Count: number;
  Unit: string;

  get TotalPrice(): number {
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

  City: CityType;
  PaymentMethodType: PaymentMethodType;

  ExtraCharges?: ExtraCharge[];

  get TotalPrice(): number {
    let total = 0;
    total += this.Items.reduce((acc, curr) => {
      return acc + curr.TotalPrice;
    }, 0);
    for (const charge of this.ExtraCharges || []) {
      total += charge.Price;
    }
    return total;
  }

  isPickedUp(): boolean {
    return this.Events?.some((e) => e.EventType === OrderEventType.OrderPickedUpV1) || false;
  }
  isDelivered(): boolean {
    return this.Events?.some((e) => e.EventType === OrderEventType.OrderDeliveredV1) || false;
  }

  canBeCanceled(): boolean {
    return this.Status !== OrderStatusType.Canceled && !this.isPickedUp();
  }
  canBeDelivered(): boolean {
    return this.Status !== OrderStatusType.Canceled && this.isPickedUp() && !this.isDelivered();
  }
  canBeUpdated(): boolean {
    return this.Status !== OrderStatusType.Canceled && !this.isPickedUp();
  }
  canBePickedUp(): boolean {
    return this.Status !== OrderStatusType.Canceled && !this.isPickedUp();
  }
}

export { Order, OrderItem };
