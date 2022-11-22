import { Box, Grid, MobileStepper, Button, useTheme, Alert } from '@mui/material';
import { useState, useEffect } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import MainCard from '../../../components/MainCard';
import { TaxForm } from './TaxForm';
import { Organization } from '../../../models/organization';
import { AddressForm } from './AddressForm';
import { ContactForm } from './ContactForm';
import PostEnrollment from './PostEnrollment';
import {
  createOrganizationEnrollmentRequest,
  selectOrganizationEnrollment
} from '../../../store/organizations/organizationsSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { PreviewForm } from './PreviewForm';

const Enrollment = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [stage, setStage] = useState(0);
  const [organization, setOrganization] = useState(new Organization());
  const enrollmentRequest = useAppSelector(selectOrganizationEnrollment);

  useEffect(() => {
    if (enrollmentRequest?.DidSendOrganizationEnrollment) {
      setStage(4);
    }
  }, [enrollmentRequest]);

  const handleNext = () => {
    setStage((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setStage((prevActiveStep) => prevActiveStep - 1);
  };
  const handleTaxFormSubmit = (vkn: string, organizationName: string): void => {
    setOrganization((prevOrg) => {
      return {
        ...prevOrg,
        VKN: vkn,
        Name: organizationName
      };
    });
    handleNext();
  };
  const handleAddressFormSubmit = ({
    invoiceFormattedAddress,
    invoiceCounty,
    invoiceCity,
    invoiceZipCode,
    invoiceCountry,
    companyFormattedAddress,
    companyCounty,
    companyCity,
    companyZipCode,
    companyCountry
  }: {
    invoiceFormattedAddress: string;
    invoiceCounty: string;
    invoiceCity: string;
    invoiceZipCode: string;
    invoiceCountry: string;
    companyFormattedAddress: string;
    companyCounty: string;
    companyCity: string;
    companyZipCode: string;
    companyCountry: string;
  }): void => {
    setOrganization((prevOrg) => {
      return {
        ...prevOrg,
        InvoiceAddress: {
          AddressLine: invoiceFormattedAddress,
          City: invoiceCity,
          County: invoiceCounty,
          ZipCode: invoiceZipCode,
          Country: invoiceCountry
        },
        CompanyAddress: {
          AddressLine: companyFormattedAddress,
          City: companyCity,
          County: companyCounty,
          ZipCode: companyZipCode,
          Country: companyCountry
        }
      };
    });
    handleNext();
  };
  const handleContactFormSubmit = async (email: string, phoneNumber: string): Promise<void> => {
    setOrganization((prevOrg) => {
      return {
        ...prevOrg,
        Email: email,
        PhoneNumber: phoneNumber
      };
    });
    handleNext();
  };
  const handleSendEnrollment = async (organization: Organization): Promise<void> => {
    dispatch(createOrganizationEnrollmentRequest(organization));
  };

  const getStages = (stage: number): React.ReactElement | null => {
    if (stage === 0) {
      return <TaxForm organization={organization} onSubmit={handleTaxFormSubmit} />;
    } else if (stage === 1) {
      return <AddressForm organization={organization} onSubmit={handleAddressFormSubmit} />;
    } else if (stage === 2) {
      return <ContactForm organization={organization} onSubmit={handleContactFormSubmit} />;
    } else if (stage === 3) {
      return <PreviewForm organization={organization} onSubmit={handleSendEnrollment} />;
    } else if (stage === 4) {
      return <PostEnrollment />;
    }
    return null;
  };

  return (
    <Box>
      <Grid container direction="column" justifyContent="flex-start">
        <Grid item xs={12} container justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={7} md={5}>
            <MainCard
              sx={{
                minWidth: { xs: '100%' },
                maxWidth: { xs: '100%' },
                // minHeight: { xs: '100vh', sm: 'inherit' },
                margin: { xs: 0, sm: 1, md: 3 },
                '& > *': {
                  flexGrow: 1,
                  flexBasis: '50%'
                }
              }}>
              {enrollmentRequest?.Error && (
                <Alert variant="outlined" severity="error">
                  {`${enrollmentRequest?.Error.message}`}
                </Alert>
              )}
              <Box sx={{ p: { xs: 2, sm: 2, md: 3, xl: 5 } }}>
                <Box>{getStages(stage)}</Box>
                {stage < 4 && (
                  <MobileStepper
                    variant="dots"
                    steps={4}
                    position="static"
                    activeStep={stage}
                    sx={{ flexGrow: 1, backgroundColor: '#ffffff' }}
                    nextButton={
                      <Button size="small" sx={{ visibility: 'hidden' }}>
                        Ileri
                        {theme.direction === 'rtl' ? <LeftOutlined /> : <RightOutlined />}
                      </Button>
                    }
                    backButton={
                      <Button size="small" onClick={handleBack} disabled={stage === 0}>
                        {theme.direction === 'rtl' ? <RightOutlined /> : <LeftOutlined />}
                        Geri
                      </Button>
                    }
                  />
                )}
              </Box>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Enrollment;
