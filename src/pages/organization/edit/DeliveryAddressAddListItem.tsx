import { Stack, ListItem, ListItemText, IconButton } from '@mui/material';
import { useState } from 'react';
import { DeliveryAddressListItemForm } from './DeliveryAddressListItemForm';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
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
            <Stack direction={'row'} justifyContent="center">
              <IconButton>
                <ControlPointOutlinedIcon
                  color="info"
                  style={{ fontSize: '32px' }}
                  onClick={() => setEditMode(true)}
                />
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
