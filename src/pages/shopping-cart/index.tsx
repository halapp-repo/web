import MainCard from '../../components/MainCard';
import PageWrapper from '../../components/PageWrapper';
import ShoppingCartContent from './SCContent';

const ShoppingCart = () => {
  return (
    <PageWrapper md={6} lg={4}>
      <MainCard>
        <ShoppingCartContent />
      </MainCard>
    </PageWrapper>
  );
};

export default ShoppingCart;
