// material-ui

import { Grid, useMediaQuery, Theme } from '@mui/material';
import PriceTable from './PriceTable';
import MainCard from '../../components/MainCard';
import PriceFilter from './PriceFilter';
import ShoppingCartDrawer from './ShoppingCartDrawer';
import ShoppingCartInPage from './ShoppingCartInPage';

const Dashboard = () => {
  const matchesMd = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  return (
    <Grid container rowSpacing={4.5} justifyContent="right" columnSpacing={2.75} alignItems="right">
      <Grid item xs={12} sm={3} md={3} lg={3}>
        <MainCard sx={{ mt: 2 }}>
          <PriceFilter />
        </MainCard>
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={6}>
        <MainCard sx={{ mt: 2 }}>
          <PriceTable />
        </MainCard>
      </Grid>
      <Grid item xs={12} sm={3} md={3} lg={3}>
        {!matchesMd && <ShoppingCartInPage />}
        {matchesMd && <ShoppingCartDrawer />}
      </Grid>
    </Grid>
  );
};

export default Dashboard;
