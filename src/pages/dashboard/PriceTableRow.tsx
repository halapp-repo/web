import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { Box, TableCell, TableRow, Typography, Button } from '@mui/material';
import React from 'react';

interface PriceTableRowProps {
  ProductId: string;
  ProductName: string;
  Unit: string;
  Price: number;
  Increase: number;
  IsToday: boolean;
  IsActive: boolean;
  OpenAnalyticsPanel: (event: React.MouseEvent<unknown>, productId: string) => void;
}

const PriceTableRow = ({
  ProductId,
  ProductName,
  Unit,
  Increase,
  Price,
  IsToday,
  IsActive,
  OpenAnalyticsPanel
}: PriceTableRowProps) => {
  const increase = Increase;

  const handleOnClick = (e: React.TouchEvent | React.MouseEvent) => {
    console.log(e);
  };

  return (
    <TableRow
      onClick={handleOnClick}
      sx={{
        '&:last-child td, &:last-child th': { border: 0 },
        width: '100%',
        cursor: IsToday || IsActive ? 'pointer' : 'default'
      }}
      key={ProductId}>
      <TableCell align="left">
        <Typography variant="body1" color="inherit">
          {ProductName}
        </Typography>
      </TableCell>
      <TableCell align="left">
        <Typography variant="body1" color="inherit">
          {Unit}
        </Typography>
      </TableCell>
      <TableCell align="right">
        {IsToday || IsActive ? (
          <Button
            variant="text"
            onClick={(e) => {
              e.stopPropagation();
              OpenAnalyticsPanel(e, ProductId);
            }}>
            <Typography variant="h5" color="inherit">
              {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(Price)}
            </Typography>
          </Button>
        ) : (
          <Typography variant="h5" color="inherit">
            {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(Price)}
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
