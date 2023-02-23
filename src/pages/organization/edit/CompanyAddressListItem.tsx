import {
  Typography,
  Stack,
  Button,
  Box,
  ListItem,
  ListItemText,
  Chip,
  useTheme
} from '@mui/material';
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
      <ListItemText
        primary={
          <Stack direction={'row'} gap={2} sx={{ pb: '10px' }}>
            <Box>
              <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'flex-start' }}>
                <Typography fontWeight={'bold'} variant="h5" color={theme.palette.primary.main}>
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
