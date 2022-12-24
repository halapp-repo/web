class PriceListItemVM {
  Price: number;
  ProductName: string;
  Unit: string;
  ProductId: string;
  Increase: number;
  IsToday: boolean;
  IsActive: boolean;

  get Amount(): string {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(
      this.Price
    );
  }
}

export { PriceListItemVM };
