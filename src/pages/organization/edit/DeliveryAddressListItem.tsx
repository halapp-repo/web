import { Typography, Stack, Button, Box, ListItem, Chip, useTheme } from '@mui/material';
import { useState } from 'react';
import { OrganizationAddress } from '../../../models/organization';
import { DeliveryAddressListItemForm } from './DeliveryAddressListItemForm';
import { DeleteOutlined } from '@ant-design/icons';

interface DeliveryAddressListItemProps {
  Address: OrganizationAddress;
  OnEditAddress: (address: OrganizationAddress) => void;
  OnDeleteAddress: (address: OrganizationAddress) => void;
  OnSetDefault: () => void;
  Key: number;
}

const DeliveryAddressListItem = ({
  Address,
  OnEditAddress,
  OnDeleteAddress,
  OnSetDefault,
  Key
}: DeliveryAddressListItemProps) => {
  const theme = useTheme();
  const [editMode, setEditMode] = useState(false);

  const generateListItem = (): JSX.Element => {
    if (editMode) {
      return (
        <DeliveryAddressListItemForm
          Address={Address}
          OnCancel={() => setEditMode(false)}
          OnEdit={(address: OrganizationAddress) => {
            if (address) {
              setEditMode(false);
              OnEditAddress && OnEditAddress(address);
            }
          }}
        />
      );
    }
    return (
      <ListItem>
        <Stack spacing={1}>
          <Stack direction={'row'} gap={2} sx={{ pb: '10px' }}>
            <Box>
              <Stack direction={'row'} spacing={1}>
                <Typography fontWeight={'bold'} variant="h5" color={theme.palette.info.main}>
                  {`#${Key}`}
                </Typography>
                {Address.Active && (
                  <Chip label="Varsayılan" color="success" variant="outlined" size="small" />
                )}
              </Stack>
              <Typography>{Address.AddressLine}</Typography>
              <Typography>
                {`${Address.County} ${Address.City} ${Address.ZipCode} ${Address.Country}`}
              </Typography>
            </Box>
          </Stack>
          <Stack direction={'row'} gap={2}>
            <Button
              size="small"
              color="blackNWhite"
              variant="outlined"
              onClick={() => setEditMode(true)}>
              {'Düzenle'}
            </Button>
            <Button size="small" color="blackNWhite" variant="outlined" onClick={OnSetDefault}>
              {'Varsayılan'}
            </Button>
            <Button
              size="small"
              color="blackNWhite"
              variant="outlined"
              sx={{ fontSize: '18px' }}
              onClick={() => OnDeleteAddress(Address)}>
              <DeleteOutlined />
            </Button>
          </Stack>
        </Stack>
      </ListItem>
    );
  };

  return generateListItem();
};

export { DeliveryAddressListItem };
