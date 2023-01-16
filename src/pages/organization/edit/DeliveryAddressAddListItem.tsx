import { Typography, Stack, Button, Box, ListItem, ListItemText } from '@mui/material';
import { useState } from 'react';
import { DeliveryAddressListItemForm } from './DeliveryAddressListItemForm';
import { PlusCircleOutlined } from '@ant-design/icons';
import { OrganizationAddress } from '../../../models/organization';

interface DeliveryAddressAddListItemProps {
  OnAddAddress: (address: OrganizationAddress) => void;
}

const DeliveryAddressAddListItem = ({ OnAddAddress }: DeliveryAddressAddListItemProps) => {
  const [editMode, setEditMode] = useState(false);

  const generateListItem = (): JSX.Element => {
    if (editMode) {
      return (
        <DeliveryAddressListItemForm
          OnCancel={() => setEditMode(false)}
          OnEdit={(address: OrganizationAddress) => {
            setEditMode(false);
            OnAddAddress(address);
          }}
        />
      );
    }
    return (
      <ListItem>
        <ListItemText
          primary={
            <Stack direction={'row'} gap={2} sx={{ pb: '10px' }} justifyContent="center">
              <PlusCircleOutlined style={{ fontSize: '32px' }} onClick={() => setEditMode(true)} />
            </Stack>
          }
        />
      </ListItem>
    );
  };

  return generateListItem();
};

export { DeliveryAddressAddListItem };
