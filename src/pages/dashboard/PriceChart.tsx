import { CityType, ProductType } from '@halapp/common';
import { Box, CircularProgress } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import { useEffect } from 'react';
import Chart from 'react-apexcharts';

import { ChartSlot } from '../../models/chart-slot';
import { IntervalType } from '../../models/interval-type';
import { Price } from '../../models/price';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchProductPrices,
  selectProductPrices,
  selectProductPricesIsLoading
} from '../../store/product-prices/productPricesSlice';

interface PriceChartProps {
  ProductId: string;
  Slot: ChartSlot;
  Location: CityType;
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
    },
    events: {
      mounted: (chart) => {
        chart.windowResizeHandler();
      }
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
    show: false
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
        rotate: -45,
        rotateAlways: false,
        hideOverlappingLabels: true,
        showDuplicates: false,
        format: (function () {
          if (slot.interval == IntervalType.daily) {
            return 'dd/MM';
          } else if (slot.interval == IntervalType.weekly) {
            return 'dd/MM';
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
