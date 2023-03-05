import { Stack, Button, Typography } from '@mui/material';

interface RetryOnErrorProps {
  HandleRetry: () => void;
}

const RetryOnError = ({ HandleRetry }: RetryOnErrorProps) => {
  return (
    <Stack spacing={2} alignItems="center">
      <Typography variant="h5">{'Hay Aksi!'}</Typography>
      <Typography variant="body1" color="text.secondary">
        {'Bir şeyler yanlış gitti. Lütfen tekrar deneyin.'}
      </Typography>
      <Button color="primary" variant="contained" sx={{ width: '200px' }} onClick={HandleRetry}>
        {'Yeniden Dene.'}
      </Button>
    </Stack>
  );
};

export { RetryOnError };
