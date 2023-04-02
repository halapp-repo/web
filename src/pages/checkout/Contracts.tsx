import { ExtraCharge } from '@halapp/common';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Collapse, Stack, Theme, Typography, useMediaQuery } from '@mui/material';
import { useContext, useState } from 'react';

import { ExpandMore } from '../../components/ExpandMoreButton';
import { Organization } from '../../models/organization';
import { DistantSaleContract } from './DistantSaleContract';
import { ForeknowledgeContract } from './ForeknowledgeContract';
import { ReturnPolicyContract } from './ReturnPolicyContract';
import { ShoppingCartContext } from './ShoppingCartContext';

interface ContractsProps {
  Organization: Organization;
  ExtraCharges?: ExtraCharge[];
}

const Contracts = ({ Organization, ExtraCharges }: ContractsProps) => {
  const shoppingCart = useContext(ShoppingCartContext);
  const matchesSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const [expanded, setExpanded] = useState(matchesSm ? false : true);
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
        <DistantSaleContract
          ShoppingCart={shoppingCart}
          ExtraCharges={ExtraCharges}
          Organization={Organization}
        />
      </Collapse>
    </Stack>
  );
};

export { Contracts };
