import { Typography, Grid, Stack, Button, Divider, Box, Chip } from '@mui/material';
import { Organization } from '../../../models/organization';
import { EditFilled, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import { red } from '@mui/material/colors';

interface InformationProps {
  Organization: Organization;
  OnEnterEditMode: () => void;
}
const Information = ({ Organization, OnEnterEditMode }: InformationProps) => {
  return (
    <Stack spacing={2}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Stack direction={'row'} spacing={1}>
              <Typography variant="h3">{Organization.Name}</Typography>
              {Organization.Active ? (
                <Chip
                  sx={{ borderRadius: '2em' }}
                  label="Aktif"
                  size="small"
                  color="success"
                  variant="outlined"
                />
              ) : (
                <Chip
                  sx={{ borderRadius: '2em' }}
                  label="Etkin değil"
                  size="small"
                  color="error"
                  variant="outlined"
                />
              )}
            </Stack>
            <Box>
              <Typography variant="body1" color={red[900]} fontWeight={'bold'}>
                {Organization.VKN!}
              </Typography>
              <Stack direction={'row'} spacing={1}>
                <MailOutlined />
                <Typography variant="body1" fontWeight={'bold'}>
                  {Organization.Email!}
                </Typography>
              </Stack>
              <Stack direction={'row'} spacing={1}>
                <PhoneOutlined />
                <Typography variant="body1" fontWeight={'bold'}>
                  {Organization.PhoneNumber!}
                </Typography>
              </Stack>
              <Stack direction={'row'} spacing={1}>
                <Typography variant="body1" fontWeight={'bold'}>
                  {Organization.JoinedUsers?.length}
                </Typography>
                <Typography variant="body1" color="secondary" fontWeight={'bold'}>
                  {'Kullanici'}
                </Typography>
              </Stack>
              <Divider sx={{ m: '10px 0px' }} />
              <Grid container>
                <Grid item md={6}>
                  <Typography variant="body1" color="secondary" fontWeight={'bold'}>
                    {'Fatura Adresi'}
                  </Typography>
                  <Typography variant="body1">
                    {Organization.InvoiceAddress?.AddressLine}
                  </Typography>
                  <Typography variant="body1">{`${Organization.InvoiceAddress?.County} ${Organization.InvoiceAddress?.City} ${Organization.InvoiceAddress?.ZipCode} ${Organization.InvoiceAddress?.Country}`}</Typography>
                </Grid>
                <Grid item md={6}>
                  <Typography variant="body1" color="secondary" fontWeight={'bold'}>
                    {'Sirket Adresi'}
                  </Typography>
                  <Typography variant="body1">
                    {Organization.CompanyAddress?.AddressLine}
                  </Typography>
                  <Typography variant="body1">{`${Organization.CompanyAddress?.County} ${Organization.CompanyAddress?.City} ${Organization.CompanyAddress?.ZipCode} ${Organization.CompanyAddress?.Country}`}</Typography>
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </Grid>
      </Grid>

      <Button
        variant="outlined"
        color="blackNWhite"
        startIcon={<EditFilled />}
        onClick={OnEnterEditMode}>
        {'Düzenle'}
      </Button>
    </Stack>
  );
};

export default Information;
