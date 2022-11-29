import {
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  Box,
  Stack,
  ListItemSecondaryAction
} from '@mui/material';
import { DeleteOutlined } from '@ant-design/icons';
import { NumberInput } from '../../components/form/NumberInput';
import { ShoppingCartItemDTO } from '../../models/dtos/shopping-cart.dto';
import { useAppDispatch } from '../../store/hooks';
import { removeCartItem } from '../../store/shopping-cart/shoppingCartSlice';

interface ShoppingCartItemProps {
  Item: ShoppingCartItemDTO;
}

const ShoppingCartListItem = ({ Item }: ShoppingCartItemProps) => {
  const dispatch = useAppDispatch();
  const active = !!Item.Price;

  const handleDeleteCartItem = (productId: string) => {
    dispatch(removeCartItem(productId));
  };

  return (
    <ListItem disabled={!active} key={Item.ProductId} alignItems="flex-start">
      <ListItemSecondaryAction sx={{ height: '100%' }}>
        <IconButton edge="end" onClick={() => handleDeleteCartItem(Item.ProductId)}>
          <DeleteOutlined />
        </IconButton>
      </ListItemSecondaryAction>
      <ListItemText
        primary={Item.Name}
        primaryTypographyProps={{ fontWeight: 'bold' }}
        secondaryTypographyProps={{ component: 'div' }}
        secondary={
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <NumberInput Disabled={!active} MinNumber={1} Counter={Item.Count} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Stack direction={'row'} spacing={1}>
                <Typography variant="body2">{Item.UnitAmount}</Typography>
                <Typography variant="body2">{'x'}</Typography>
                <Typography variant="body2">{Item.Count}</Typography>
              </Stack>
              <Typography variant="body2">
                <strong>{Item.TotalAmount}</strong>
              </Typography>
            </Box>
          </Box>
        }
      />
    </ListItem>
  );
};

export default ShoppingCartListItem;
