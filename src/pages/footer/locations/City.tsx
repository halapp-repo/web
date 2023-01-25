import { Box, Typography, Stack, Button } from '@mui/material';
import locations, { Office } from './locations';
import MainCard from '../../../components/MainCard';
import PageWrapper from '../../../components/PageWrapper';
import { useParams, Link as RouterLink } from 'react-router-dom';

const City = () => {
  const { city = '' } = useParams();
  const getOffices = () => {
    const offices = (locations as never)[city];
    if (!offices) {
      return (
        <Box>
          <Typography variant={'h5'}>{'Bulunmayan şehir'}</Typography>
        </Box>
      );
    } else {
      return (
        <>
          {Object.keys(offices).map((o) => {
            const office = offices[o] as Office;
            return (
              <Box key={o}>
                <Button color="blackNWhite" to={`/locations/${city}/${o}`} component={RouterLink}>
                  <Typography variant={'h5'}>{office.tr}</Typography>
                </Button>
              </Box>
            );
          })}
        </>
      );
    }
  };
  return (
    <PageWrapper md={6} lg={4}>
      <Stack spacing={1}>
        <Typography variant="h4" color="secondary">
          {city}
        </Typography>
        <MainCard>
          <Box sx={{ minHeight: '300px', p: '30px' }}>{getOffices()}</Box>
        </MainCard>
      </Stack>
    </PageWrapper>
  );
};

export default City;
