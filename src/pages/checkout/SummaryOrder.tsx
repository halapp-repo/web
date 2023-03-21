import { Stack, Typography, List, ListItem, ListItemText, Box, Button } from '@mui/material';
import React, { useState } from 'react';
import { useTheme } from '@mui/system';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { ShoppingCartList } from '../../models/viewmodels/shopping-cart-list-item';
import { useNavigate } from 'react-router-dom';
import { getComparator } from '../../utils/sort';

interface SummaryOrderProps {
  ShoppingCart: ShoppingCartList;
}

const SummaryOrder = ({ ShoppingCart }: SummaryOrderProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [showAllItems, setShowAllItems] = useState<boolean>(true);

  const handleReturnToShopping = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();

    navigate('/shopping-cart');
  };
  return (
    <Box>
      <Typography variant="h5" fontWeight={'bold'} sx={{ mb: '10px' }}>
        {'Sipariş özeti'}
      </Typography>
      <Box
        sx={{ width: '100%', display: 'block', cursor: 'pointer' }}
        onClick={() => {
          setShowAllItems(!showAllItems);
        }}>
        <Stack direction={'row'} justifyContent="space-between">
          <Stack direction={'row'}>
            <Typography
              fontWeight={'bold'}
              color={theme.palette.info.main}
              variant="body2">{`Ürünler (${ShoppingCart.ActiveItems.length}):`}</Typography>
            {showAllItems ? (
              <ArrowDropUpIcon fontSize="small" />
            ) : (
              <ArrowDropDownIcon fontSize="small" />
            )}
          </Stack>
          <Typography
            variant="body2"
            fontWeight={'bold'}>{`${ShoppingCart.TotalAmount}`}</Typography>
        </Stack>
        {showAllItems && (
          <List>
            {ShoppingCart.ActiveItems.sort(getComparator('asc', 'Name')).map((i) => (
              <ListItem key={i.ProductId}>
                <ListItemText
                  primary={
                    <Stack direction={'row'} justifyContent="space-between">
                      <Typography variant="body2" fontWeight={'bold'}>
                        {i.Name}
                      </Typography>
                      <Typography variant="body2" fontWeight={'bold'}>
                        {i.TotalAmount}
                      </Typography>
                    </Stack>
                  }
                  secondary={
                    <Typography
                      color="secondary"
                      fontWeight={'bold'}
                      variant="body2">{`${i.UnitAmount} x ${i.Count} ${i.Unit}`}</Typography>
                  }
                />
              </ListItem>
            ))}
            <ListItem key={0}>
              <Button
                onClick={handleReturnToShopping}
                sx={{ textTransform: 'none' }}
                size={'small'}
                color="blackNWhite"
                variant="outlined">
                {'Bir ürün mü unuttun? Sepete geri dön.'}
              </Button>
            </ListItem>
          </List>
        )}
      </Box>
    </Box>
  );
};

export { SummaryOrder };
