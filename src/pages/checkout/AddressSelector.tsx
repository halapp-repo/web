import { useEffect, useState, useContext } from 'react';
import { grey } from '@mui/material/colors';
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
  Button,
  Alert,
  Divider,
  Collapse
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Organization, OrganizationAddress } from '../../models/organization';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectUICheckout, updateOrganization } from '../../store/ui/uiSlice';
import { instanceToInstance } from 'class-transformer';
import { OrganizationsContext } from './OrganizationsContext';
import { selectSelectedCity } from '../../store/cities/citiesSlice';
import { areStringsEqual } from '../../utils/filter';
import { useTheme } from '@mui/system';

interface AddressSelectorProps {
  SetAddress: (orgId: string, deliveryAddress: OrganizationAddress) => Promise<void>;
}

const AddressSelector = ({ SetAddress }: AddressSelectorProps) => {
  const organizations = useContext(OrganizationsContext);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { organizationId: savedOrganizationId } = useAppSelector(selectUICheckout);
  const selectedCity = useAppSelector(selectSelectedCity);
  const [selectedOrganizationID, setSelectedOrganizationID] = useState<string | null>(null);

  const updateSelectedOrganizationId = (organization: Organization) => {
    const cityOfOrganization = organization.getDeliveryAddress()?.City;

    if (areStringsEqual(cityOfOrganization, selectedCity)) {
      setSelectedOrganizationID(organization.ID!);
    }
  };

  useEffect(() => {
    if (organizations) {
      const activeOrg = organizations?.filter((o) => o.Active === true);
      if (activeOrg?.length === 1) {
        updateSelectedOrganizationId(activeOrg[0]);
      }
      if (savedOrganizationId && organizations.map((o) => o.ID).includes(savedOrganizationId)) {
        const selectedOrg = organizations.find((o) => o.ID == savedOrganizationId);
        selectedOrg && updateSelectedOrganizationId(selectedOrg);
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
    const theme = useTheme();
    const deliveryAddress = org.getDeliveryAddress();
    return (
      <ListItem
        onClick={() => {
          updateSelectedOrganizationId(org);
        }}
        selected={org.ID === selectedOrganizationID}
        button
        key={org.ID}
        sx={{
          margin: '5px 0px 5px 0px',
          padding: '0px 10px',
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
        }}
        secondaryAction={<Stack justifyContent="flex-end"></Stack>}>
        <ListItemText
          primary={
            <>
              <Stack direction={'row'} spacing={1} alignItems="center">
                <Radio value={org.ID} color="primary" />
                <Typography
                  variant="h5"
                  fontWeight={'bold'}
                  sx={{ mb: '10px' }}
                  color={theme.palette.info.main}>
                  {org.Name}
                </Typography>
              </Stack>
              <Stack
                spacing={1}
                sx={{
                  color: areStringsEqual(deliveryAddress?.City, selectedCity)
                    ? 'inherit'
                    : grey['A400']
                }}>
                {areStringsEqual(deliveryAddress?.City, selectedCity) || (
                  <Alert severity="warning">
                    Teslimat şehri (<b>{`${deliveryAddress?.City.toLowerCase()}`}</b>) ile seçilen
                    şehir (<b>{`${selectedCity}`}</b>) uyuşmamaktadır!
                  </Alert>
                )}
                <Box sx={{ p: '0px 5px 0px 50px' }}>
                  <Typography variant="body2" fontWeight={'bold'}>
                    {deliveryAddress?.AddressLine}
                  </Typography>
                  <Typography variant="body2" fontWeight={'bold'}>
                    {`${deliveryAddress?.County} ${deliveryAddress?.City} ${deliveryAddress?.ZipCode} ${deliveryAddress?.Country}`}
                  </Typography>
                </Box>
                <Collapse in={org.ID === selectedOrganizationID}>
                  <Stack spacing={1}>
                    <Divider />
                    <Stack direction={'row'} justifyContent="flex-end">
                      <Button
                        size="small"
                        variant="outlined"
                        color="blackNWhite"
                        onClick={(e) => {
                          e.preventDefault();
                          handleChangeOrganization(org.ID!);
                        }}>
                        {'Teslimat Adresini Değiştir'}
                      </Button>
                    </Stack>
                  </Stack>
                </Collapse>
              </Stack>
            </>
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
