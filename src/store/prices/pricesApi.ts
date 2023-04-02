import { PriceVM } from '@halapp/common';
import axios from 'axios';

export class PricesApi {
  baseUrl: string;
  constructor() {
    const baseUrl = process.env.REACT_APP_LISTING_BASE_URL;
    if (!baseUrl) {
      throw new Error('REACT_APP_LISTING_BASE_URL is not set!');
    }
    this.baseUrl = baseUrl;
  }

  async fetchPrice(location: string, type: string, date: string): Promise<PriceVM[]> {
    return await axios
      .get<PriceVM[]>(`/prices`, {
        baseURL: this.baseUrl,
        params: {
          location,
          type,
          date
        }
      })
      .then((response) => {
        const { data } = response;
        return data;
      });
  }
}
