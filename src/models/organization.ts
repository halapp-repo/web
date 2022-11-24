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

class Organization {
  ID?: string;
  VKN?: string;
  Name?: string;
  Email?: string;
  PhoneNumber?: string;
  Active?: boolean;

  @Type(() => OrganizationAddress)
  CompanyAddress?: OrganizationAddress;

  @Type(() => OrganizationAddress)
  InvoiceAddress?: OrganizationAddress;

  JoinedUsers?: string[];

  @Type(() => String)
  @Transform(({ value }: { value: string }) => trMoment(value), {
    toClassOnly: true
  })
  CreatedDate?: moment.Moment;
}

export { Organization, OrganizationAddress };
