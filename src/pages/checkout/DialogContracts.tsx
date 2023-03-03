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
import { useState } from 'react';
import { DistantSaleContract } from './DistantSaleContract';
import { ForeknowledgeContract } from './ForeknowledgeContract';
import CloseIcon from '@mui/icons-material/Close';

interface DialogContractsProps {
  IsDialogOpen: boolean;
  OnChangeDialogOpen: (isOpen: boolean) => void;
}

const DialogContracts = ({ IsDialogOpen, OnChangeDialogOpen }: DialogContractsProps) => {
  const matchesSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const [maxWidth] = useState<DialogProps['maxWidth']>('xs');

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
          <DistantSaleContract />
        </Stack>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'center'
        }}>
        <Button fullWidth variant="contained" size={'large'}>
          {'Onaylıyorum'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { DialogContracts };
