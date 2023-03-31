import { Stack, Typography } from '@mui/material';

interface ProfileEmailProps {
  Email: string;
}

const ProfileEmail = ({ Email }: ProfileEmailProps) => {
  return (
    <Stack justifyContent={'center'} alignItems={'center'}>
      <Typography
        variant="body2"
        fontWeight={'bold'}
        color="secondary"
        sx={{ textTransform: 'lowercase' }}>
        {Email}
      </Typography>
    </Stack>
  );
};

export { ProfileEmail };
