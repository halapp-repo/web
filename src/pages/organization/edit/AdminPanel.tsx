import { Stack, Grid, Switch, OutlinedInput, InputAdornment, Typography } from '@mui/material';
import { Organization } from '../../../models/organization';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { useState, useEffect } from 'react';
import { DialogOrganizationActivation } from './DialogOrganizationActivation';
import { blue } from '@mui/material/colors';

interface OrganizationAdminPanelProps {
  Organization: Organization;
}

const OrganizationAdminPanel = ({ Organization }: OrganizationAdminPanelProps) => {
  const [active, setActive] = useState<boolean>(Organization.Active === true);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  useEffect(() => {
    setDialogOpen(false);
  }, [Organization]);

  return (
    <>
      <Stack spacing={2}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="body2" color="secondary" fontWeight={'bold'}>
              {'Activation Status'}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <PowerSettingsNewIcon color={'info'} fontSize="large" />
          </Grid>
          <Grid item xs={10}>
            <Switch
              checked={active}
              onChange={(e) => {
                setActive(e.target.checked);
                setDialogOpen(true);
              }}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </Grid>
        </Grid>
        {Organization.Active && (
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="body2" color="secondary" fontWeight={'bold'}>
                {'Credit Limit'}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <CreditCardIcon color={'info'} fontSize="large" />
            </Grid>
            <Grid item xs={10}>
              <OutlinedInput
                type="number"
                fullWidth
                sx={{
                  color: `${blue['A400']}!important`,
                  '& .MuiInputBase-input.Mui-disabled': {
                    WebkitTextFillColor: blue['A400']
                  }
                }}
                startAdornment={<InputAdornment position="start">₺</InputAdornment>}
                value={Organization.CreditLimit || 0}
                disabled
                onClick={() => {
                  setDialogOpen(true);
                }}
              />
            </Grid>
          </Grid>
        )}
      </Stack>
      <DialogOrganizationActivation
        Organization={Organization}
        NewActivationStatus={active}
        IsOpen={isDialogOpen}
        OnClose={() => {
          setDialogOpen(false);
          setTimeout(() => {
            setActive(Organization.Active === true);
          }, 100);
        }}
      />
    </>
  );
};

export { OrganizationAdminPanel };
