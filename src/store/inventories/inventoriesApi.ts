import axios from 'axios';
import { InventoryVM } from '@halapp/common';

export class InventoriesApi {
  baseUrl: string;
  constructor() {
    const baseUrl = process.env.REACT_APP_LISTING_BASE_URL;
    if (!baseUrl) {
      throw new Error('REACT_APP_LISTING_BASE_URL is not set!');
    }
    this.baseUrl = baseUrl;
  }
  async fetchInventories(): Promise<InventoryVM[]> {
    return await axios
      .get<InventoryVM[]>('/inventories', {
        baseURL: this.baseUrl
      })
      .then((response) => {
        const { data } = response;
        return data;
      });
  }
}
