import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import {
  Box,
  TableCell,
  TableRow,
  Typography,
  Button,
  Collapse
  // useMediaQuery,
} from '@mui/material';

interface PriceTableRowProps {
  ProductId: string;
  ProductName: string;
  Unit: string;
  Price: number;
  PreviousPrice?: number;
}

const calculatePercentage = (price: number, previousPrice?: number): number => {
  if (!previousPrice) {
    return 0;
  }
  return Math.round(((price - previousPrice) / previousPrice) * 100);
};

const PriceTableRow = ({
  ProductId,
  ProductName,
  Unit,
  PreviousPrice,
  Price
}: PriceTableRowProps) => {
  const increase = calculatePercentage(Price, PreviousPrice);
  return (
    <>
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
          <Button variant="text">
            <Typography variant="h5" color="inherit">
              {`₺${(Math.round(Price * 100) / 100).toFixed(2)}`}
            </Typography>
          </Button>
          {increase < 0 && (
            <Box sx={{ color: 'error.main', display: 'inline', fontWeight: 'bold' }}>
              <CaretDownOutlined />
              {` %${increase}`}
            </Box>
          )}
          {increase > 0 && (
            <Box sx={{ color: 'success.main', display: 'inline', fontWeight: 'bold' }}>
              <CaretUpOutlined />
              {` %${increase}`}
            </Box>
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse in={true} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default PriceTableRow;
