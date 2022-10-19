import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { Box, TableCell, TableRow, Typography, Button } from '@mui/material';

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

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={ProductId}>
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
          <Button variant="text" onClick={(e) => OpenAnalyticsPanel(e, ProductId)}>
            <Typography variant="h5" color="inherit">
              {`₺${(Math.round(Price * 100) / 100).toFixed(2)}`}
            </Typography>
          </Button>
        ) : (
          <Typography variant="h5" color="inherit">
            {`₺${(Math.round(Price * 100) / 100).toFixed(2)}`}
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
