import { Price } from '../../models/price';

export interface PricesState {
  [date: string]: Price[];
}
