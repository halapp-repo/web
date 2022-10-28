import { ShopFilled, LoginOutlined } from '@ant-design/icons';
import { Link as RouterLink } from 'react-router-dom';
import { Grid, Stack, Card, CardContent, Link, CardMedia } from '@mui/material';
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
        <Stack direction={'row'} sx={{ marginTop: '30px' }} spacing={2}>
          <MainCard>
            <Link underline="none" component={RouterLink} to="/organization/enrollment">
              <Card
                sx={{
                  height: '100%',
                  width: {
                    xs: '150px',
                    sm: '200px'
                  }
                }}>
                <CardMedia>
                  <ShopFilled />
                </CardMedia>
                <CardContent>{}</CardContent>
              </Card>
            </Link>
          </MainCard>
          <MainCard>
            <Link underline="none" component={RouterLink} to="/signin">
              <Card
                sx={{
                  height: '100%',
                  width: {
                    xs: '150px',
                    sm: '200px'
                  }
                }}>
                <CardMedia>
                  <LoginOutlined />
                </CardMedia>
              </Card>
            </Link>
          </MainCard>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Organization;
