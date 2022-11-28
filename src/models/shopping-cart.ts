import { Type } from 'class-transformer';

class ShoppingCartItem {
  ProductId: string;
  Name: string;
  Price: number;
  Count: number;
}

class ShoppingCart {
  @Type(() => ShoppingCartItem)
  Items: ShoppingCartItem[];

  get TotalAmount(): string {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(0);
  }
}

export { ShoppingCart, ShoppingCartItem };
