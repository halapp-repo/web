import React from 'react';
import { ShoppingCartList } from '../../models/viewmodels/shopping-cart-list-item';
import { plainToInstance } from 'class-transformer';

const ShoppingCartContext = React.createContext<ShoppingCartList>(
  plainToInstance(ShoppingCartList, {})
);

export { ShoppingCartContext };
