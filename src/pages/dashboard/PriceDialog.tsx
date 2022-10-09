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
import { DurationType } from '../../models/duration-type';
import { City } from '../../models/city';
import { ProductType } from '../../models/product-type';
import { useAppSelector } from '../../store/hooks';
import { selectProductByProductId, selectProducts } from '../../store/inventories/inventoriesSlice';

interface PriceDialogProps {
  ProductId: string;
  Location: City;
  Type: ProductType;
  CloseAnalyticsPanel: (event: React.MouseEvent<unknown>) => void;
}

const PriceDialog = ({ ProductId, Location, Type, CloseAnalyticsPanel }: PriceDialogProps) => {
  const theme = useTheme();
  const matchesSM = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const [slot, setSlot] = useState<DurationType>(DurationType.daily);
  const product = useAppSelector((state) => selectProductByProductId(state, ProductId));

  useEffect(() => {
    setSlot(DurationType.daily);
  }, [ProductId]);

  return (
    <Dialog
      fullScreen={matchesSM}
      fullWidth={true}
      open={ProductId !== ''}
      aria-labelledby="responsive-dialog-title">
      <DialogTitle
        align="right"
        sx={{
          height: `${theme.spacing(3)}`
        }}>
        <Typography>{product?.Name}</Typography>
        <Button
          size="small"
          onClick={() => setSlot(DurationType.daily)}
          color={slot === DurationType.daily ? 'primary' : 'secondary'}
          variant={slot === DurationType.daily ? 'outlined' : 'text'}>
          Gunluk
        </Button>
        <Button
          size="small"
          onClick={() => setSlot(DurationType.weekly)}
          color={slot === DurationType.weekly ? 'primary' : 'secondary'}
          variant={slot === DurationType.weekly ? 'outlined' : 'text'}>
          Haftalik
        </Button>
        <Button
          size="small"
          onClick={() => setSlot(DurationType.monthly)}
          color={slot === DurationType.monthly ? 'primary' : 'secondary'}
          variant={slot === DurationType.monthly ? 'outlined' : 'text'}>
          Aylik
        </Button>
        <IconButton onClick={CloseAnalyticsPanel}>
          <CloseOutlined />
        </IconButton>
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
