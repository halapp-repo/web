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
  InputAdornment,
  Alert
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
const MIN_CREDIT = 0;
const MAX_CREDIT = 100000;

const DialogOrganizationActivation = ({
  IsOpen,
  OnClose,
  Organization,
  NewActivationStatus
}: DialogOrganizationActivationProps) => {
  const dispatch = useAppDispatch();
  const [newCreditLimit, setCreditLimit] = useState(Organization.CreditLimit);

  const handleSetActivation = () => {
    dispatch(
      toggleOrganizationActivation({
        Activation: NewActivationStatus,
        CreditLimit: newCreditLimit || 0,
        OrganizationId: Organization.ID!
      })
    );
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
          fontWeight={700}
          fontSize={'16px'}
          sx={{ padding: '16px 0', minHeight: '56px', lineHeight: '24px' }}>
          {'Activation & Credit Limit'}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Box />
          <Typography variant="body2" color="secondary">
            {'You are about to change of activation and credit limit of organization.'}
          </Typography>
          <Alert severity="warning">
            {`Min Credit Limit is ${new Intl.NumberFormat('tr-TR', {
              style: 'currency',
              currency: 'TRY'
            }).format(MIN_CREDIT)}, and  Max Credit Limit ${new Intl.NumberFormat('tr-TR', {
              style: 'currency',
              currency: 'TRY'
            }).format(MAX_CREDIT)}`}
          </Alert>
          <OutlinedInput
            type="number"
            fullWidth
            startAdornment={<InputAdornment position="start">₺</InputAdornment>}
            value={newCreditLimit}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (!val || (val >= MIN_CREDIT && val <= MAX_CREDIT)) {
                setCreditLimit(val);
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
        {Organization.Active === NewActivationStatus &&
          newCreditLimit !== Organization.CreditLimit && (
            <Button variant="contained" onClick={handleSetActivation}>
              Change Limit
            </Button>
          )}
      </DialogActions>
    </Dialog>
  );
};

export { DialogOrganizationActivation };
