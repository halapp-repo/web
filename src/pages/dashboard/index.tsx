// material-ui
import { Grid } from '@mui/material';
import PriceTable from './PriceTable';
import MainCard from '../../components/MainCard';

const DashboardDefault = () => {
  return (
    <Grid
      container
      rowSpacing={4.5}
      justifyContent="center"
      columnSpacing={2.75}
      alignItems="center">
      <Grid item xs={12} md={10} lg={9}>
        <MainCard sx={{ mt: 2 }}>
          <PriceTable />
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default DashboardDefault;
