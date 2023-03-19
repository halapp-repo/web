import { useState, useEffect } from 'react';
import {
  Box,
  useMediaQuery,
  Theme,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  useTheme,
  Typography,
  Tabs,
  Tab
} from '@mui/material';
import { CloseOutlined } from '@ant-design/icons';
import PriceChart from './PriceChart';
import { CityType, ProductType } from '@halapp/common';
import { useAppSelector } from '../../store/hooks';
import { selectProductByProductId } from '../../store/inventories/inventoriesSlice';
import {
  selectChartSlot,
  selectProductCurrentPrice,
  selectProductDailyPriceIncrease
} from '../../store/product-prices/productPricesSlice';

interface PriceDialogProps {
  ProductId: string;
  Location: CityType;
  Type: ProductType;
  CloseAnalyticsPanel: (event: React.MouseEvent<unknown>) => void;
}

const PriceDialog = ({ ProductId, Location, Type, CloseAnalyticsPanel }: PriceDialogProps) => {
  const theme = useTheme();
  const matchesSM = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const chartSlot = useAppSelector(selectChartSlot);
  const [slot, setSlot] = useState(chartSlot['1WEEK']);
  const product = useAppSelector((state) => selectProductByProductId(state, ProductId));
  const currentPrice = useAppSelector((state) => selectProductCurrentPrice(state, ProductId));
  const dailyPriceIncrease = useAppSelector((state) =>
    selectProductDailyPriceIncrease(state, ProductId)
  );

  useEffect(() => {
    setSlot(chartSlot['1WEEK']);
  }, [ProductId]);

  return (
    <Dialog
      fullScreen={matchesSM}
      fullWidth={true}
      open={ProductId !== ''}
      aria-labelledby="responsive-dialog-title">
      <DialogTitle
        sx={{
          height: `${theme.spacing(10)}`,
          width: '100%',
          paddingBottom: '0'
        }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
          <Box
            sx={{
              flexBasis: '80%',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
            <Typography variant="h4">{product?.Name}</Typography>
          </Box>
          <IconButton onClick={CloseAnalyticsPanel} color="error">
            <CloseOutlined />
          </IconButton>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: '50px',
            display: 'flex'
          }}>
          {currentPrice && (
            <Typography variant="h3" color="text.secondary" fontWeight="bold">
              ₺{currentPrice}
            </Typography>
          )}
          <span>&nbsp;</span>
          {dailyPriceIncrease && dailyPriceIncrease !== 0 && (
            <Typography
              variant="body2"
              color={dailyPriceIncrease > 0 ? 'success.main' : 'error.main'}
              sx={{
                alignSelf: 'flex-start'
              }}>
              {`%${dailyPriceIncrease}`}
            </Typography>
          )}
        </Box>
      </DialogTitle>
      <DialogContent
        sx={{
          padding: `${theme.spacing(5)} 0 ${theme.spacing(5)} 0`,
          overflowY: 'hidden',
          width: {
            sx: '100%',
            sm: `calc(100% - ${theme.spacing(11)} )`
          }
        }}>
        <div
          style={{
            flexGrow: 1,
            backgroundColor: 'background.paper',
            display: 'flex',
            height: '100%'
          }}>
          {matchesSM && (
            <Tabs
              variant="scrollable"
              value={slot.key}
              sx={{ borderRight: 1, borderColor: 'divider', width: '100%' }}>
              <Tab
                label="1H"
                value={chartSlot['1WEEK'].key}
                onClick={() => setSlot(chartSlot['1WEEK'])}
              />
              <Tab
                label="1A"
                value={chartSlot['1MONTH'].key}
                onClick={() => setSlot(chartSlot['1MONTH'])}
              />
            </Tabs>
          )}
          {matchesSM || (
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={slot.key}
              sx={{ borderRight: 1, borderColor: 'divider', width: '10%' }}>
              <Tab
                label="1H"
                value={chartSlot['1WEEK'].key}
                onClick={() => setSlot(chartSlot['1WEEK'])}
              />
              <Tab
                label="1A"
                value={chartSlot['1MONTH'].key}
                onClick={() => setSlot(chartSlot['1MONTH'])}
              />
            </Tabs>
          )}
          <PriceChart Slot={slot} ProductId={ProductId} Location={Location} Type={Type} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PriceDialog;
