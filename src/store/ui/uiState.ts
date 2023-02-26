import { OrderStatusType } from '@halapp/common';
import moment from 'moment';
import { DateRangeType } from '../../models/types/date-range.type';
import { OrderStatusExtendedType } from '../../models/types/order-status-extended.type';

export interface UIState {
  listing: {
    selectedDate: string;
    selectedCategory: string;
    filteredProductName: string;
  };
  auth: {
    sessionLoading: boolean;
  };
  global: {
    isLoading: boolean;
  };
  shoppingCart: {
    isOpen: boolean;
  };
  organization: {
    currentTab: number;
    generalInfoEditMode: boolean;
  };
  checkout: {
    organizationId?: string;
    deliveryTime?: string;
    orderNote?: string;
  };
  orders: {
    filter: OrderStatusType | moment.Moment | undefined;
    adminFilter: {
      date: DateRangeType;
      status: OrderStatusType | OrderStatusExtendedType;
    };
  };
  city: {
    isOpen: boolean;
  };
}
