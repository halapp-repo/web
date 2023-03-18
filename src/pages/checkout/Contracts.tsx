import { Stack, Typography, Collapse, useMediaQuery, Theme } from '@mui/material';
import { useState, useContext } from 'react';
import { DistantSaleContract } from './DistantSaleContract';
import { ForeknowledgeContract } from './ForeknowledgeContract';
import { ReturnPolicyContract } from './ReturnPolicyContract';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ExpandMore } from '../../components/ExpandMoreButton';
import { ShoppingCartContext } from './ShoppingCartContext';
import { ExtraCharge } from '@halapp/common';
import { Organization } from '../../models/organization';

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
