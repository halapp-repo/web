import {
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  Box,
  Stack,
  ListItemSecondaryAction,
  Alert
} from '@mui/material';
import { DeleteOutlined } from '@ant-design/icons';
import { NumberInput } from '../../components/form/NumberInput';
import { ShoppingCartListItem as SCItem } from '../../models/viewmodels/shopping-cart-list-item';
import { useAppDispatch } from '../../store/hooks';
import { removeCartItem, updateCartItemCount } from '../../store/shopping-cart/shoppingCartSlice';

interface ShoppingCartItemProps {
  Item: SCItem;
}

const ShoppingCartListItem = ({ Item }: ShoppingCartItemProps) => {
  const dispatch = useAppDispatch();
  const active = !!Item.Price;

  const handleDeleteCartItem = (productId: string) => {
    dispatch(removeCartItem(productId));
  };
  const handleUpdateCounter = (counter: number, productId: string) => {
    dispatch(
      updateCartItemCount({
        Count: counter,
        ProductId: productId
      })
    );
  };

  return (
    <ListItem alignItems="flex-start">
      <ListItemText
        primary={
          active ? (
            Item.Name
          ) : (
            <Stack>
              <Alert severity="warning">{`${Item.Name} şu anda envanterimizde bulunmamaktadır.`}</Alert>
              <s>{Item.Name}</s>
            </Stack>
          )
        }
        primaryTypographyProps={{ fontWeight: 'bold' }}
        secondaryTypographyProps={{ component: 'div' }}
        secondary={
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <NumberInput
                Disabled={!active}
                MinNumber={1}
                Counter={Item.Count}
                CounterText={(counter: number) => (
                  <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: '5px' }}>
                    <Typography>{`${counter}`}</Typography>
                    <Typography variant="subtitle2">{`${Item.Unit || ''}`}</Typography>
                  </Box>
                )}
                OnUpdateCounter={(counter) => {
                  handleUpdateCounter(counter, Item.ProductId);
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {Item.UnitAmount ? (
                <>
                  <Stack direction={'row'} spacing={1}>
                    <Typography variant="body2">{Item.UnitAmount}</Typography>
                    <Typography variant="body2">{'x'}</Typography>
                    <Typography variant="body2">{Item.Count}</Typography>
                  </Stack>
                  <Typography variant="body2">
                    <strong>{Item.TotalAmount}</strong>
                  </Typography>
                </>
              ) : undefined}
            </Box>
          </Box>
        }
      />
      <ListItemSecondaryAction sx={{ height: '100%' }}>
        <IconButton edge="end" onClick={() => handleDeleteCartItem(Item.ProductId)}>
          <DeleteOutlined />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default ShoppingCartListItem;
