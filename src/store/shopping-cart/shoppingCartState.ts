interface ShoppingCartItem {
  productId: string;
  count: number;
}

export interface ShoppingCartState {
  items: ShoppingCartItem[];
}
