import { Box, Divider, List } from '@mui/material';
import IconFruits from '../../components/icons/IconFruits';
import { useAppSelector } from '../../store/hooks';
import { selectShoppingCart } from '../../store/shopping-cart/shoppingCartSlice';
import ShoppingCartListItem from './SCListItem';
import ShoppingCartItemCounter from './SCItemCounter';
import SummaryNCheckout from './SummaryNCheckout';

const ShoppingCartContent = () => {
  const shoppingCart = useAppSelector(selectShoppingCart);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box>
        <ShoppingCartItemCounter ShoppingCart={shoppingCart} />
      </Box>
      <Box sx={{ flexGrow: '1', p: '2px', overflowY: 'auto' }}>
        {shoppingCart.Items.length > 0 ? (
          <List>
            {shoppingCart.Items.map((i, index, arr) => {
              if (arr.length === index + 1) {
                return <ShoppingCartListItem key={i.ProductId} Item={i} />;
              } else {
                return (
                  <>
                    <ShoppingCartListItem key={i.ProductId} Item={i} />
                    <Divider />
                  </>
                );
              }
            })}
          </List>
        ) : (
          <IconFruits Size="large" />
        )}
      </Box>
      <Box sx={{ p: '16px' }}>
        <SummaryNCheckout ShoppingCart={shoppingCart} />
      </Box>
    </Box>
  );
};

export default ShoppingCartContent;
