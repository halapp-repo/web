import { Typography, Stack, Button, Box, ListItem, ListItemText, Chip } from '@mui/material';
import { useState } from 'react';
import { OrganizationAddress } from '../../../models/organization';
import { DeliveryAddressListItemForm } from './DeliveryAddressListItemForm';
import { DeleteOutlined } from '@ant-design/icons';

interface DeliveryAddressListItemProps {
  Address: OrganizationAddress;
  OnEditAddress: (address: OrganizationAddress) => void;
  OnDeleteAddress: (address: OrganizationAddress) => void;
  OnSetDefault: () => void;
}

const DeliveryAddressListItem = ({
  Address,
  OnEditAddress,
  OnDeleteAddress,
  OnSetDefault
}: DeliveryAddressListItemProps) => {
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
        <ListItemText
          primary={
            <Stack direction={'row'} gap={2} sx={{ pb: '10px' }}>
              <Box>
                {Address.Active && (
                  <Chip
                    label="Varsayılan"
                    color="success"
                    variant="outlined"
                    sx={{ borderRadius: '2em' }}
                    size="small"
                  />
                )}
                <Typography fontWeight={'bold'}>{Address.AddressLine}</Typography>
                <Typography fontWeight={'bold'}>
                  {`${Address.County} ${Address.City} ${Address.ZipCode} ${Address.Country}`}
                </Typography>
              </Box>
            </Stack>
          }
          secondary={
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
          }
        />
      </ListItem>
    );
  };

  return generateListItem();
};

export { DeliveryAddressListItem };
