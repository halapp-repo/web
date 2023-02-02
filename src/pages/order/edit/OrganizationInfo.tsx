import { Typography, Stack } from '@mui/material';
import { Organization } from '../../../models/organization';

interface OrganizationInfoProps {
  Organization: Organization;
}

const OrganizationInfo = ({ Organization }: OrganizationInfoProps) => {
  return (
    <Stack spacing={2}>
      <Stack spacing={1} direction="row">
        <Typography
          variant="body1"
          fontWeight={'bold'}
          color="secondary"
          sx={{ flexGrow: '0', flexShrink: '0', flexBasis: '20%' }}>
          {'Şirket Adı'}
        </Typography>
        <Typography
          variant="body1"
          color="primary"
          fontWeight={'bold'}
          sx={{ flexGrow: '0', flexShrink: '0', flexBasis: '80%' }}>
          {Organization.Name}
        </Typography>
      </Stack>
      <Stack spacing={1} direction="row">
        <Typography
          variant="body1"
          fontWeight={'bold'}
          color="secondary"
          sx={{ flexGrow: '0', flexShrink: '0', flexBasis: '20%' }}>
          {'Kontak'}
        </Typography>
        <Typography variant="body1" sx={{ flexGrow: '0', flexShrink: '0', flexBasis: '80%' }}>
          {Organization.Email}
        </Typography>
      </Stack>
    </Stack>
  );
};

export { OrganizationInfo };
