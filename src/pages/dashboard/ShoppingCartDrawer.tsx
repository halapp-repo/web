import { Drawer } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectUIShoppingCartIsOpen, toggleShoppingCart } from '../../store/ui/uiSlice';
import ShoppingCartContent from '../shopping-cart/SCContent';

const ShoppingCartDrawer = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectUIShoppingCartIsOpen);

  useEffect(() => {
    return () => {
      dispatch(toggleShoppingCart(false));
    };
  }, []);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    dispatch(toggleShoppingCart(open));
  };

  return (
    <>
      <Drawer
        anchor={'right'}
        open={isOpen}
        PaperProps={{
          sx: {
            width: { xs: '80%', sm: '50%', md: '40%', lg: '30%' }
          }
        }}
        onClose={toggleDrawer(false)}>
        <ShoppingCartContent />
      </Drawer>
    </>
  );
};

export default ShoppingCartDrawer;
