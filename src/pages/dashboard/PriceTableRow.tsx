import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { Box, TableCell, TableRow, Typography, Button } from '@mui/material';
import React from 'react';
import { PriceListItemVM } from '../../models/viewmodels/price-list-item.dto';
import { useAppDispatch } from '../../store/hooks';
import { addCartItem } from '../../store/shopping-cart/shoppingCartSlice';
import { toggleShoppingCart } from '../../store/ui/uiSlice';

interface PriceTableRowProps {
  PriceListItem: PriceListItemVM;
  OpenAnalyticsPanel: (event: React.MouseEvent<unknown>, productId: string) => void;
}

const PriceTableRow = ({ PriceListItem, OpenAnalyticsPanel }: PriceTableRowProps) => {
  const dispatch = useAppDispatch();
  const increase = PriceListItem.Increase;

  const handleOnClick = (productId: string, isClickable: boolean) => {
    if (!isClickable) {
      return;
    } else {
      dispatch(addCartItem(productId));
      dispatch(toggleShoppingCart(true));
    }
  };

  return (
    <TableRow
      onClick={() =>
        handleOnClick(PriceListItem.ProductId, PriceListItem.IsToday || PriceListItem.IsActive)
      }
      sx={{
        '&:last-child td, &:last-child th': { border: 0 },
        width: '100%',
        cursor: PriceListItem.IsToday || PriceListItem.IsActive ? 'pointer' : 'default'
      }}
      key={PriceListItem.ProductId}>
      <TableCell align="left">
        <Typography variant="body1" color="inherit">
          {PriceListItem.ProductName}
        </Typography>
      </TableCell>
      <TableCell align="left">
        <Typography variant="body1" color="inherit">
          {PriceListItem.Unit}
        </Typography>
      </TableCell>
      <TableCell align="right">
        {PriceListItem.IsToday || PriceListItem.IsActive ? (
          <Button
            variant="text"
            onClick={(e) => {
              e.stopPropagation();
              OpenAnalyticsPanel(e, PriceListItem.ProductId);
            }}>
            <Typography variant="h5" color="inherit">
              {PriceListItem.Amount}
            </Typography>
          </Button>
        ) : (
          <Typography variant="h5" color="inherit">
            {PriceListItem.Amount}
          </Typography>
        )}

        {increase < 0 && (
          <Box sx={{ color: 'error.main', fontWeight: 'bold', padding: '0px 8px' }}>
            <CaretDownOutlined />
            {` %${increase}`}
          </Box>
        )}
        {increase > 0 && (
          <Box sx={{ color: 'success.main', fontWeight: 'bold', padding: '0px 8px' }}>
            <CaretUpOutlined />
            {` %${increase}`}
          </Box>
        )}
      </TableCell>
    </TableRow>
  );
};

export default PriceTableRow;
