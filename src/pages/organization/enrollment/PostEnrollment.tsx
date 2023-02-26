import { Typography, Stack, Box, Button } from '@mui/material';
import IconBoxInMail from '../../../components/icons/IconBoxInMail';
import { Link as RouterLink } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks';
import { selectOrganizationEnrollment } from '../../../store/organizations/organizationsSlice';

const PostEnrollment = () => {
  const enrollmentRequest = useAppSelector(selectOrganizationEnrollment);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Stack spacing={2} direction={'column'}>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <IconBoxInMail Size="medium" />
        </Box>
        <Typography
          variant="h3"
          style={{ whiteSpace: 'pre-line', textAlign: 'center' }}
          color="text.secondary">{`Selam, ${
          enrollmentRequest?.Organization?.Name || ''
        } 👋`}</Typography>
        <Typography
          variant="h4"
          color="text.secondary"
          style={{ whiteSpace: 'pre-line', textAlign: 'center' }}>
          {`
        Talebiniz alınmıştır. 
        24 saat içerisinde satış ekibimiz size dönüş yapacaktır.

        ${
          enrollmentRequest?.Organization?.Email || ''
        } adresine gönderdiğimiz e-postadan kayıt olabilirsiniz. 
 
        Teşekkürler 
 
        halapp`}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="body1">{'Bu arada fiyatlarımıza bakabilirsiniz '}</Typography>
          <Button variant="text" component={RouterLink} to="/dashboard">
            {'Fiyatlar'}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default PostEnrollment;
