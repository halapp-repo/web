import { useEffect } from 'react';
import { Box, Tabs, Tab, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  fetchOrganizations,
  selectIndividualOrganization,
  updateOrganization
} from '../../../store/organizations/organizationsSlice';
import { useParams } from 'react-router-dom';
import PageWrapper from '../../../components/PageWrapper';
import MainCard from '../../../components/MainCard';
import GeneralInformationForm from './GeneralInformationForm';
import { Organization } from '../../../models/organization';
import GeneralInformation from './GeneralInformation';
import {
  selectUIOrganization,
  updateOrganization as updateUIOrganization
} from '../../../store/ui/uiSlice';
import { DeliveryAddresses } from './DeliveryAddresses';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <Box
      sx={{ mt: 3 }}
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <MainCard sx={{ p: { xs: 2, sm: 3 } }}>{children}</MainCard>}
    </Box>
  );
};

const OrganizationEdit = () => {
  const { organizationId } = useParams();
  const dispatch = useAppDispatch();
  const { currentTab, generalInfoEditMode } = useAppSelector(selectUIOrganization);

  const organization = useAppSelector((state) =>
    selectIndividualOrganization(state, organizationId)
  );

  useEffect(() => {
    if (!organization) {
      dispatch(fetchOrganizations());
    }

    return () => {
      dispatch(
        updateUIOrganization({
          tab: 0,
          generalInfoEditMode: false
        })
      );
    };
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    dispatch(
      updateUIOrganization({
        tab: newValue
      })
    );
  };
  const handleUpdateOrganizationInformation = async (organization: Organization): Promise<void> => {
    dispatch(updateOrganization(organization));
  };
  const toggleGeneralInformationEditMode = (editMode: boolean) => {
    dispatch(
      updateUIOrganization({
        generalInfoEditMode: editMode
      })
    );
  };
  const generateTabs = (tab: number, organization: Organization | null): JSX.Element => {
    if (!organization) {
      return (
        <PageWrapper md={8} lg={6}>
          <Box
            sx={{
              width: '100%',
              height: '200px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <CircularProgress />
          </Box>
        </PageWrapper>
      );
    }
    if (tab === 0) {
      // General Info
      if (generalInfoEditMode) {
        return (
          <PageWrapper md={8} lg={6}>
            <TabPanel value={0} index={0}>
              <GeneralInformationForm
                Organization={organization}
                OnSubmit={handleUpdateOrganizationInformation}
                OnCancel={() => toggleGeneralInformationEditMode(false)}
              />
            </TabPanel>
          </PageWrapper>
        );
      } else {
        return (
          <PageWrapper md={6} lg={5}>
            <TabPanel value={0} index={0}>
              <GeneralInformation
                Organization={organization}
                OnEnterEditMode={() => toggleGeneralInformationEditMode(true)}
              />
            </TabPanel>
          </PageWrapper>
        );
      }
    } else if (tab === 1) {
      return (
        <PageWrapper md={6} lg={5}>
          <TabPanel value={1} index={1}>
            <DeliveryAddresses Organization={organization} />
          </TabPanel>
        </PageWrapper>
      );
    }
    throw new Error('Not Found Tab error');
  };

  return (
    <>
      <PageWrapper>
        <MainCard>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile>
            <Tab label="Şirket Bilgisi" value={0} />
            <Tab label="Teslimat Adresleri" value={1} />
          </Tabs>
        </MainCard>
      </PageWrapper>
      {generateTabs(currentTab, organization)}
    </>
  );
};

export default OrganizationEdit;
