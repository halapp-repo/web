import { EditFilled } from '@ant-design/icons';
import { Button, Grid, Stack, Typography } from '@mui/material';

import { Organization } from '../../../models/organization';

interface GeneralInformationProps {
  Organization: Organization;
  OnEnterEditMode: () => void;
}
const GeneralInformation = ({ Organization, OnEnterEditMode }: GeneralInformationProps) => {
  return (
    <Stack spacing={2}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack spacing={2}>
            <Stack
              direction={'row'}
              spacing={2}
              justifyContent="space-between"
              sx={{ width: '100%' }}>
              <Stack direction={'column'}>
                <Typography fontSize={'10px'} color="secondary" fontWeight={'bold'}>
                  {'Sirket ismi'}
                </Typography>
                <Typography variant="h4">{Organization.Name!}</Typography>
              </Stack>
              <Stack direction={'column'}>
                <Typography fontSize={'10px'} color="secondary" fontWeight={'bold'}>
                  {'VKN'}
                </Typography>
                <Typography variant="body1">{Organization.VKN!}</Typography>
              </Stack>
            </Stack>
            <Stack
              direction={'row'}
              spacing={2}
              justifyContent="space-between"
              sx={{ width: '100%' }}>
              <Stack direction={'column'}>
                <Typography fontSize={'10px'} color="secondary" fontWeight={'bold'}>
                  {'Yaratilis tarihi'}
                </Typography>
                <Typography variant="body2">
                  {Organization.CreatedDate?.format('DD/MM/YYYY')}
                </Typography>
              </Stack>
              <Stack direction={'column'}>
                <Typography fontSize={'10px'} color="secondary" fontWeight={'bold'}>
                  {'Kullanici sayisi'}
                </Typography>
                <Typography variant="body2">{Organization.JoinedUsers?.length}</Typography>
              </Stack>
              <Stack direction={'column'}>
                <Typography fontSize={'10px'} color="secondary" fontWeight={'bold'}>
                  {'Durum'}
                </Typography>
                <Typography variant="body2">
                  {Organization.Active === true ? 'Aktif' : 'Etkin değil'}
                </Typography>
              </Stack>
            </Stack>
            <Stack
              direction={'row'}
              spacing={2}
              justifyContent="space-between"
              sx={{ width: '100%' }}>
              <Stack direction={'column'}>
                <Typography fontSize={'10px'} color="secondary" fontWeight={'bold'}>
                  {'E-posta'}
                </Typography>
                <Typography variant="body2">{Organization.Email!}</Typography>
              </Stack>
              <Stack direction={'column'}>
                <Typography fontSize={'10px'} color="secondary" fontWeight={'bold'}>
                  {'Telefon numarasi'}
                </Typography>
                <Typography variant="body2">{Organization.PhoneNumber!}</Typography>
              </Stack>
            </Stack>
            <Stack
              direction={'row'}
              spacing={2}
              justifyContent="space-between"
              sx={{ width: '100%' }}>
              <Stack direction={'column'}>
                <Typography fontSize={'10px'} color="secondary" fontWeight={'bold'}>
                  {'Fatura Adresi'}
                </Typography>
                <Typography variant="body2">{Organization.InvoiceAddress?.AddressLine}</Typography>
                <Typography variant="body2">{`${Organization.InvoiceAddress?.County} ${Organization.InvoiceAddress?.City} ${Organization.InvoiceAddress?.ZipCode} ${Organization.InvoiceAddress?.Country}`}</Typography>
              </Stack>
              <Stack direction={'column'}>
                <Typography fontSize={'10px'} color="secondary" fontWeight={'bold'}>
                  {'Sirket Adresi'}
                </Typography>
                <Typography variant="body2">{Organization.CompanyAddress?.AddressLine}</Typography>
                <Typography variant="body2">{`${Organization.CompanyAddress?.County} ${Organization.CompanyAddress?.City} ${Organization.CompanyAddress?.ZipCode} ${Organization.CompanyAddress?.Country}`}</Typography>
              </Stack>
            </Stack>
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

export default GeneralInformation;
