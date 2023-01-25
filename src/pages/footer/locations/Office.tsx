import { Box, Typography, Stack } from '@mui/material';
import locations, { Office } from './locations';
import MainCard from '../../../components/MainCard';
import PageWrapper from '../../../components/PageWrapper';
import { useParams } from 'react-router-dom';

const OfficeContent = () => {
  const { city = '', office = '' } = useParams();
  const getContent = () => {
    const offices = (locations as never)[city];
    const content = ((offices || {}) as never)[office] as Office;
    if (!offices || !content) {
      return (
        <Box sx={{ p: '30px' }}>
          <Typography variant={'h5'}>{'Bulunmayan ofis'}</Typography>
        </Box>
      );
    } else {
      return (
        <Box sx={{ p: '10px' }}>
          <iframe src={content.map} width="100%" height="50%" frameBorder="0" />
          <Stack spacing={1}>
            <Typography variant="h4">{content.tr}</Typography>
            <Typography variant="h5" color="secondary">
              {content.address}
            </Typography>
          </Stack>
        </Box>
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
          <Box sx={{ minHeight: '300px' }}>{getContent()}</Box>
        </MainCard>
      </Stack>
    </PageWrapper>
  );
};

export default OfficeContent;
