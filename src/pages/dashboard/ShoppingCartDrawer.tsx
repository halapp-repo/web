import React, { useState, useEffect } from 'react';
import { Drawer, Box } from '@mui/material';
import MainCard from '../../components/MainCard';
import ShoppingCartContent from '../shopping-cart/ShoppingCartContent';

const ShoppingCartDrawer = () => {
  const [state, setState] = useState({
    isOpen: true
  });

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setState({ ...state, isOpen: open });
  };
  return (
    <>
      <Drawer
        anchor={'right'}
        open={state.isOpen}
        PaperProps={{
          sx: {
            width: '80%'
          }
        }}
        onClose={toggleDrawer(false)}>
        <ShoppingCartContent />
      </Drawer>
    </>
  );
};

export default ShoppingCartDrawer;
