import { ChartSlot } from '../../models/chart-slot';

export interface UIState {
  listing: {
    selectedDate: string;
    selectedCategory: string;
    filteredProductName: string;
    selectedCity: string;
  };
  chart: {
    slot: { [key: string]: ChartSlot };
  };
}
