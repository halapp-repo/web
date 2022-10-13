export interface PriceDTO {
  ProductId: string;
  TS: string;
  Price: number;
  Unit: string;
  IsToday?: boolean;
  Increase?: number;
}
