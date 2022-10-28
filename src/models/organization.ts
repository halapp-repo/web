interface OrganizationAddress {
  FormattedAddress: string;
  County: string;
  City: string;
  ZipCode: string;
  Country: string;
}

export class Organization {
  Name: string;
  address: OrganizationAddress;
}
