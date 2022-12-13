import { Type } from 'class-transformer';

export class OrganizationAddressDTO {
  Active?: boolean;
  AddressLine: string;
  County: string;
  City: string;
  ZipCode: string;
  Country: string;
}

export class OrganizationDTO {
  ID?: string;
  VKN?: string;
  Name?: string;
  Email?: string;
  PhoneNumber?: string;
  Active?: boolean;

  @Type(() => OrganizationAddressDTO)
  CompanyAddress?: OrganizationAddressDTO;

  @Type(() => OrganizationAddressDTO)
  InvoiceAddress?: OrganizationAddressDTO;

  JoinedUsers?: string[];

  @Type(() => String)
  CreatedDate?: string;

  @Type(() => OrganizationAddressDTO)
  DeliveryAddresses: OrganizationAddressDTO[];
}
