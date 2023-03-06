import React, { ReactElement, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchPrices,
  selectPriceIsLoading,
  selectPriceListItemsOfSelectedDate
} from '../../store/prices/pricesSlice';
import { selectProducts } from '../../store/inventories/inventoriesSlice';
import {
  selectUIListingSelectedDate,
  selectUIListingProductNameFilter,
  updateListingSelectedDate
} from '../../store/ui/uiSlice';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Toolbar,
  TableSortLabel,
  Chip
} from '@mui/material';
import { ProductType } from '@halapp/common';
import moment from 'moment';
import { Order } from '../../utils/order';
import { getComparator } from '../../utils/sort';
import PriceTableRow from './PriceTableRow';
import PriceDialog from './PriceDialog';
import { contains } from '../../utils/filter';
import { Price } from '../../models/price';
import { selectSelectedCity } from '../../store/cities/citiesSlice';
import { RetryOnError } from '../../components/RetryOnError';

type SortablePriceListItem = Pick<Price, 'Price' | 'ProductName'>;

const PriceTable = () => {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof SortablePriceListItem>('ProductName');
  const [open, setOpen] = React.useState<string>('');

  const dispatch = useAppDispatch();
  const selectedDate = useAppSelector(selectUIListingSelectedDate);
  const inventories = useAppSelector(selectProducts);
  const selectedDatePrices = useAppSelector(selectPriceListItemsOfSelectedDate);
  const isLoading = useAppSelector(selectPriceIsLoading);
  const filteringProductName = useAppSelector(selectUIListingProductNameFilter);
  const selectedCity = useAppSelector(selectSelectedCity);

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
  const handleRetry = () => {
    dispatch(
      fetchPrices({
        location: selectedCity,
        type: ProductType.produce,
        date: selectedDate
      })
    );
  };

  useEffect(() => {
    if (!selectedDate) {
      dispatch(updateListingSelectedDate());
    }
    if (typeof selectedDatePrices === 'undefined') {
      dispatch(
        fetchPrices({
          location: selectedCity,
          type: ProductType.produce,
          date: selectedDate
        })
      );
    }
  }, [selectedDate]);

  const createTableRow = (prices: Price[] | null | undefined): ReactElement[] => {
    if (isLoading || inventories?.length == 0) {
      return [
        <TableRow key="0" sx={{ height: '20vh' }}>
          <TableCell colSpan={3} align="center" sx={{ height: '80%' }}>
            <CircularProgress />
          </TableCell>
        </TableRow>
      ];
    } else if (prices === null) {
      return [
        <TableRow key="0" sx={{ height: '20vh' }}>
          <TableCell colSpan={3} align="center" sx={{ height: '80%' }}>
            <RetryOnError HandleRetry={handleRetry} />
          </TableCell>
        </TableRow>
      ];
    }
    return (prices || [])
      .sort(getComparator(order, orderBy))
      .filter((p) => {
        if (!filteringProductName) {
          return true;
        } else {
          return contains(p.ProductName.toLowerCase(), filteringProductName);
        }
      })
      .map((p) => (
        <PriceTableRow
          PriceListItem={p}
          key={p.ProductId}
          OpenAnalyticsPanel={handleOpenAnalyticsPanel}
        />
      ));
  };

  return (
    <>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%'
        }}>
        <Toolbar>
          <Typography variant="h3" color="inherit">
            {selectedDate && moment(selectedDate).format('DD.MM.YYYY')}
            <Typography color="text.secondary" variant="body2">
              {`Meyve/Sebze `}
              <Chip color="default" size="small" label={selectedCity} variant="outlined" />
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
                  Ürün
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
          <TableBody>{createTableRow(selectedDatePrices)}</TableBody>
        </Table>
      </TableContainer>
      <PriceDialog
        Location={selectedCity}
        Type={ProductType.produce}
        CloseAnalyticsPanel={handleCloseAnalyticsPanel}
        ProductId={open}
      />
    </>
  );
};
export default PriceTable;
