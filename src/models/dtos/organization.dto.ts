import { Type } from 'class-transformer';

class OrganizationAddressDTO {
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

  @Type(() => OrganizationAddressDTO)
  CompanyAddress?: OrganizationAddressDTO;

  @Type(() => OrganizationAddressDTO)
  InvoiceAddress?: OrganizationAddressDTO;
}
