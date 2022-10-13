import React, { ReactElement, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchPrices, selectPriceIsLoading } from '../../store/prices/pricesSlice';
import { selectProducts } from '../../store/inventories/inventoriesSlice';
import { selectPricesOfSelectedDate } from '../../store/prices/pricesSlice';
import {
  selectUIListingSelectedDate,
  selectUIListingProductNameFilter
} from '../../store/ui/uiSlice';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Toolbar,
  TableSortLabel
} from '@mui/material';
import { City } from '../../models/city';
import { ProductType } from '../../models/product-type';
import { Price } from '../../models/price';
import moment from 'moment';
import { selectUIListingSelectedCity } from '../../store/ui/uiSlice';
import { Order } from '../../utils/order';
import { getComparator } from '../../utils/sort';
import PriceTableRow from './PriceTableRow';
import PriceDialog from './PriceDialog';

interface PriceListItem {
  Price: number;
  ProductName: string;
  Unit: string;
  ProductId: string;
  Increase: number;
  IsToday: boolean;
}
type SortablePriceListItem = Pick<PriceListItem, 'Price' | 'ProductName'>;

const PriceTable = () => {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof SortablePriceListItem>('ProductName');
  const [open, setOpen] = React.useState<string>('');

  const dispatch = useAppDispatch();
  const selectedDate = useAppSelector(selectUIListingSelectedDate);
  const inventories = useAppSelector(selectProducts);
  const selectedDatePrices = useAppSelector(selectPricesOfSelectedDate);
  const isLoading = useAppSelector(selectPriceIsLoading);
  const filteringProductName = useAppSelector(selectUIListingProductNameFilter);
  const selectedCity = useAppSelector(selectUIListingSelectedCity);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof SortablePriceListItem
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleOpenAnalyticsPanel = (_: React.MouseEvent<unknown>, productId: string) => {
    setOpen(productId);
  };
  const handleCloseAnalyticsPanel = () => {
    setOpen('');
  };

  useEffect(() => {
    if (!selectedDate) {
      return;
    }
    if (!selectedDatePrices) {
      dispatch(
        fetchPrices({
          location: City.istanbul,
          type: ProductType.produce,
          date: selectedDate
        })
      );
    }
  }, [selectedDate]);

  const createTableRow = (prices: Price[]): ReactElement[] => {
    if (isLoading || inventories?.length == 0) {
      return [
        <TableRow key="0" sx={{ height: '20vh' }}>
          <TableCell colSpan={3} align="center" sx={{ height: '80%' }}>
            <CircularProgress />
          </TableCell>
        </TableRow>
      ];
    }
    return prices
      .map<PriceListItem>((p) => ({
        IsToday: p.IsToday || false,
        Price: p.Price,
        ProductId: p.ProductId,
        ProductName: inventories?.find((i) => i.ProductId == p.ProductId)?.Name || p.ProductId,
        Unit: p.Unit,
        Increase: p.Increase || 0
      }))
      .sort(getComparator(order, orderBy))
      .filter((p) => {
        if (!filteringProductName) {
          return true;
        } else {
          return p.ProductName.toLowerCase().includes(filteringProductName);
        }
      })
      .map((p) => (
        <PriceTableRow
          key={p.ProductId}
          Price={p.Price}
          ProductId={p.ProductId}
          ProductName={p.ProductName}
          Unit={p.Unit}
          IsToday={p.IsToday}
          Increase={p.Increase}
          OpenAnalyticsPanel={handleOpenAnalyticsPanel}
        />
      ));
  };

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
        <Toolbar>
          <Typography variant="h3" color="inherit">
            {selectedDate && moment(selectedDate).format('DD.MM.YYYY')}
            <Typography color="text.secondary" variant="body2">
              Meyve/Sebze {'>'} {selectedCity && selectedCity.toUpperCase()}
            </Typography>
          </Typography>
        </Toolbar>
        <Table
          sx={{
            width: '100%',
            '& .MuiTableCell-root:first-child': {
              pl: 2
            },
            '& .MuiTableCell-root:last-child': {
              pr: 3
            }
          }}>
          <TableHead>
            <TableRow>
              <TableCell align="left" sortDirection={orderBy === 'ProductName' ? order : false}>
                <TableSortLabel
                  onClick={(e) => handleRequestSort(e, 'ProductName')}
                  active={orderBy === 'ProductName'}
                  direction={orderBy === 'ProductName' ? order : 'asc'}>
                  Urun
                </TableSortLabel>
              </TableCell>
              <TableCell align="left">Birim</TableCell>
              <TableCell align="right" sortDirection={orderBy === 'Price' ? order : false}>
                <TableSortLabel
                  onClick={(e) => handleRequestSort(e, 'Price')}
                  active={orderBy === 'Price'}
                  direction={orderBy === 'Price' ? order : 'asc'}>
                  Fiyat
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{createTableRow(selectedDatePrices || [])}</TableBody>
        </Table>
      </TableContainer>
      <PriceDialog
        Location={City.istanbul}
        Type={ProductType.produce}
        CloseAnalyticsPanel={handleCloseAnalyticsPanel}
        ProductId={open}
      />
    </Box>
  );
};
export default PriceTable;
