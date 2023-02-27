import {
  Box,
  List,
  Radio,
  RadioGroup,
  ListItem,
  ListItemText,
  Typography,
  Stack,
  Button,
  Alert,
  Grid,
  TextField
} from '@mui/material';

const CardInformation = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Stack>
          <Typography variant="h6" fontWeight={'bold'} color="text.secondary">
            {'Kart Numarası'}
          </Typography>
          <TextField fullWidth type="number" />
        </Stack>
      </Grid>
      <Grid item xs={12}></Grid>
      <Grid item xs={12}></Grid>
    </Grid>
  );
};

export { CardInformation };
