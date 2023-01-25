import { Box, Typography, Button } from '@mui/material';
import MainCard from '../../../components/MainCard';
import PageWrapper from '../../../components/PageWrapper';
import locations from './locations';
import { Link as RouterLink } from 'react-router-dom';

const CompanyLocations = () => {
  const getCities = () => {
    const cities = Object.keys(locations);
    return cities.map((c) => (
      <Box key={c}>
        <Button color="blackNWhite" to={`/locations/${c}`} component={RouterLink}>
          <Typography variant={'h5'}>{c}</Typography>
        </Button>
      </Box>
    ));
  };

  return (
    <PageWrapper md={6} lg={4}>
      <MainCard>
        <Box sx={{ minHeight: '300px', p: '30px' }}>{getCities()}</Box>
      </MainCard>
    </PageWrapper>
  );
};

export default CompanyLocations;
