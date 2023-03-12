import {
  Stack,
  Box,
  ListItem,
  ListItemText,
  Typography,
  ListItemSecondaryAction,
  IconButton
} from '@mui/material';
import { OrderItem as Item } from '../../../models/order';
import { DeleteFilled } from '@ant-design/icons';
import { selectUserAuth } from '../../../store/auth/authSlice';
import { useAppSelector } from '../../../store/hooks';

interface OrderItemProps {
  Item: Item;
  CanBeDeleted: boolean;
  OnDeleteItem: (productId: string) => void;
}

const OrderItem = ({ Item, CanBeDeleted, OnDeleteItem }: OrderItemProps) => {
  const { isAdmin } = useAppSelector(selectUserAuth);

  return (
    <ListItem key={Item.ProductId} alignItems="flex-start">
      {isAdmin && CanBeDeleted && (
        <ListItemSecondaryAction sx={{ height: '100%' }}>
          <IconButton
            edge="end"
            sx={{ color: '#8753de' }}
            onClick={() => OnDeleteItem(Item.ProductId)}>
            <DeleteFilled />
          </IconButton>
        </ListItemSecondaryAction>
      )}
      <ListItemText
        primary={Item.ProductName}
        primaryTypographyProps={{ fontWeight: 'bold' }}
        secondaryTypographyProps={{ component: 'div' }}
        secondary={
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Stack direction={'row'} spacing={1}>
                <Typography variant="body2">
                  {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(
                    Item.Price
                  )}
                </Typography>
                <Typography variant="body2">{'x'}</Typography>
                <Typography variant="body2" fontWeight={'bold'}>
                  {`(${Item.Count})${Item.Unit}`}
                </Typography>
              </Stack>
              <Typography variant="body2">
                <strong>
                  {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(
                    Item.TotalPrice
                  )}
                </strong>
              </Typography>
            </Box>
          </Box>
        }
      />
    </ListItem>
  );
};

export { OrderItem };
