import { Type } from 'class-transformer';

class ShoppingCartItemDTO {
  ProductId: string;
  Name: string;
  Price?: number;
  Count: number;

  get UnitAmount(): string | undefined {
    if (!this.Price) {
      return undefined;
    }
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(
      this.Price
    );
  }
  get TotalAmount(): string | undefined {
    if (!this.Price) {
      return undefined;
    }
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(
      this.Price * this.Count
    );
  }
}

class ShoppingCartDTO {
  @Type(() => ShoppingCartItemDTO)
  Items: ShoppingCartItemDTO[];

  get TotalAmount(): string {
    let total = 0;
    for (const item of this.Items) {
      if (item.Price) {
        total += item.Count * item.Price;
      }
    }
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(total);
  }
}

export { ShoppingCartDTO, ShoppingCartItemDTO };
