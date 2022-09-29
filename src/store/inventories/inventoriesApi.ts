import axios from 'axios';
import { InventoryDTO } from '../../models/dtos/inventory.dto';
import { Inventory } from '../../models/inventory';

export class InventoriesApi {
  baseUrl: string;
  constructor() {
    const baseUrl = process.env.REACT_APP_LISTING_BASE_URL;
    if (!baseUrl) {
      throw new Error('REACT_APP_LISTING_BASE_URL is not set!');
    }
    this.baseUrl = baseUrl;
  }
  async fetchInventories(): Promise<Inventory[]> {
    return await axios
      .get<InventoryDTO[]>('/inventories', {
        baseURL: this.baseUrl
      })
      .then((response) => {
        const { data } = response;
        return data.map(
          (d) =>
            <Inventory>{
              InventoryType: d.InventoryType,
              Type: d.Type,
              ProductId: d.ProductId,
              Name: d.Name,
              ImageUrl: d.ImageUrl
            }
        );
      });
  }
}
