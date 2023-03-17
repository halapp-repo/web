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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Stack direction={'row'} spacing={1}>
                <Typography variant="body2">
                  {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(
                    Charge.Price
                  )}
                </Typography>
              </Stack>
            </Box>
          </Box>
        }
      />
    </ListItem>
  );
};

export { ExtraChargeListItem };
