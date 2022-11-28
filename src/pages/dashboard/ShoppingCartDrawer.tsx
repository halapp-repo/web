import React, { useState } from 'react';
import { Drawer } from '@mui/material';
import ShoppingCartContent from '../shopping-cart/SCContent';
import { selectUIShoppingCartIsOpen, toggleShoppingCart } from '../../store/ui/uiSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const ShoppingCartDrawer = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectUIShoppingCartIsOpen);

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
            width: { xs: '80%', md: '50', lg: '30%' }
          }
        }}
        onClose={toggleDrawer(false)}>
        <ShoppingCartContent />
      </Drawer>
    </>
  );
};

export default ShoppingCartDrawer;
