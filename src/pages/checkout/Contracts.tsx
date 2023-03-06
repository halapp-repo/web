import { Stack, Typography } from '@mui/material';
import { DistantSaleContract } from './DistantSaleContract';
import { ForeknowledgeContract } from './ForeknowledgeContract';
import { ReturnPolicyContract } from './ReturnPolicyContract';

const Contracts = () => {
  return (
    <Stack spacing={3}>
      <Typography variant="h5" color="text.secondary">
        <b>Sözleşmeler ve Formlar</b>
      </Typography>
      <ReturnPolicyContract />
      <ForeknowledgeContract />
      <DistantSaleContract />
    </Stack>
  );
};

export { Contracts };
