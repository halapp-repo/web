import { Typography, Grid, Stack, Button, Divider, Box } from '@mui/material';
import { Organization } from '../../../models/organization';
import { EditFilled } from '@ant-design/icons';

interface PreviewItemProps {
  name: string;
  title: string;
  content: string;
  content2?: string;
}
const PreviewItem = ({ title, content, content2 }: PreviewItemProps) => {
  return (
    <>
      <Stack spacing={1}>
        <Divider textAlign="left" sx={{ fontSize: 'smaller' }}>
          {title}
        </Divider>
        <Typography color="text.primary" fontWeight="bold">
          {content}
        </Typography>
        {content2 && (
          <Typography color="text.primary" fontWeight="bold">
            {content2}
          </Typography>
        )}
      </Stack>
    </>
  );
};

interface GeneralInformationProps {
  Organization: Organization;
  OnEnterEditMode: () => void;
}
const GeneralInformation = ({ Organization, OnEnterEditMode }: GeneralInformationProps) => {
  return (
    <Stack spacing={2}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <PreviewItem
              name="organization.VKN"
              title={'Vergi kimlik no'}
              content={Organization.VKN!}
            />
            <PreviewItem
              name="organization.Name"
              title={'Şirket ismi'}
              content={Organization.Name!}
            />
            <PreviewItem name="organization.Email" title={'E-mail'} content={Organization.Email!} />
            <PreviewItem
              name="organization.PhoneNumber"
              title={'Telefon'}
              content={Organization.PhoneNumber!}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <PreviewItem
              name="organization.InvoiceAddress"
              title={'Fatura adresi'}
              content={`${Organization.InvoiceAddress?.AddressLine}`}
              content2={`${Organization.InvoiceAddress?.County}  ${Organization.InvoiceAddress?.City}  ${Organization.InvoiceAddress?.ZipCode}  ${Organization.InvoiceAddress?.Country}`}
            />
            <PreviewItem
              name="organization.CompanyAddress"
              title={'Şirket adresi'}
              content={`${Organization.CompanyAddress?.AddressLine}`}
              content2={`${Organization.CompanyAddress?.County}  ${Organization.CompanyAddress?.City}  ${Organization.CompanyAddress?.ZipCode}  ${Organization.CompanyAddress?.Country}`}
            />
          </Stack>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" startIcon={<EditFilled />} onClick={OnEnterEditMode}>
          {'Düzenle'}
        </Button>
      </Box>
    </Stack>
  );
};

export default GeneralInformation;
