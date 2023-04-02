import { plainToInstance } from 'class-transformer';
import React from 'react';

import { ShoppingCartList } from '../../models/viewmodels/shopping-cart-list-item';

const ShoppingCartContext = React.createContext<ShoppingCartList>(
  plainToInstance(ShoppingCartList, {})
);

export { ShoppingCartContext };
