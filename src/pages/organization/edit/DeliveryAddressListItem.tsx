import { DeleteOutlined } from '@ant-design/icons';
import { Box, Button, ListItem, Radio, Stack, Typography, useTheme } from '@mui/material';
import { useState } from 'react';

import { OrganizationAddress } from '../../../models/organization';
import { DeliveryAddressListItemForm } from './DeliveryAddressListItemForm';

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
      <ListItem
        selected={Address.Active}
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
        <Stack spacing={1}>
          <Stack direction={'row'} gap={2} sx={{ pb: '10px' }}>
            <Box>
              <Stack direction={'row'} alignItems="center">
                <Radio checked={Address.Active} disabled={!Address.Active} color="primary" />
                <Typography fontWeight={'bold'} variant="h5" color={theme.palette.info.main}>
                  {`#${Key}`}
                </Typography>
              </Stack>
              <Box sx={{ padding: '0px 0px 0px 42px' }}>
                <Typography>{Address.AddressLine}</Typography>
                <Typography>
                  {`${Address.County} ${Address.City} ${Address.ZipCode} ${Address.Country}`}
                </Typography>
              </Box>
            </Box>
          </Stack>
          <Stack direction={'row'} gap={2}>
            <Button
              size="small"
              disabled={Address.Active}
              color="primary"
              variant="contained"
              onClick={OnSetDefault}>
              {'Seç'}
            </Button>
            <Button
              size="small"
              color="blackNWhite"
              variant="outlined"
              onClick={() => setEditMode(true)}>
              {'Düzenle'}
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
