// material-ui
import { Grid } from '@mui/material';
import PriceTable from './PriceTable';
import MainCard from '../../components/MainCard';
import { useEffect } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { fetchInventories } from '../../store/inventories/inventoriesSlice';
import * as moment from 'moment-timezone';
import { updateSelectedDate } from '../../store/ui/uiSlice';
import Contact from './Contact';

const DashboardDefault = () => {
  const dispatch = useAppDispatch();

  // Fetch inital Data
  useEffect(() => {
    dispatch(updateSelectedDate(moment.tz('Europe/Istanbul').format('YYYY-MM-DD')));
    dispatch(fetchInventories());
  }, []);

  return (
    <Grid container rowSpacing={4.5} justifyContent="right" columnSpacing={2.75} alignItems="right">
      <Grid item xs={12} sm={6} md={8} lg={6}>
        <MainCard sx={{ mt: 2 }}>
          <PriceTable />
        </MainCard>
      </Grid>
      <Grid item xs={12} sm={4} md={3} lg={4}>
        <MainCard sx={{ mt: 2 }}>
          {' '}
          <Contact />{' '}
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default DashboardDefault;
