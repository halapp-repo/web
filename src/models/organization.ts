import { Type } from 'class-transformer';

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
}
