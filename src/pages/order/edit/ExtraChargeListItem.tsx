import { ExtraCharge, translateExtraChargeType } from '@halapp/common';
import { Box, ListItem, ListItemText, Stack, Typography } from '@mui/material';

interface ExtraChargeListItemProps {
  Charge: ExtraCharge;
}

const ExtraChargeListItem = ({ Charge }: ExtraChargeListItemProps) => {
  return (
    <ListItem alignItems="flex-start">
      <ListItemText
        primary={translateExtraChargeType(Charge.Type)}
        primaryTypographyProps={{ fontWeight: 'bold' }}
        secondaryTypographyProps={{ component: 'div' }}
        secondary={
          <Box>
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              alignItems="center"
              spacing={2}>
              <Stack>
                <Typography variant="body2" fontStyle={'italic'}>
                  {Charge.Warning}
                </Typography>
              </Stack>
              <Stack direction={'row'} spacing={1}>
                <Typography variant="body2">
                  <strong>
                    {new Intl.NumberFormat('tr-TR', {
                      style: 'currency',
                      currency: 'TRY'
                    }).format(Charge.Price)}
                  </strong>
                </Typography>
              </Stack>
            </Stack>
          </Box>
        }
      />
    </ListItem>
  );
};

export { ExtraChargeListItem };
