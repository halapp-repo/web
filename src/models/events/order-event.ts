import { OrderEventType } from '@halapp/common';
import { Transform, Type } from 'class-transformer';
import moment from 'moment';

import { trMoment } from '../../utils/timezone';
import { OrderItemsUpdatedV1Payload } from './payloads/order-items-updated-v1.payload';

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

  @Type(() => String)
  @Transform(({ value }: { value: string }) => JSON.parse(value))
  Payload: OrderItemsUpdatedV1Payload | object;
}

export { OrderEvent };
