import {
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
  Stack,
  Box,
  DialogActions,
  Button,
  OutlinedInput,
  InputAdornment
} from '@mui/material';
import { useState } from 'react';
import { Organization } from '../../../models/organization';
import { useAppDispatch } from '../../../store/hooks';
import { toggleOrganizationActivation } from '../../../store/organizations/organizationsSlice';

interface DialogOrganizationActivationProps {
  Organization: Organization;
  NewActivationStatus: boolean;
  IsOpen: boolean;
  OnClose: () => void;
}
const MIN_BALANCE = 0;
const MAX_BALANCE = 100000;

const DialogOrganizationActivation = ({
  IsOpen,
  OnClose,
  Organization,
  NewActivationStatus
}: DialogOrganizationActivationProps) => {
  const dispatch = useAppDispatch();
  const [newBalance, setBalance] = useState(Organization.Balance);

  const handleSetActivation = () => {
    dispatch(
      toggleOrganizationActivation({
        Activation: NewActivationStatus,
        Balance: newBalance || 0,
        OrganizationId: Organization.ID!
      })
    );
    OnClose();
  };

  return (
    <Dialog
      PaperProps={{
        sx: {
          width: '375px'
        }
      }}
      sx={{ borderRadius: '8px' }}
      onClose={OnClose}
      open={IsOpen}>
      <DialogTitle
        sx={{ backgroundColor: '#F0F2F2', padding: '0 24px', borderBottom: '1px solid #D5D9D9' }}>
        <Typography
          variant="h4"
          fontWeight={700}
          fontSize={'16px'}
          sx={{ padding: '16px 0', minHeight: '56px', lineHeight: '24px' }}>
          {'Activation & Balance'}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Box />
          <Typography variant="body2" color="secondary">
            {'You are about to change of activation and balance of organization.'}
          </Typography>
          <Typography variant="body2" color="primary">
            {`Min balance is ₺${MIN_BALANCE}, and  Max Balance ₺${MAX_BALANCE}`}
          </Typography>
          <OutlinedInput
            type="number"
            fullWidth
            startAdornment={<InputAdornment position="start">₺</InputAdornment>}
            value={newBalance}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (!val || (val >= MIN_BALANCE && val <= MAX_BALANCE)) {
                setBalance(val);
              }
            }}
          />
        </Stack>
      </DialogContent>
      <DialogActions
        sx={{
          paddingLeft: '24px',
          paddingRight: '24px',
          justifyContent: 'space-between',
          marginBottom: '10px'
        }}>
        <Button variant="outlined" color="blackNWhite" onClick={OnClose}>
          {'Kapat'}
        </Button>
        {Organization.Active !== NewActivationStatus &&
          (NewActivationStatus === true ? (
            <Button variant="contained" onClick={handleSetActivation}>
              Activate
            </Button>
          ) : (
            <Button variant="contained" color="error" onClick={handleSetActivation}>
              Deactivate
            </Button>
          ))}
        {Organization.Active === NewActivationStatus && newBalance !== Organization.Balance && (
          <Button variant="contained" onClick={handleSetActivation}>
            Change Balance
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export { DialogOrganizationActivation };
