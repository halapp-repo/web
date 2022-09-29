// material-ui
import { Grid } from '@mui/material';
import PriceTable from './PriceTable';
import MainCard from '../../components/MainCard';
import { useEffect } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { fetchInventories } from '../../store/inventories/inventoriesSlice';
import * as moment from 'moment-timezone';
import { updatePricesSelectedDate } from '../../store/ui/uiSlice';

const DashboardDefault = () => {
  const dispatch = useAppDispatch();

  // Fetch inital Data
  useEffect(() => {
    dispatch(updatePricesSelectedDate(moment.tz('Europe/Istanbul').format('YYYY-MM-DD')));
    dispatch(fetchInventories());
  }, []);

  return (
    <Grid
      container
      rowSpacing={4.5}
      justifyContent="center"
      columnSpacing={2.75}
      alignItems="center">
      <Grid item xs={12} md={10} lg={8}>
        <MainCard sx={{ mt: 2 }}>
          <PriceTable />
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default DashboardDefault;
