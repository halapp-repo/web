import { ShoppingCart } from '../shopping-cart';
import { UserVMWithPreview } from './user-with-preview';

export interface UserSessionStorage {
  email: string;
  id: string;
  isAdmin: boolean;
  profile?: UserVMWithPreview;
  cart?: ShoppingCart;
}
