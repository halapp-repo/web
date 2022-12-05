import { useEffect, useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  fetchOrganizations,
  selectIndividualOrganization,
  updateOrganization
} from '../../../store/organizations/organizationsSlice';
import { useParams } from 'react-router-dom';
import PageWrapper from '../../../components/PageWrapper';
import MainCard from '../../../components/MainCard';
import { toggleDisableToolbarGutter } from '../../../store/ui/uiSlice';
import GeneralInformationForm from './GeneralInformationForm';
import { Organization } from '../../../models/organization';
import GeneralInformation from './GeneralInformation';

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
  const [tab, setTab] = useState(0);
  const [generalInformationEditMode, setGeneralInformationEditMode] = useState(false);

  const organization = useAppSelector((state) =>
    selectIndividualOrganization(state, organizationId)
  );
  useEffect(() => {
    dispatch(toggleDisableToolbarGutter(true));
    if (!organization) {
      dispatch(fetchOrganizations());
    }

    return () => {
      dispatch(toggleDisableToolbarGutter(false));
    };
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };
  const handleUpdateOrganizationInformation = async (organization: Organization): Promise<void> => {
    dispatch(updateOrganization(organization));
  };
  const toggleGeneralInformationEditMode = (editMode: boolean) => {
    setGeneralInformationEditMode(editMode);
  };

  return (
    <>
      <PageWrapper>
        <MainCard>
          <Tabs
            value={tab}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile>
            <Tab label="Şirket Bilgisi" />
          </Tabs>
        </MainCard>
      </PageWrapper>
      {organization && (
        <PageWrapper md={8} lg={6}>
          <TabPanel value={tab} index={0}>
            {generalInformationEditMode ? (
              <GeneralInformationForm
                Organization={organization}
                OnSubmit={handleUpdateOrganizationInformation}
                OnCancel={() => toggleGeneralInformationEditMode(false)}
              />
            ) : (
              <GeneralInformation
                Organization={organization}
                OnEnterEditMode={() => toggleGeneralInformationEditMode(true)}
              />
            )}
          </TabPanel>
        </PageWrapper>
      )}
    </>
  );
};

export default OrganizationEdit;
