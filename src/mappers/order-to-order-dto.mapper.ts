import { plainToClass } from 'class-transformer';
import { OrderDTO } from '../models/dtos/order.dto';
import { PriceDTO } from '../models/dtos/price.dto';
import { Order } from '../models/order';
import { Price } from '../models/price';
import { IMapper } from './base.mapper';

export class OrderToOrderDTOMapper extends IMapper<Order, OrderDTO> {
  toDTO(): OrderDTO {
    throw new Error('Not Implemented');
  }
  toModel(arg: OrderDTO): Order {
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
    });
  }
}
