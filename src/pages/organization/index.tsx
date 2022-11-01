import { ShopFilled } from '@ant-design/icons';
import { Link as RouterLink } from 'react-router-dom';
import { Grid, Card, CardContent, Link, CardMedia } from '@mui/material';
import MainCard from '../../components/MainCard';

const Organization = () => {
  return (
    <Grid
      container
      spacing={3}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        minHeight: '20em'
      }}>
      <Grid item xs={12} sm={9} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
        <MainCard sx={{ width: '100%' }}>
          <Card
            sx={{
              minWidth: '100%',
              height: '100%'
            }}>
            <CardMedia>
              <ShopFilled />
            </CardMedia>
            <CardContent>{}</CardContent>
          </Card>
          <Link underline="none" component={RouterLink} to="/organization/enrollment"></Link>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default Organization;
