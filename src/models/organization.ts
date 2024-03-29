import { plainToInstance, Transform, Type } from 'class-transformer';
import * as moment from 'moment';

import { trMoment } from '../utils/timezone';
import { AccountEvent } from './events/account-event';

class OrganizationAddress {
  Active?: boolean;
  AddressLine: string;
  County: string;
  City: string;
  ZipCode: string;
  Country: string;

  compareOther(other: OrganizationAddress): boolean {
    return (
      this.AddressLine === other.AddressLine &&
      this.City === other.City &&
      this.Country === other.Country &&
      this.County === other.County &&
      this.ZipCode === other.ZipCode
    );
  }
}

class Organization {
  ID?: string;
  VKN?: string;
  Name?: string;
  Email?: string;
  PhoneNumber?: string;
  Active?: boolean;
  // Money section
  // CreditLimit means how low amount can be
  CreditLimit = 0;
  // Balance means Payment - order amounts
  Balance = 0;

  @Type(() => OrganizationAddress)
  CompanyAddress?: OrganizationAddress;

  @Type(() => OrganizationAddress)
  InvoiceAddress?: OrganizationAddress;

  JoinedUsers: string[] = [];

  @Type(() => String)
  @Transform(({ value }: { value: string }) => trMoment(value), {
    toClassOnly: true
  })
  CreatedDate: moment.Moment = trMoment();

  @Type(() => OrganizationAddress)
  DeliveryAddresses: OrganizationAddress[];

  @Type(() => AccountEvent)
  Events?: AccountEvent[];

  getDeliveryAddress(): OrganizationAddress | undefined {
    let deliveryAddress;
    if (this.DeliveryAddresses.some((d) => d.Active)) {
      deliveryAddress = this.DeliveryAddresses.find((d) => d.Active);
    } else {
      deliveryAddress = this.CompanyAddress;
    }
    return deliveryAddress;
  }
  getCreditLimitAmount(): string {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(
      this.CreditLimit
    );
  }
  getBalanceAmount(): string {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(
      this.Balance
    );
  }
  getAvailableCreditAmount(): string {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(
      this.Balance + this.CreditLimit
    );
  }
  setInvoiceAddress(addr?: OrganizationAddress): void {
    if (!addr) {
      return;
    }
    if (!this.InvoiceAddress) {
      this.InvoiceAddress = plainToInstance(OrganizationAddress, {});
    }
    this.InvoiceAddress.Active = addr.Active;
    this.InvoiceAddress.AddressLine = addr.AddressLine;
    this.InvoiceAddress.City = addr.City;
    this.InvoiceAddress.Country = addr.Country;
    this.InvoiceAddress.County = addr.County;
    this.InvoiceAddress.ZipCode = addr.ZipCode;
  }
  setCompanyAddress(addr?: OrganizationAddress): void {
    if (!addr) {
      return;
    }
    if (!this.CompanyAddress) {
      this.CompanyAddress = plainToInstance(OrganizationAddress, {});
    }
    this.CompanyAddress.Active = addr.Active;
    this.CompanyAddress.AddressLine = addr.AddressLine;
    this.CompanyAddress.City = addr.City;
    this.CompanyAddress.Country = addr.Country;
    this.CompanyAddress.County = addr.County;
    this.CompanyAddress.ZipCode = addr.ZipCode;
  }
  areInvoiceAndCompanyAddressesSame(): boolean {
    if (!this.CompanyAddress || !this.InvoiceAddress) {
      return false;
    }
    return this.CompanyAddress.compareOther(this.InvoiceAddress);
  }
}

export { Organization, OrganizationAddress };
