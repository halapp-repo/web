import { Stack, Typography, Collapse } from '@mui/material';
import { useState } from 'react';
import { DistantSaleContract } from './DistantSaleContract';
import { ForeknowledgeContract } from './ForeknowledgeContract';
import { ReturnPolicyContract } from './ReturnPolicyContract';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ExpandMore } from '../../components/ExpandMoreButton';

const Contracts = () => {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Stack spacing={3}>
      <Stack justifyContent={'space-between'} direction="row">
        <Typography variant="h5" color="text.secondary">
          <b>Sözleşmeler ve Formlar</b>
        </Typography>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more">
          <ExpandMoreIcon />
        </ExpandMore>
      </Stack>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <ReturnPolicyContract />
        <ForeknowledgeContract />
        <DistantSaleContract />
      </Collapse>
    </Stack>
  );
};

export { Contracts };
