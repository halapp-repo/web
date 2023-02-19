import { Stack, Typography, Grid } from '@mui/material';
import { Order } from '../../../models/order';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';

interface OrderNoteProps {
  Order: Order;
}

const OrderNote = ({ Order }: OrderNoteProps) => {
  return (
    <Grid container>
      <Grid item xs={2} sm={1}>
        <CommentOutlinedIcon />
      </Grid>
      <Grid item xs={10} sm={11}>
        <Stack spacing={1}>
          <Grid container>
            <Grid item xs={12} sm={4}>
              <Typography variant="body1" fontWeight={'bold'} color="secondary">
                {'Sipariş Notu'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography>{Order.Note}</Typography>
            </Grid>
          </Grid>
        </Stack>
      </Grid>
    </Grid>
  );
};

export { OrderNote };
