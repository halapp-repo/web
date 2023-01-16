import { Typography, Stack, Button, Box, ListItem, ListItemText, Chip } from '@mui/material';
import { OrganizationAddress } from '../../../models/organization';
import { red } from '@mui/material/colors';

interface CompanyAddressListItemProps {
  Address: OrganizationAddress;
  OnSetDefault: () => void;
  IsDefault: boolean;
}

const CompanyAddressListItem = ({
  Address,
  OnSetDefault,
  IsDefault
}: CompanyAddressListItemProps) => {
  return (
    <ListItem>
      <ListItemText
        primary={
          <Stack direction={'row'} gap={2} sx={{ pb: '10px' }}>
            <Box>
              <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'flex-start' }}>
                <Typography fontWeight={'bold'} variant="h5" color={red[900]}>
                  {`İşletme Adresi`}
                </Typography>
                {IsDefault && (
                  <Chip
                    label="Varsayılan"
                    color="success"
                    variant="outlined"
                    sx={{ borderRadius: '2em' }}
                    size="small"
                  />
                )}
              </Box>
              <Typography fontWeight={'bold'}>{Address.AddressLine}</Typography>
              <Typography fontWeight={'bold'}>
                {`${Address.County} ${Address.City} ${Address.ZipCode} ${Address.Country}`}
              </Typography>
            </Box>
          </Stack>
        }
        secondary={
          IsDefault || (
            <Stack direction={'row'} gap={2}>
              <Button size="small" color="blackNWhite" variant="outlined" onClick={OnSetDefault}>
                {'Varsayılan'}
              </Button>
            </Stack>
          )
        }
      />
    </ListItem>
  );
};

export { CompanyAddressListItem };
