import { Type } from 'class-transformer';

class ShoppingCartItem {
  ProductId: string;
  Count: number;
}

class ShoppingCart {
  @Type(() => ShoppingCartItem)
  Items: ShoppingCartItem[];
}

export { ShoppingCart, ShoppingCartItem };
