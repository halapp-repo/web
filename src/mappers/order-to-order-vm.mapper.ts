import { OrderVM } from '@halapp/common';
import { plainToClass } from 'class-transformer';
import { Order } from '../models/order';
import { IMapper } from './base.mapper';

export class OrderToOrderVMMapper extends IMapper<Order, OrderVM> {
  toDTO(): OrderVM {
    throw new Error('Not Implemented');
  }
  toModel(arg: OrderVM): Order {
    return plainToClass(Order, {
      Id: arg.Id!,
      OrganizationId: arg.OrganizationId,
      DeliveryAddress: {
        AddressLine: arg.DeliveryAddress.AddressLine,
        County: arg.DeliveryAddress.County,
        City: arg.DeliveryAddress.City,
        ZipCode: arg.DeliveryAddress.ZipCode,
        Country: arg.DeliveryAddress.Country
      },
      CreatedBy: arg.CreatedBy,
      Items: arg.Items.map((i) => ({
        ProductId: i.ProductId,
        Price: i.Price,
        Count: i.Count,
        Unit: i.Unit
      })),
      Note: arg.Note,
      CreatedDate: arg.CreatedDate!,
      Status: arg.Status
    } as OrderVM);
  }
}
