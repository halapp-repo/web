import { Box } from '@mui/material';
import MainCard from '../../components/MainCard';
import ShoppingCartContent from '../shopping-cart/ShoppingCartContent';

const ShoppingCartInPage = () => {
  return (
    <MainCard
      sx={{
        overflow: 'auto',
        position: 'sticky',
        alignItems: 'normal',
        height: 'calc(100vh - 105px)',
        top: '100px',
        mt: 2
      }}>
      <ShoppingCartContent />
    </MainCard>
  );
};

export default ShoppingCartInPage;
