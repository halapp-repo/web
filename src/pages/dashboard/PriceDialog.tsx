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
import { City } from '../../models/city';
import { ProductType } from '../../models/product-type';
import { useAppSelector } from '../../store/hooks';
import { selectProductByProductId } from '../../store/inventories/inventoriesSlice';
import { selectChartSlot } from '../../store/ui/uiSlice';

interface PriceDialogProps {
  ProductId: string;
  Location: City;
  Type: ProductType;
  CloseAnalyticsPanel: (event: React.MouseEvent<unknown>) => void;
}

const PriceDialog = ({ ProductId, Location, Type, CloseAnalyticsPanel }: PriceDialogProps) => {
  const theme = useTheme();
  const matchesSM = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const chartSlot = useAppSelector(selectChartSlot);
  const [slot, setSlot] = useState(chartSlot['1WEEK']);
  const product = useAppSelector((state) => selectProductByProductId(state, ProductId));

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
          height: `${theme.spacing(3)}`
        }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h5">{product?.Name}</Typography>
          </Box>
          <Box>
            <Button
              size="small"
              onClick={() => setSlot(chartSlot['1WEEK'])}
              color={slot.key === chartSlot['1WEEK'].key ? 'primary' : 'secondary'}
              variant={slot.key === chartSlot['1WEEK'].key ? 'outlined' : 'text'}>
              1Hafta
            </Button>
            <Button
              size="small"
              onClick={() => setSlot(chartSlot['1MONTH'])}
              color={slot.key === chartSlot['1MONTH'].key ? 'primary' : 'secondary'}
              variant={slot.key === chartSlot['1MONTH'].key ? 'outlined' : 'text'}>
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
