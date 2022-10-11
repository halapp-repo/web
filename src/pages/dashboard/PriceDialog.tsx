import { useState, useEffect } from 'react';
import {
  Box,
  useMediaQuery,
  Theme,
  Dialog,
  Button,
  DialogContent,
  DialogTitle,
  IconButton,
  useTheme,
  Typography
} from '@mui/material';
import { CloseOutlined } from '@ant-design/icons';
import PriceChart from './PriceChart';
import { IntervalType } from '../../models/interval-type';
import { City } from '../../models/city';
import { ProductType } from '../../models/product-type';
import { useAppSelector } from '../../store/hooks';
import { selectProductByProductId } from '../../store/inventories/inventoriesSlice';
import { Slot } from '../../models/slot';
import moment from 'moment-timezone';

interface PriceDialogProps {
  ProductId: string;
  Location: City;
  Type: ProductType;
  CloseAnalyticsPanel: (event: React.MouseEvent<unknown>) => void;
}

export const SlotObj: { [key: string]: Slot } = {
  '1WEEK': {
    key: '1WEEK',
    interval: IntervalType.daily,
    fromDate: () => {
      return moment.tz('Europe/Istanbul').subtract(1, 'w').format('YYYY-MM-DD');
    },
    toDate: () => undefined
  },
  '1MONTH': {
    key: '1MONTH',
    interval: IntervalType.daily,
    fromDate: () => {
      return moment.tz('Europe/Istanbul').subtract(1, 'M').format('YYYY-MM-DD');
    },
    toDate: () => undefined
  }
};

const PriceDialog = ({ ProductId, Location, Type, CloseAnalyticsPanel }: PriceDialogProps) => {
  const theme = useTheme();
  const matchesSM = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const [slot, setSlot] = useState(SlotObj['1WEEK']);
  const product = useAppSelector((state) => selectProductByProductId(state, ProductId));

  useEffect(() => {
    setSlot(SlotObj['1WEEK']);
  }, [ProductId]);

  return (
    <Dialog
      fullScreen={matchesSM}
      fullWidth={true}
      open={ProductId !== ''}
      aria-labelledby="responsive-dialog-title">
      <DialogTitle
        sx={{
          height: `${theme.spacing(3)}`
        }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h5">{product?.Name}</Typography>
          </Box>
          <Box>
            <Button
              size="small"
              onClick={() => setSlot(SlotObj['1WEEK'])}
              color={slot === SlotObj['1WEEK'] ? 'primary' : 'secondary'}
              variant={slot === SlotObj['1WEEK'] ? 'outlined' : 'text'}>
              1Hafta
            </Button>
            <Button
              size="small"
              onClick={() => setSlot(SlotObj['1MONTH'])}
              color={slot === SlotObj['1MONTH'] ? 'primary' : 'secondary'}
              variant={slot === SlotObj['1MONTH'] ? 'outlined' : 'text'}>
              1Ay
            </Button>
            <IconButton onClick={CloseAnalyticsPanel}>
              <CloseOutlined />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent
        sx={{
          paddingTop: `calc(${theme.spacing(3)}/2 )!important`,
          paddingBottom: `calc(${theme.spacing(3)}/2 )!important`,
          width: `calc(100% - ${theme.spacing(3)} )`
        }}>
        <Box>
          <PriceChart Slot={slot} ProductId={ProductId} Location={Location} Type={Type} />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PriceDialog;
