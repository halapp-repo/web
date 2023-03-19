import { Typography, Stack, Button, Box, ListItem, Chip, useTheme } from '@mui/material';
import { OrganizationAddress } from '../../../models/organization';

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
  const theme = useTheme();
  return (
    <ListItem>
      <Stack spacing={1}>
        <Stack direction={'row'} gap={2} sx={{ pb: '10px' }}>
          <Box>
            <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'flex-start' }}>
              <Typography fontWeight={'bold'} variant="h5" color={theme.palette.info.main}>
                {`İşletme Adresi`}
              </Typography>
              {IsDefault && (
                <Chip label="Varsayılan" color="success" variant="outlined" size="small" />
              )}
            </Box>
            <Typography>{Address.AddressLine}</Typography>
            <Typography>
              {`${Address.County} ${Address.City} ${Address.ZipCode} ${Address.Country}`}
            </Typography>
          </Box>
        </Stack>
        {IsDefault || (
          <Stack direction={'row'} gap={2}>
            <Button size="small" color="blackNWhite" variant="outlined" onClick={OnSetDefault}>
              {'Varsayılan'}
            </Button>
          </Stack>
        )}
      </Stack>
    </ListItem>
  );
};

export { CompanyAddressListItem };
