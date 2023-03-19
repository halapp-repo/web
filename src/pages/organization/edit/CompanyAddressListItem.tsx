import { Typography, Stack, Button, Box, ListItem, Radio, useTheme } from '@mui/material';
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
    <ListItem
      selected={IsDefault}
      sx={{
        margin: '5px 0px 5px 0px',
        padding: '10px 10px',
        boxShadow: 'sm',
        bgcolor: 'background.body',
        border: '1px solid #eeeeee',
        borderRadius: '8px',
        '&.Mui-selected': {
          backgroundColor: 'inherit',
          border: '1px solid #ffc423'
        },
        '&.Mui-selected:hover': {
          backgroundColor: 'inherit'
        }
      }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Stack direction={'row'} gap={2} sx={{ pb: '10px' }}>
          <Box>
            <Box
              sx={{
                display: 'flex',
                gap: '10px',
                alignItems: 'center',
                justifyContent: 'flex-start'
              }}>
              <Radio checked={IsDefault} color="primary" />
              <Typography fontWeight={'bold'} variant="h5" color={theme.palette.info.main}>
                {`İşletme Adresi`}
              </Typography>
            </Box>
            <Typography>{Address.AddressLine}</Typography>
            <Typography>
              {`${Address.County} ${Address.City} ${Address.ZipCode} ${Address.Country}`}
            </Typography>
          </Box>
        </Stack>
        {IsDefault || (
          <Stack direction={'row'} gap={2}>
            <Button size="small" color="primary" variant="contained" onClick={OnSetDefault}>
              {'Seç'}
            </Button>
          </Stack>
        )}
      </div>
    </ListItem>
  );
};

export { CompanyAddressListItem };
