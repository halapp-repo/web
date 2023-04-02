import { Transform, Type } from 'class-transformer';
import moment from 'moment';

import { trMoment } from '../utils/timezone';

export class SignupCode {
  readonly Code: string;
  readonly OrganizationID: string;
  readonly OrganizationName: string;

  @Type(() => String)
  @Transform(({ value }: { value: string }) => trMoment(value), {
    toClassOnly: true
  })
  TS: moment.Moment;

  readonly Active: boolean;
  isActive(): boolean {
    return this.Active;
  }
}
