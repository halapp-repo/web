import axios from 'axios';
import { plainToClass } from 'class-transformer';
import { PriceDTO } from '../../models/dtos/price.dto';
import { Price } from '../../models/price';

export class PricesApi {
  baseUrl: string;
  constructor() {
    const baseUrl = process.env.REACT_APP_LISTING_BASE_URL;
    if (!baseUrl) {
      throw new Error('REACT_APP_LISTING_BASE_URL is not set!');
    }
    this.baseUrl = baseUrl;
  }

  async fetchPrice(
    location: string,
    type: string,
    fromDate?: string,
    toDate?: string
  ): Promise<Price[]> {
    return await axios
      .get<PriceDTO[]>(`/prices`, {
        baseURL: this.baseUrl,
        params: {
          location,
          type,
          ...(fromDate
            ? {
                from_date: fromDate
              }
            : null),
          ...(toDate
            ? {
                to_date: toDate
              }
            : null)
        }
      })
      .then((response) => {
        const { data } = response;
        return data.map((d) => plainToClass(Price, d));
      });
  }
}
