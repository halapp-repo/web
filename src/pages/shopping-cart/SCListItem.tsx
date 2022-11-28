import { ListItem, ListItemText, Typography, IconButton, Button, Box } from '@mui/material';
import { DeleteOutlined } from '@ant-design/icons';
import { ShoppingCartItem } from '../../models/shopping-cart';

interface ShoppingCartItemProps {
  Item: ShoppingCartItem;
}

const ShoppingCartListItem = ({ Item }: ShoppingCartItemProps) => {
  return (
    <ListItem
      key={Item.ProductId}
      alignItems="flex-start"
      secondaryAction={
        <IconButton edge="end">
          <DeleteOutlined />
        </IconButton>
      }>
      <ListItemText
        primary={Item.Name}
        primaryTypographyProps={{ fontWeight: 'bold' }}
        secondary={
          <Box>
            <Button>{'xXXXX'}</Button> {'x'}
          </Box>
        }
      />
    </ListItem>
  );
};

export default ShoppingCartListItem;
