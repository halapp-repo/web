import { Stack, Typography, ButtonBase, List, ListItem, ListItemText, Box } from '@mui/material';
import { useState } from 'react';
import { useTheme } from '@mui/system';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { ShoppingCartList } from '../../models/viewmodels/shopping-cart-list-item';

interface SummaryOrderProps {
  ShoppingCart: ShoppingCartList;
}

const SummaryOrder = ({ ShoppingCart }: SummaryOrderProps) => {
  const theme = useTheme();
  const [showAllItems, setShowAllItems] = useState<boolean>(false);
  return (
    <Box>
      <Typography variant="h5" fontWeight={'bold'} sx={{ mb: '10px' }}>
        {'Sipariş özeti'}
      </Typography>
      <ButtonBase
        sx={{ width: '100%', display: 'block' }}
        onClick={() => {
          setShowAllItems(!showAllItems);
        }}>
        <Stack direction={'row'} justifyContent="space-between">
          <Stack direction={'row'}>
            <Typography
              fontWeight={'bold'}
              color={theme.palette.info.main}
              variant="body2">{`Ürünler (${ShoppingCart.Items.length}):`}</Typography>
            {showAllItems ? (
              <ArrowDropUpIcon fontSize="small" />
            ) : (
              <ArrowDropDownIcon fontSize="small" />
            )}
          </Stack>
          <Typography variant="body2">{`${ShoppingCart.TotalAmount}`}</Typography>
        </Stack>
        {showAllItems && (
          <List>
            {ShoppingCart.Items.map((i) => (
              <ListItem key={i.ProductId}>
                <ListItemText
                  primary={
                    <Stack direction={'row'} justifyContent="space-between">
                      <Typography variant="body2">{i.Name}</Typography>
                      <Typography variant="body2">{i.TotalAmount}</Typography>
                    </Stack>
                  }
                  secondary={
                    <Typography
                      color="secondary"
                      variant="body2">{`${i.UnitAmount} x ${i.Count} ${i.Unit}`}</Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
      </ButtonBase>
    </Box>
  );
};

export { SummaryOrder };
