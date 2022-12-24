import { Type } from 'class-transformer';

class ShoppingCartListItem {
  ProductId: string;
  Name: string;
  Price?: number;
  Count: number;
  Unit?: string;

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

class ShoppingCartList {
  @Type(() => ShoppingCartListItem)
  Items: ShoppingCartListItem[];

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

export { ShoppingCartList, ShoppingCartListItem };
