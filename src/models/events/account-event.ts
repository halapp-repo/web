import { AccountEventType } from '@halapp/common';
import { Transform, Type } from 'class-transformer';
import moment from 'moment';

import { trMoment } from '../../utils/timezone';

class AccountEvent {
  @Type(() => String)
  @Transform(({ value }: { value: string }) => trMoment(value), {
    toClassOnly: true
  })
  TS: moment.Moment;

  @Type(() => String)
  @Transform(
    ({ value }: { value: string }) => AccountEventType[value as keyof typeof AccountEventType],
    {
      toClassOnly: true
    }
  )
  EventType: AccountEventType;

  @Type(() => String)
  @Transform(({ value }: { value: string }) => JSON.parse(value))
  Payload: object;
}

export { AccountEvent };
