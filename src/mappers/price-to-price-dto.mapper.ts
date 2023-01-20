import { plainToClass } from 'class-transformer';
import { PriceVM } from '@halapp/common';
import { Price } from '../models/price';
import { IMapper } from './base.mapper';
import { Inventory } from '../models/inventory';

export class PriceToPriceDTOMapper extends IMapper<Price, PriceVM> {
  Inventories?: Inventory[] | null;

  constructor(inventories?: Inventory[] | null) {
    super();
    this.Inventories = inventories;
  }

  setInventories(inventories?: Inventory[] | null) {
    this.Inventories = inventories;
  }

  toDTO(): PriceVM {
    throw new Error('Not Implemented');
  }
  toModel(arg: PriceVM): Price {
    return plainToClass(Price, {
      ProductId: arg.ProductId,
      TS: arg.TS,
      Price: arg.Price,
      Unit: arg.Unit,
      IsToday: arg.IsToday,
      Increase: arg.Increase,
      IsActive: arg.IsActive,
      ProductName:
        this.Inventories?.find((inv) => inv.ProductId === arg.ProductId)?.Name || arg.ProductId
    });
  }
  toListDTO(): PriceVM[] {
    throw new Error('Not Implemented');
  }
}
