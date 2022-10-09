import axios from 'axios';
import { plainToClass } from 'class-transformer';
import { City } from '../../models/city';
import { PriceDTO } from '../../models/dtos/price.dto';
import { DurationType } from '../../models/duration-type';
import { Price } from '../../models/price';
import { ProductType } from '../../models/product-type';

export class ProductPricesApi {
  baseUrl: string;
  constructor() {
    const baseUrl = process.env.REACT_APP_LISTING_BASE_URL;
    if (!baseUrl) {
      throw new Error('REACT_APP_LISTING_BASE_URL is not set!');
    }
    this.baseUrl = baseUrl;
  }

  async fetchProductPrices(
    productId: string,
    duration: DurationType,
    location: City,
    type: ProductType
  ): Promise<Price[]> {
    return await axios
      .get<PriceDTO[]>(`/products/${productId}/prices`, {
        baseURL: this.baseUrl,
        params: {
          duration,
          location,
          type
        }
      })
      .then((response) => {
        const { data } = response;
        return data.map((d) => plainToClass(Price, d));
      });
  }
}
