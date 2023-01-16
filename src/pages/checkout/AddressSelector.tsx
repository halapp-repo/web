import { useEffect, useState, useContext } from 'react';
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
import { Link as RouterLink } from 'react-router-dom';
import { Organization, OrganizationAddress } from '../../models/organization';
import { useAppDispatch } from '../../store/hooks';
import { updateOrganization } from '../../store/ui/uiSlice';
import { instanceToInstance } from 'class-transformer';
import { OrganizationsContext } from './OrganizationsContext';

interface AddressSelectorProps {
  SetAddress: (orgId: string, deliveryAddress: OrganizationAddress) => Promise<void>;
}

const AddressSelector = ({ SetAddress }: AddressSelectorProps) => {
  const organizations = useContext(OrganizationsContext);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selectedOrganizationID, setSelectedOrganizationID] = useState<string | null>(null);

  useEffect(() => {
    if (organizations) {
      const activeOrg = organizations?.filter((o) => o.Active === true);
      if (activeOrg?.length === 1) {
        setSelectedOrganizationID(activeOrg[0].ID!);
      }
    }
  }, [organizations]);

  useEffect(() => {
    if (selectedOrganizationID && organizations) {
      const org = organizations.find((o) => o.ID == selectedOrganizationID);
      if (org) {
        const deliveryAddress = org.getDeliveryAddress();
        SetAddress(selectedOrganizationID, instanceToInstance(deliveryAddress!));
      }
    }
  }, [selectedOrganizationID]);

  const handleChangeOrganization = (organizationId: string) => {
    dispatch(updateOrganization({ tab: 1, generalInfoEditMode: false }));
    navigate(`/organization/${organizationId}`);
  };

  const getListItem = (org: Organization): JSX.Element => {
    const deliveryAddress = org.getDeliveryAddress();
    return (
      <ListItem
        onClick={() => {
          setSelectedOrganizationID(org.ID!);
        }}
        selected={org.ID === selectedOrganizationID}
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
  const createEmptyAddress = (): JSX.Element => {
    return (
      <Box
        sx={{
          padding: '4px 8px 4px 8px',
          marginBottom: '10px'
        }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography>{'Etkin şirketiniz bulmamaktadır'}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="body1">{'Hala üye olmadınız mı?'}</Typography>
          <Button variant="text" component={RouterLink} to="/organization/enrollment">
            {'Üye Ol'}
          </Button>
        </Box>
      </Box>
    );
  };

  return (
    <RadioGroup value={selectedOrganizationID}>
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
        {organizations?.every((org) => !org.Active) && createEmptyAddress()}
        {organizations?.filter((org) => org.Active).map((org) => getListItem(org))}
      </List>
    </RadioGroup>
  );
};

export { AddressSelector };
