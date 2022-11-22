import { Transform, Type } from 'class-transformer';
import * as moment from 'moment';
import { trMoment } from '../utils/timezone';
import { User } from './user';

class OrganizationAddress {
  AddressLine: string;
  County: string;
  City: string;
  ZipCode: string;
  Country: string;
}

export class Organization {
  ID?: string;
  VKN?: string;
  Name?: string;
  Email?: string;
  PhoneNumber?: string;

  @Type(() => OrganizationAddress)
  CompanyAddress?: OrganizationAddress;

  @Type(() => OrganizationAddress)
  InvoiceAddress?: OrganizationAddress;

  @Type(() => User)
  JoinedUsers?: User[];

  @Type(() => String)
  @Transform(({ value }: { value: string }) => trMoment(value), {
    toClassOnly: true
  })
  CreatedDate?: moment.Moment;
}
