import { useEffect } from 'react';
import { Box, Tabs, CircularProgress, useMediaQuery, Theme, Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  fetchAllOrganizations,
  fetchOrganizations,
  selectIndividualOrganization,
  updateOrganization
} from '../../../store/organizations/organizationsSlice';
import { useParams } from 'react-router-dom';
import MainCard from '../../../components/MainCard';
import GeneralInformationForm from './GeneralInformationForm';
import { Organization } from '../../../models/organization';
import {
  selectUIOrganization,
  updateOrganization as updateUIOrganization
} from '../../../store/ui/uiSlice';
import { DeliveryAddresses } from './DeliveryAddresses';
import Information from './Information';
import { Users } from './Users';
import { selectUserAuth } from '../../../store/auth/authSlice';
import { OrganizationAdminPanel } from './AdminPanel';
import { ShopOutlined, ShopFilled } from '@ant-design/icons';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import PeopleIcon from '@mui/icons-material/People';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import ShieldIcon from '@mui/icons-material/Shield';
import { Tab } from '../../../components/form/Tab';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import { AccountActivity } from './AccountActivity';
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <Box
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <MainCard sx={{ p: { xs: 2, sm: 3 } }}>{children}</MainCard>}
    </Box>
  );
};

const OrganizationEdit = () => {
  const matchesMd = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const { isAdmin } = useAppSelector(selectUserAuth);
  const { organizationId } = useParams();
  const dispatch = useAppDispatch();
  const { currentTab, generalInfoEditMode } = useAppSelector(selectUIOrganization);
  const organization = useAppSelector((state) =>
    selectIndividualOrganization(state, organizationId)
  );

  useEffect(() => {
    if (!organization && organizationId) {
      if (isAdmin) {
        dispatch(fetchAllOrganizations());
      } else {
        dispatch(fetchOrganizations());
      }
    }
    return () => {
      dispatch(
        updateUIOrganization({
          tab: 0,
          generalInfoEditMode: false
        })
      );
    };
  }, [organizationId, isAdmin]);

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
      );
    }
    if (tab === 0) {
      // General Info
      if (generalInfoEditMode) {
        return (
          <TabPanel value={0} index={0}>
            <GeneralInformationForm
              Organization={organization}
              OnSubmit={handleUpdateOrganizationInformation}
              OnCancel={() => toggleGeneralInformationEditMode(false)}
            />
          </TabPanel>
        );
      } else {
        return (
          <TabPanel value={0} index={0}>
            <Information
              Organization={organization}
              OnEnterEditMode={() => toggleGeneralInformationEditMode(true)}
            />
          </TabPanel>
        );
      }
    } else if (tab === 1) {
      return (
        <TabPanel value={1} index={1}>
          <DeliveryAddresses Organization={organization} />
        </TabPanel>
      );
    } else if (tab === 2) {
      return (
        <TabPanel value={2} index={2}>
          <Users Organization={organization} />
        </TabPanel>
      );
    } else if (tab === 3) {
      return (
        <TabPanel value={2} index={2}>
          <AccountActivity Organization={organization} />
        </TabPanel>
      );
    } else if (tab === 101) {
      return (
        <TabPanel value={2} index={2}>
          <OrganizationAdminPanel Organization={organization} />
        </TabPanel>
      );
    }
    throw new Error('Not Found Tab error');
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3} lg={3}>
          {matchesMd ? (
            <MainCard>
              <Tabs
                value={currentTab}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile>
                <Tab
                  icon={
                    currentTab === 0 ? (
                      <ShopFilled style={{ fontSize: '24px' }} />
                    ) : (
                      <ShopOutlined style={{ fontSize: '24px' }} />
                    )
                  }
                  iconPosition="top"
                  label="Şirket Bilgisi"
                  value={0}
                />
                <Tab
                  icon={
                    currentTab === 1 ? (
                      <LocalShippingIcon style={{ fontSize: '24px' }} />
                    ) : (
                      <LocalShippingOutlinedIcon style={{ fontSize: '24px' }} />
                    )
                  }
                  iconPosition="top"
                  label="Teslimat Adresleri"
                  value={1}
                />
                <Tab
                  icon={
                    currentTab === 2 ? (
                      <PeopleIcon style={{ fontSize: '24px' }} />
                    ) : (
                      <PeopleOutlinedIcon style={{ fontSize: '24px' }} />
                    )
                  }
                  iconPosition="top"
                  label="Kullanıcılar"
                  value={2}
                />
                <Tab
                  icon={
                    currentTab === 3 ? (
                      <ReceiptLongIcon style={{ fontSize: '24px' }} />
                    ) : (
                      <ReceiptLongOutlinedIcon style={{ fontSize: '24px' }} />
                    )
                  }
                  iconPosition="top"
                  label="İşlemler"
                  value={3}
                />
                {isAdmin && (
                  <Tab
                    className="tab-admin"
                    icon={
                      currentTab === 101 ? (
                        <ShieldIcon style={{ fontSize: '24px' }} />
                      ) : (
                        <ShieldOutlinedIcon style={{ fontSize: '24px' }} />
                      )
                    }
                    iconPosition="top"
                    label="Admin"
                    value={101}
                  />
                )}
              </Tabs>
            </MainCard>
          ) : (
            <MainCard>
              <Tabs
                indicatorColor="primary"
                value={currentTab}
                orientation="vertical"
                onChange={handleTabChange}>
                <Tab
                  icon={
                    currentTab === 0 ? (
                      <ShopFilled style={{ fontSize: '24px' }} />
                    ) : (
                      <ShopOutlined style={{ fontSize: '24px' }} />
                    )
                  }
                  iconPosition="start"
                  label="Şirket Bilgisi"
                  value={0}
                />
                <Tab
                  icon={
                    currentTab === 1 ? (
                      <LocalShippingIcon style={{ fontSize: '24px' }} />
                    ) : (
                      <LocalShippingOutlinedIcon style={{ fontSize: '24px' }} />
                    )
                  }
                  iconPosition="start"
                  label="Teslimat Adresleri"
                  value={1}
                />
                <Tab
                  icon={
                    currentTab === 2 ? (
                      <PeopleIcon style={{ fontSize: '24px' }} />
                    ) : (
                      <PeopleOutlinedIcon style={{ fontSize: '24px' }} />
                    )
                  }
                  iconPosition="start"
                  label="Kullanıcılar"
                  value={2}
                />
                <Tab
                  icon={
                    currentTab === 3 ? (
                      <ReceiptLongIcon style={{ fontSize: '24px' }} />
                    ) : (
                      <ReceiptLongOutlinedIcon style={{ fontSize: '24px' }} />
                    )
                  }
                  iconPosition="start"
                  label="İşlemler"
                  value={3}
                />
                {isAdmin && (
                  <Tab
                    icon={
                      currentTab === 101 ? (
                        <ShieldIcon style={{ fontSize: '24px' }} />
                      ) : (
                        <ShieldOutlinedIcon style={{ fontSize: '24px' }} />
                      )
                    }
                    className="tab-admin"
                    iconPosition="start"
                    label="Admin"
                    value={101}
                  />
                )}
              </Tabs>
            </MainCard>
          )}
        </Grid>
        <Grid item xs={12} md={6} lg={5}>
          {generateTabs(currentTab, organization)}
        </Grid>
      </Grid>
    </>
  );
};

export default OrganizationEdit;
