import { Inventory } from '../../models/inventory';

export interface InventoriesState {
  inventories?: Inventory[] | null;
}
