import { Transform, Type } from 'class-transformer';
import moment from 'moment';

import { trMoment } from '../utils/timezone';

export class Price {
  ProductId: string;
  ProductName: string;
  Price: number;
  Unit: string;

  @Type(() => String)
  @Transform(({ value }: { value: string }) => trMoment(value), {
    toClassOnly: true
  })
  TS: moment.Moment;

  IsToday?: boolean;
  Increase?: number;
  IsActive?: boolean;

  get Amount(): string {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(
      this.Price
    );
  }
}
