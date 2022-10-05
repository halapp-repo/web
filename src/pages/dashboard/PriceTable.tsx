import React, { ReactElement, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchPrices, selectPriceIsLoading } from '../../store/prices/pricesSlice';
import { selectProducts } from '../../store/inventories/inventoriesSlice';
import { selectPricesOfSelectedDate } from '../../store/prices/pricesSlice';
import {
  selectUIListingSelectedDate,
  selectUIListingProductNameFilter
} from '../../store/ui/uiSlice';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
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
  // useMediaQuery,
} from '@mui/material';
import { City } from '../../models/city';
import { ProductType } from '../../models/product-type-type';
import { Price } from '../../models/price';
import { getNewestPricesByDate } from '../../models/services/price.model.service';
import moment from 'moment';
import { selectUIListingSelectedCity } from '../../store/ui/uiSlice';
import { Order } from '../../utils/order';
import { getComparator } from '../../utils/sort';

interface PriceListItem {
  Price: number;
  ProductName: string;
  Unit: string;
  ProductId: string;
  PreviousPrice?: number;
}
type SortablePriceListItem = Pick<PriceListItem, 'Price' | 'ProductName'>;
interface PriceGroup {
  [key: string]: Price[];
}

const calculatePercentage = (price: PriceListItem): number => {
  if (!price.PreviousPrice) {
    return 0;
  }
  return Math.round(((price.Price - price.PreviousPrice) / price.PreviousPrice) * 100);
};
const PriceTable = () => {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof SortablePriceListItem>('ProductName');

  const dispatch = useAppDispatch();
  const selectedDate = useAppSelector(selectUIListingSelectedDate);
  const inventories = useAppSelector(selectProducts);
  const selectedDatePrices = useAppSelector(selectPricesOfSelectedDate);
  const isLoading = useAppSelector(selectPriceIsLoading);
  const filteringProductName = useAppSelector(selectUIListingProductNameFilter);
  const selectedCity = useAppSelector(selectUIListingSelectedCity);

  // const matchesSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

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
    return (
      Object.values(
        //Iterate Group by
        prices.reduce((group: PriceGroup, price: Price) => {
          //Group Prices by ProductId
          const { ProductId } = price;
          if (group[ProductId]) {
            group[ProductId].push(price);
          } else {
            group[ProductId] = [price];
          }
          return group;
        }, {})
      )
        .map((pricesByProductId: Price[]): PriceListItem | null => {
          const [todayPrice, yesterdayPrice] = getNewestPricesByDate(pricesByProductId);
          if (!todayPrice || !todayPrice.isSameAsSelectedDate(selectedDate)) {
            return null;
          }
          return {
            Price: todayPrice.Price,
            ProductName:
              inventories?.find((i) => i.ProductId == todayPrice.ProductId)?.Name ||
              todayPrice.ProductId,
            Unit: todayPrice.Unit,
            ProductId: todayPrice.ProductId,
            PreviousPrice: yesterdayPrice?.Price
          } as PriceListItem;
        })
        .filter(Boolean)
        .map((a) => a!)
        // .sort((a, b) => {
        //   const textA = a.ProductName.toUpperCase();
        //   const textB = b.ProductName.toUpperCase();
        //   return textA < textB ? -1 : textA > textB ? 1 : 0;
        // })
        .sort(getComparator(order, orderBy))
        .filter((p) => {
          if (!filteringProductName) {
            return true;
          } else {
            return p.ProductName.toLocaleLowerCase().includes(filteringProductName);
          }
        })
        .map((p) => {
          const increase = calculatePercentage(p);

          return (
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={p.ProductId}>
              <TableCell align="left">
                <Typography variant="body1" color="inherit">
                  {p.ProductName}
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="body1" color="inherit">
                  {p.Unit}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h5" color="inherit">
                  {`₺${(Math.round(p.Price * 100) / 100).toFixed(2)}`}
                </Typography>
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
          );
        })
    );
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof SortablePriceListItem
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
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
    </Box>
  );
};
export default PriceTable;
