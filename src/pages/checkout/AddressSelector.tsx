import { useEffect, useState } from 'react';
import { red } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  List,
  Radio,
  RadioGroup,
  ListItem,
  ListItemText,
  Typography,
  Stack,
  Button
} from '@mui/material';
import { Organization, OrganizationAddress } from '../../models/organization';
import { useAppDispatch } from '../../store/hooks';
import { updateOrganization } from '../../store/ui/uiSlice';

interface AddressSelectorProps {
  Organizations: Organization[];
}

const AddressSelector = ({ Organizations }: AddressSelectorProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  useEffect(() => {
    if (Organizations.length === 1) {
      if (Organizations[0]) {
        setSelectedAddress(Organizations[0].ID!);
      }
    }
  }, []);

  const handleChangeAddress = (organizationId: string) => {
    dispatch(updateOrganization({ tab: 1, generalInfoEditMode: false }));
    navigate(`/organization/${organizationId}`);
  };

  const getDeliveryAddressListItem = (org: Organization): JSX.Element => {
    let deliveryAddress;
    if (org.DeliveryAddresses.some((d) => d.Active)) {
      deliveryAddress = org.DeliveryAddresses.find((d) => d.Active);
    } else {
      deliveryAddress = org.CompanyAddress;
    }

    return (
      <ListItem
        onClick={() => {
          setSelectedAddress(org.ID!);
        }}
        selected={org.ID === selectedAddress}
        button
        key={org.ID}
        sx={{
          margin: '5px 0px 5px 0px',
          padding: '0px 10px',
          boxShadow: 'sm',
          bgcolor: 'background.body',
          '&.Mui-selected': {
            backgroundColor: 'inherit',
            border: '1px solid #ffc423',
            borderRadius: '8px'
          },
          '&.Mui-selected:hover': {
            backgroundColor: 'inherit'
          }
        }}
        secondaryAction={
          <Stack direction={'column'} justifyContent="space-around">
            <Radio value={org.ID} />
            <Button
              onClick={(e) => {
                e.preventDefault();
                handleChangeAddress(org.ID!);
              }}>
              {'Değiştir'}
            </Button>
          </Stack>
        }>
        <ListItemText
          primary={
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h5" fontWeight={'bold'} sx={{ mb: '10px' }} color={red[900]}>
                {org.Name}
              </Typography>
              <Typography variant="body2" fontWeight={'bold'}>
                {deliveryAddress?.AddressLine}
              </Typography>
              <Typography variant="body2" fontWeight={'bold'}>
                {`${deliveryAddress?.County} ${deliveryAddress?.City} ${deliveryAddress?.ZipCode} ${deliveryAddress?.Country}`}
              </Typography>
            </Box>
          }
          primaryTypographyProps={{ fontWeight: 'bold' }}
        />
      </ListItem>
    );
  };

  return (
    <RadioGroup value={selectedAddress}>
      <List
        subheader={
          <Box
            sx={{
              padding: '4px 8px 4px 8px',
              display: 'flex',
              marginBottom: '10px'
            }}>
            <Typography fontWeight={'bold'}>{'Teslimat Adresi'}</Typography>
          </Box>
        }>
        {Organizations.map((org) => getDeliveryAddressListItem(org))}
      </List>
    </RadioGroup>
  );
};

export { AddressSelector };
