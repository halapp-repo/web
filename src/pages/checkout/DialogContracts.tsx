import {
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  useMediaQuery,
  Theme,
  DialogContent,
  DialogProps,
  DialogActions,
  Button,
  IconButton
} from '@mui/material';
import { useState, useContext } from 'react';
import { DistantSaleContract } from './DistantSaleContract';
import { ForeknowledgeContract } from './ForeknowledgeContract';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch } from '../../store/hooks';
import { updateCheckout } from '../../store/ui/uiSlice';
import { ShoppingCartContext } from './ShoppingCartContext';
import { Organization } from '../../models/organization';
import { ExtraCharge } from '@halapp/common';

interface DialogContractsProps {
  IsDialogOpen: boolean;
  OnChangeDialogOpen: (isOpen: boolean) => void;
  Organization: Organization;
  ExtraCharges?: ExtraCharge[];
}

const DialogContracts = ({
  IsDialogOpen,
  OnChangeDialogOpen,
  Organization,
  ExtraCharges
}: DialogContractsProps) => {
  const dispatch = useAppDispatch();
  const shoppingCart = useContext(ShoppingCartContext);
  const matchesSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const [maxWidth] = useState<DialogProps['maxWidth']>('xs');

  const handleOnApprove = () => {
    dispatch(
      updateCheckout({
        approvedContract: true
      })
    );
    OnChangeDialogOpen(false);
  };

  return (
    <Dialog
      fullScreen={matchesSm ? true : false}
      fullWidth={matchesSm ? false : true}
      maxWidth={maxWidth}
      open={IsDialogOpen}
      onClose={() => {
        OnChangeDialogOpen(false);
      }}
      scroll={'paper'}>
      <DialogTitle id="scroll-dialog-title">
        <Stack direction={'row'}>
          <Typography variant="h4" fontWeight={'bold'}>
            Sözleşmeler ve Formlar
          </Typography>
          <IconButton
            aria-label="close"
            onClick={() => {
              OnChangeDialogOpen(false);
            }}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500]
            }}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3}>
          <ForeknowledgeContract />
          <DistantSaleContract
            Organization={Organization}
            ShoppingCart={shoppingCart}
            ExtraCharges={ExtraCharges}
          />
        </Stack>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'center'
        }}>
        <Button fullWidth variant="contained" size={'large'} onClick={handleOnApprove}>
          {'Onaylıyorum'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { DialogContracts };
