import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import { IconButton, ListItem, ListItemText, Stack } from '@mui/material';
import { useState } from 'react';

import { OrganizationAddress } from '../../../models/organization';
import { DeliveryAddressListItemForm } from './DeliveryAddressListItemForm';

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
            <Stack direction={'row'} justifyContent="center">
              <IconButton onClick={() => setEditMode(true)}>
                <ControlPointOutlinedIcon color="info" style={{ fontSize: '32px' }} />
              </IconButton>
            </Stack>
          }
        />
      </ListItem>
    );
  };

  return generateListItem();
};

export { DeliveryAddressAddListItem };
