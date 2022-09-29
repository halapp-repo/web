import React, { ReactElement, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchPrices } from '../../store/prices/pricesSlice';
import { selectProducts } from '../../store/inventories/inventoriesSlice';
import { selectPricesOfSelectedDate } from '../../store/prices/pricesSlice';
import { selectUIPricesSelectedDate } from '../../store/ui/uiSlice';
import { RiseOutlined, FallOutlined, StockOutlined, MinusOutlined } from '@ant-design/icons';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  useMediaQuery,
  Theme
} from '@mui/material';
import { LocationType } from '../../models/location-type';
import { ProductType } from '../../models/product-type-type';
import { Price } from '../../models/price';
import { getNewestPricesByDate } from '../../models/services/price.model.service';

interface PriceListItem {
  Price: number;
  ProductName: string;
  Unit: string;
  ProductId: string;
  PreviousPrice?: number;
}
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
  const dispatch = useAppDispatch();
  const selectedDate = useAppSelector(selectUIPricesSelectedDate);
  const inventories = useAppSelector(selectProducts);
  const selectedDatePrices = useAppSelector(selectPricesOfSelectedDate);

  const matchesSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const createTableRow = (prices: Price[]): ReactElement[] => {
    return Object.values(
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
        if (!todayPrice) {
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
      .sort((a, b) => {
        const textA = a.ProductName.toUpperCase();
        const textB = b.ProductName.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      })
      .map((p) => {
        const increase = calculatePercentage(p);

        return (
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={p.ProductId}>
            <TableCell align="left">{p.ProductName}</TableCell>
            <TableCell align="left">{p.Unit}</TableCell>
            {!matchesSm && (
              <TableCell align="left">
                <Chip
                  variant="filled"
                  color={increase > 0 ? 'warning' : increase < 0 ? 'success' : 'secondary'}
                  icon={
                    <>
                      {increase == 0 && (
                        <MinusOutlined style={{ fontSize: '0.75rem', color: 'inherit' }} />
                      )}
                      {increase > 0 && (
                        <RiseOutlined style={{ fontSize: '0.75rem', color: 'inherit' }} />
                      )}
                      {increase < 0 && (
                        <FallOutlined style={{ fontSize: '0.75rem', color: 'inherit' }} />
                      )}
                    </>
                  }
                  label={`%${Math.abs(increase)}`}
                  sx={{ ml: 1.25, pl: 1 }}
                  size="small"
                />
              </TableCell>
            )}

            <TableCell align="right">
              <Typography variant="h5" color="inherit">
                {`₺${p.Price}`}
              </Typography>
            </TableCell>
          </TableRow>
        );
      });
  };

  useEffect(() => {
    if (!selectedDate) {
      return;
    }
    if (!selectedDatePrices) {
      dispatch(
        fetchPrices({
          location: LocationType.istanbul,
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
        <Table
          aria-labelledby="tableTitle"
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
              <TableCell align="left">Urun</TableCell>
              <TableCell align="left">Birim</TableCell>
              {!matchesSm && <TableCell align="left">Gunluk Degisim</TableCell>}
              <TableCell align="right">Fiyat</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{createTableRow(selectedDatePrices || [])}</TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default PriceTable;
