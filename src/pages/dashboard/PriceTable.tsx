import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchPrices } from '../../store/prices/pricesSlice';
import {
  Box,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from '@mui/material';

const PriceTable = () => {
  const dispatch = useAppDispatch();
  const selectedDate = useAppSelector((s) => s.ui.prices.selectedDate);
  const prices = useAppSelector((s) => s.prices[selectedDate]);

  useEffect(() => {
    console.log(selectedDate);
    if (prices == undefined) {
      dispatch(fetchPrices({ location: 'istanbul', type: 'produce', date: selectedDate }));
    }
  }, []);
  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}>
        <Table
          aria-labelledby="tableTitle"
          sx={{
            '& .MuiTableCell-root:first-child': {
              pl: 2
            },
            '& .MuiTableCell-root:last-child': {
              pr: 3
            }
          }}>
          <TableHead>
            <TableRow>
              <TableCell align="left">Urun</TableCell>
              <TableCell align="left">Birim</TableCell>
              <TableCell align="right">Fiyat</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(prices || []).map((p, i) => {
              return (
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  key={p.ProductId}>
                  <TableCell align="left">{p.ProductId}</TableCell>
                  <TableCell align="left">{p.Unit}</TableCell>
                  <TableCell align="right">{`₺${p.Price}`}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default PriceTable;
