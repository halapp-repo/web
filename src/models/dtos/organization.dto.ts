import { Type } from 'class-transformer';
import { UserDTO } from './user.dto';

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

  @Type(() => UserDTO)
  JoinedUsers?: UserDTO[];

  CreatedDate?: string;
}
