import axios from 'axios';
import { PriceToPriceDTOMapper } from '../../mappers/price-to-price-dto.mapper';
import { City } from '../../models/city';
import { PriceDTO } from '../../models/dtos/price.dto';
import { IntervalType } from '../../models/interval-type';
import { Price } from '../../models/price';
import { ProductType } from '../../models/product-type';

export class ProductPricesApi {
  baseUrl: string;
  mapper: PriceToPriceDTOMapper;
  constructor() {
    const baseUrl = process.env.REACT_APP_LISTING_BASE_URL;
    if (!baseUrl) {
      throw new Error('REACT_APP_LISTING_BASE_URL is not set!');
    }
    this.baseUrl = baseUrl;
    this.mapper = new PriceToPriceDTOMapper();
  }

  async fetchProductPrices(
    productId: string,
    duration: IntervalType,
    location: City,
    type: ProductType,
    fromDate: string,
    toDate?: string
  ): Promise<Price[]> {
    return await axios
      .get<PriceDTO[]>(`/products/${productId}/prices`, {
        baseURL: this.baseUrl,
        params: {
          duration,
          location,
          type,
          from_date: fromDate,
          ...(toDate
            ? {
                to_date: toDate
              }
            : null)
        }
      })
      .then((response) => {
        const { data } = response;
        return this.mapper.toListModel(data);
      });
  }
}
