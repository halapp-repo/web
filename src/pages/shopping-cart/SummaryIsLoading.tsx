import { Divider, CircularProgress, Stack } from '@mui/material';

const SummaryIsLoading = () => {
  return (
    <>
      <Divider sx={{ marginBottom: '10px' }} />
      <Stack spacing={2} alignItems="center">
        <CircularProgress />
      </Stack>
    </>
  );
};

export default SummaryIsLoading;
