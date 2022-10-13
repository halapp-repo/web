import { useEffect } from 'react';
import { CircularProgress, Box } from '@mui/material';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { IntervalType } from '../../models/interval-type';
import { City } from '../../models/city';
import { ProductType } from '../../models/product-type';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchProductPrices,
  selectProductPrices,
  selectProductPricesIsLoading
} from '../../store/product-prices/productPricesSlice';
import { ChartSlot } from '../../models/chart-slot';
import { Price } from '../../models/price';

interface PriceChartProps {
  ProductId: string;
  Slot: ChartSlot;
  Location: City;
  Type: ProductType;
}

const areaChartOptions: ApexOptions = {
  chart: {
    id: 'price-bar',
    toolbar: {
      show: false
    },
    locales: [
      {
        name: 'tr',
        options: {
          months: [
            'Ocak',
            'Şubat',
            'Mart',
            'Nisan',
            'Mayıs',
            'Haziran',
            'Temmuz',
            'Ağustos',
            'Eylül',
            'Ekim',
            'Kasım',
            'Aralık'
          ],
          shortMonths: [
            'Oca',
            'Şub',
            'Mar',
            'Nis',
            'May',
            'Haz',
            'Tem',
            'Ağu',
            'Eyl',
            'Eki',
            'Kas',
            'Ara'
          ],
          days: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],
          shortDays: ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt']
        }
      }
    ],
    zoom: {
      enabled: false
    },
    defaultLocale: 'tr',
    animations: {
      enabled: false
    }
  },
  stroke: {
    show: true,
    curve: 'smooth',
    lineCap: 'butt',
    width: 2,
    dashArray: 0
  },
  fill: {
    type: 'gradient',
    gradient: {
      stops: [0, 90, 100],
      type: 'vertical',
      shadeIntensity: 0,
      opacityFrom: 0.5,
      opacityTo: 0.3
    }
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      show: true
    },
    axisTicks: {
      show: true
    },
    tooltip: {
      enabled: false
    }
  },
  yaxis: {
    title: {
      text: '₺',
      rotate: 0
    }
  },
  dataLabels: {
    enabled: true
  },
  tooltip: {
    enabled: false
  },
  noData: {
    text: undefined,
    align: 'center',
    verticalAlign: 'middle',
    offsetX: 0,
    offsetY: 0,
    style: {
      color: '#000000',
      fontSize: '14px',
      fontFamily: 'Helvetica'
    }
  }
};

const generateOptions = (prices: Price[], slot: ChartSlot): ApexOptions => {
  return {
    ...areaChartOptions,
    xaxis: {
      ...areaChartOptions.xaxis,
      categories: prices?.map((p) => p.TS.format()) || [],
      tickPlacement: 'on',
      labels: {
        show: true,
        rotateAlways: false,
        hideOverlappingLabels: true,
        showDuplicates: true,
        format: (function () {
          if (slot.interval == IntervalType.daily) {
            return 'dd';
          } else if (slot.interval == IntervalType.weekly) {
            return 'dd';
          } else if (slot.interval == IntervalType.monthly) {
            return 'MMM';
          } else {
            return 'yyyy';
          }
        })()
      }
    }
  };
};
const generateSeries = (prices: Price[]): ApexAxisChartSeries => {
  return [{ data: prices?.map((p) => p.Price) || [], type: 'area' }];
};

const PriceChart = ({ ProductId, Slot, Location, Type }: PriceChartProps) => {
  const dispatch = useAppDispatch();
  const prices = useAppSelector((state) => selectProductPrices(state, ProductId, Slot));
  const isLoading = useAppSelector(selectProductPricesIsLoading);

  useEffect(() => {
    if (!ProductId || !Slot || !Location || !Type) {
      return;
    }
    if (typeof prices === 'undefined') {
      dispatch(
        fetchProductPrices({
          productId: ProductId,
          location: Location,
          type: Type,
          slot: Slot
        })
      );
    }
  }, [ProductId, Slot, Location, Type]);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}>
      {isLoading && (
        <CircularProgress
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: '50%',
            left: '50%'
          }}
        />
      )}
      <Chart options={generateOptions(prices, Slot)} series={generateSeries(prices)} width="100%" />
    </Box>
  );
};

export default PriceChart;
