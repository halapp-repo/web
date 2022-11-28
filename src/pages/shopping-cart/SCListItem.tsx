import {
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  Button,
  Box,
  Collapse,
  Stack,
  ListItemSecondaryAction
} from '@mui/material';
import { DeleteOutlined } from '@ant-design/icons';
import { ShoppingCartItem } from '../../models/shopping-cart';
import { NumberInput } from '../../components/form/NumberInput';

interface ShoppingCartItemProps {
  Item: ShoppingCartItem;
}

const ShoppingCartListItem = ({ Item }: ShoppingCartItemProps) => {
  return (
    <ListItem key={Item.ProductId} alignItems="flex-start">
      <ListItemSecondaryAction sx={{ height: '100%' }}>
        <IconButton edge="end">
          <DeleteOutlined />
        </IconButton>
      </ListItemSecondaryAction>
      <ListItemText
        primary={Item.Name}
        primaryTypographyProps={{ fontWeight: 'bold' }}
        secondary={
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <NumberInput MinNumber={1} Counter={Item.Count} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Stack direction={'row'} spacing={1}>
                <Typography variant="body2">12345</Typography>
                <Typography variant="body2">{'x'}</Typography>
                <Typography variant="body2">{Item.Count}</Typography>
              </Stack>
              <Typography variant="body2">
                <strong>12345</strong>
              </Typography>
            </Box>
          </Box>
        }
      />
    </ListItem>
  );
};

export default ShoppingCartListItem;
