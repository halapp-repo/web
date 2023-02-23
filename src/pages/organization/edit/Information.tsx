import { Typography, Grid, Stack, Button, Divider, Chip } from '@mui/material';
import { Organization } from '../../../models/organization';
import { EditFilled } from '@ant-design/icons';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PhoneIcon from '@mui/icons-material/Phone';
import { useTheme } from '@mui/system';

interface InformationProps {
  Organization: Organization;
  OnEnterEditMode: () => void;
}
const Information = ({ Organization, OnEnterEditMode }: InformationProps) => {
  const theme = useTheme();
  return (
    <Stack spacing={2}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h3">{Organization.Name}</Typography>
            <Typography variant="body2" color={theme.palette.secondary.main} fontWeight={'bold'}>
              {Organization.VKN!}
            </Typography>
            <Divider />

            <Grid container>
              <Grid item xs={2}>
                <PowerSettingsNewIcon color={'info'} />
              </Grid>
              <Grid item xs={10}>
                {Organization.Active ? (
                  <Chip label="Etkin" size="small" color="success" variant="outlined" />
                ) : (
                  <Chip label="Kısıtlı" size="small" color="error" variant="outlined" />
                )}
              </Grid>
            </Grid>
            {Organization.Active && (
              <Grid container>
                <Grid item xs={2}>
                  <AccountBalanceIcon color={'info'} />
                </Grid>
                <Grid item xs={10}>
                  <Grid container>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body1" color="secondary" fontWeight={'bold'}>
                        {'Bakiye'}
                      </Typography>
                      <Typography
                        variant="body1"
                        fontWeight={'bold'}
                        color={theme.palette.info.main}>
                        {Organization.getRemainingBalanceAmount()}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}
            <Grid container>
              <Grid item xs={2}>
                <PhoneIcon color={'info'} />
              </Grid>
              <Grid item xs={10}>
                {Organization.PhoneNumber!}
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={2}>
                <EmailOutlinedIcon color={'info'} />
              </Grid>
              <Grid item xs={10}>
                {Organization.Email!}
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={2}>
                <GroupOutlinedIcon color={'info'} />
              </Grid>
              <Grid item xs={10}>
                <Stack direction={'row'} spacing={1}>
                  <Typography variant="body1" fontWeight={'bold'}>
                    {Organization.JoinedUsers?.length || 0}
                  </Typography>
                  <Typography variant="body1" color="secondary" fontWeight={'bold'}>
                    {'Kullanıcı'}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={2}>
                <LocationOnOutlinedIcon color={'info'} />
              </Grid>
              <Grid item xs={10}>
                {Organization.areInvoiceAndCompanyAddressesSame() || (
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
                )}
                {Organization.areInvoiceAndCompanyAddressesSame() && (
                  <Grid container>
                    <Grid item md={12}>
                      <Typography variant="body1" color="secondary" fontWeight={'bold'}>
                        {'Fatura/Sirket Adresi'}
                      </Typography>
                      <Typography variant="body1">
                        {Organization.InvoiceAddress?.AddressLine}
                      </Typography>
                      <Typography variant="body1">{`${Organization.InvoiceAddress?.County} ${Organization.InvoiceAddress?.City} ${Organization.InvoiceAddress?.ZipCode} ${Organization.InvoiceAddress?.Country}`}</Typography>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>
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
