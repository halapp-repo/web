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
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateOrganization } from '../../store/ui/uiSlice';
import {
  fetchOrganizations,
  selectOrganizations
} from '../../store/organizations/organizationsSlice';
import { instanceToInstance } from 'class-transformer';

interface AddressSelectorProps {
  SetAddress: (orgId: string, deliveryAddress: OrganizationAddress) => Promise<void>;
}

const AddressSelector = ({ SetAddress }: AddressSelectorProps) => {
  const Organizations = useAppSelector(selectOrganizations);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selectedOrganization, setSelectedOrganization] = useState<string | null>(null);

  useEffect(() => {
    if (Organizations && Organizations?.List?.length === 1) {
      if (Organizations.List[0]) {
        setSelectedOrganization(Organizations.List[0].ID!);
      }
    }
  }, [Organizations]);

  useEffect(() => {
    if (!Organizations?.List) {
      dispatch(fetchOrganizations());
    }
  }, []);

  useEffect(() => {
    if (selectedOrganization && Organizations?.List) {
      const org = Organizations.List.find((o) => o.ID == selectedOrganization);
      if (org) {
        const deliveryAddress = org.getDeliveryAddress();
        SetAddress(selectedOrganization, instanceToInstance(deliveryAddress!));
      }
    }
  }, [selectedOrganization]);

  const handleChangeOrganization = (organizationId: string) => {
    dispatch(updateOrganization({ tab: 1, generalInfoEditMode: false }));
    navigate(`/organization/${organizationId}`);
  };

  const getListItem = (org: Organization): JSX.Element => {
    const deliveryAddress = org.getDeliveryAddress();
    return (
      <ListItem
        onClick={() => {
          setSelectedOrganization(org.ID!);
        }}
        selected={org.ID === selectedOrganization}
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
                handleChangeOrganization(org.ID!);
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
    <RadioGroup value={selectedOrganization}>
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
        {Organizations?.List?.map((org) => getListItem(org))}
      </List>
    </RadioGroup>
  );
};

export { AddressSelector };
