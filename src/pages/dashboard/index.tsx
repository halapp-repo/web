// material-ui
import { Grid } from '@mui/material';
import PriceTable from './PriceTable';
import MainCard from '../../components/MainCard';
import { useEffect } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { fetchInventories } from '../../store/inventories/inventoriesSlice';
import * as moment from 'moment-timezone';
import { updateListingSelectedDate } from '../../store/ui/uiSlice';
import Contact from './Contact';
import PriceFilter from './PriceFilter';

const DashboardDefault = () => {
  const dispatch = useAppDispatch();

  // Fetch inital Data
  useEffect(() => {
    dispatch(updateListingSelectedDate(moment.tz('Europe/Istanbul').format('YYYY-MM-DD')));
    dispatch(fetchInventories());
  }, []);

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
        <MainCard sx={{ mt: 2 }}>
          <Contact />
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default DashboardDefault;
