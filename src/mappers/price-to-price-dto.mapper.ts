import { PriceDTO } from '../models/dtos/price.dto';
import { Price } from '../models/price';
import { IMapper } from './base.mapper';

export class PriceToPriceDTOMapper extends IMapper<Price, PriceDTO> {
  toDTO(arg: Price): PriceDTO {
    throw new Error('Not Implemented');
  }
  toModel(arg: PriceDTO): Price {
    return <Price>{
      ProductId: arg.ProductId,
      TS: arg.TS,
      Price: arg.Price,
      Unit: arg.Unit
    };
  }
  toListDTO(arg: Price[]): PriceDTO[] {
    throw new Error('Not Implemented');
  }
}
