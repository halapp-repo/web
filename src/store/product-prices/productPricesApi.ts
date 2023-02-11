import axios from 'axios';
import { CityType, ProductType } from '@halapp/common';
import { PriceVM } from '@halapp/common';
import { IntervalType } from '../../models/interval-type';

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
    duration: IntervalType,
    location: CityType,
    type: ProductType,
    fromDate: string,
    toDate?: string
  ): Promise<PriceVM[]> {
    return await axios
      .get<PriceVM[]>(`/products/${productId}/prices`, {
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
        return data;
      });
  }
}
