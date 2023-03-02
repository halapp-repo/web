import moment from 'moment';
import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import { UIState } from './uiState';
import type { PayloadAction } from '@reduxjs/toolkit';
import { PaymentType, ProductType } from '@halapp/common';
import { trMoment } from '../../utils/timezone';
import { getSession } from '../auth/authSlice';
import { getSignupCodeDetails } from '../auth/authSlice';
import { createOrder } from '../orders/ordersSlice';
import { OrderStatusType } from '@halapp/common';
import { DateRangeType } from '../../models/types/date-range.type';
import { OrderStatusExtendedType } from '../../models/types/order-status-extended.type';
import { updateOrganization as organizationUpdateOrganization } from '../organizations/organizationsSlice';

const initialState = {
  listing: {
    filteredProductName: '',
    selectedDate: trMoment().format('YYYY-MM-DD'),
    selectedCategory: ProductType.produce
  },
  auth: {
    sessionLoading: true
  },
  global: {
    isLoading: false
  },
  shoppingCart: {
    isOpen: false
  },
  organization: {
    currentTab: 0,
    generalInfoEditMode: false
  },
  checkout: {
    orderNote: '',
    paymentMethod: PaymentType.card
  },
  orders: {
    filter: undefined,
    adminFilter: {
      date: DateRangeType['Last 3 Days'],
      status: OrderStatusExtendedType.AllStatus
    }
  },
  city: {
    isOpen: false
  }
} as UIState;

const UISlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    updateListingSelectedDate: (
      state: UIState,
      action: PayloadAction<string | undefined | null>
    ) => {
      const rawPayload = action.payload;
      let selectedDate: string;
      if (!rawPayload || !moment(rawPayload).isValid()) {
        selectedDate = moment.tz('Europe/Istanbul').format('YYYY-MM-DD');
      } else {
        selectedDate = rawPayload;
      }
      state.listing.selectedDate = selectedDate;
      const url = new URL(window.location.href);
      url.searchParams.set('selected_date', selectedDate);
      window.history.pushState({}, '', url);
    },
    updateListingProductNameFilter: (state: UIState, action: PayloadAction<string>) => {
      state.listing.filteredProductName = action.payload.toLowerCase();
    },
    toggleShoppingCart: (state: UIState, action: PayloadAction<boolean | undefined>) => {
      if (typeof action.payload === 'undefined') {
        state.shoppingCart.isOpen = !state.shoppingCart.isOpen;
      } else {
        state.shoppingCart.isOpen = action.payload;
      }
    },
    updateOrganization: (
      state: UIState,
      action: PayloadAction<{ tab?: number; generalInfoEditMode?: boolean }>
    ) => {
      const { tab, generalInfoEditMode } = action.payload;
      state.organization = {
        ...state.organization,
        ...(typeof generalInfoEditMode !== 'undefined'
          ? {
              generalInfoEditMode: generalInfoEditMode
            }
          : null),
        ...(typeof tab !== 'undefined'
          ? {
              currentTab: tab
            }
          : null)
      };
    },
    updateCheckout: (
      state: UIState,
      action: PayloadAction<{
        note?: string;
        organizationId?: string;
        deliveryTime?: string;
        paymentMethod?: PaymentType;
        cardNumber?: string;
        monthExpiry?: string;
        yearExpiry?: string;
        securePaymentEnable?: boolean;
      }>
    ) => {
      state.checkout = {
        ...state.checkout,
        ...(typeof action.payload.note !== 'undefined' ? { orderNote: action.payload.note } : null),
        ...(typeof action.payload.organizationId !== 'undefined'
          ? {
              organizationId: action.payload.organizationId
            }
          : null),
        ...(typeof action.payload.deliveryTime !== 'undefined'
          ? { deliveryTime: action.payload.deliveryTime }
          : null),
        ...(typeof action.payload.paymentMethod !== 'undefined'
          ? {
              paymentMethod: action.payload.paymentMethod
            }
          : null),
        ...(typeof action.payload.cardNumber !== 'undefined'
          ? {
              cardNumber: action.payload.cardNumber
            }
          : null),
        ...(typeof action.payload.monthExpiry !== 'undefined'
          ? {
              monthExpiry: action.payload.monthExpiry
            }
          : null),
        ...(typeof action.payload.yearExpiry !== 'undefined'
          ? {
              yearExpiry: action.payload.yearExpiry
            }
          : null),
        ...(typeof action.payload.securePaymentEnable !== 'undefined'
          ? {
              securePaymentEnable: action.payload.securePaymentEnable
            }
          : null)
      };
    },
    toggleGlobalIsLoading: (state: UIState, action: PayloadAction<boolean>) => {
      state.global.isLoading = action.payload;
    },
    setOrdersFilter: (
      state: UIState,
      action: PayloadAction<moment.Moment | OrderStatusType | undefined>
    ) => {
      state.orders.filter = action.payload;
    },
    setOrdersAdminFilter: (
      state: UIState,
      action: PayloadAction<
        [DateRangeType | undefined, OrderStatusType | OrderStatusExtendedType | undefined]
      >
    ) => {
      const [range, status] = action.payload;
      state.orders.adminFilter = {
        ...state.orders.adminFilter,
        ...(range
          ? {
              date: range
            }
          : null),
        ...(status
          ? {
              status: status
            }
          : null)
      };
    },
    toggleCity: (state: UIState, action: PayloadAction<boolean | undefined>) => {
      if (typeof action.payload === 'undefined') {
        state.city.isOpen = !state.city.isOpen;
      } else {
        state.city.isOpen = action.payload;
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getSession.pending, (state) => {
      state.auth = {
        ...state.auth,
        sessionLoading: true
      };
    });
    builder.addCase(getSession.fulfilled, (state) => {
      state.auth = {
        ...state.auth,
        sessionLoading: false
      };
    });
    builder.addCase(getSession.rejected, (state) => {
      state.auth = {
        ...state.auth,
        sessionLoading: false
      };
    });
    builder.addCase(getSignupCodeDetails.fulfilled, (state) => {
      state.global = {
        ...state.global,
        isLoading: false
      };
    });
    builder.addCase(getSignupCodeDetails.rejected, (state) => {
      state.global = {
        ...state.global,
        isLoading: false
      };
    });
    builder.addCase(getSignupCodeDetails.pending, (state) => {
      state.global = {
        ...state.global,
        isLoading: true
      };
    });
    builder.addCase(createOrder.fulfilled, (state) => {
      state.checkout = {
        orderNote: '',
        organizationId: undefined,
        paymentMethod: PaymentType.card,
        deliveryTime: undefined,
        cardNumber: undefined,
        monthExpiry: undefined,
        yearExpiry: undefined,
        securePaymentEnable: undefined
      };
    });
    builder.addCase(organizationUpdateOrganization.fulfilled, (state) => {
      state.organization = {
        ...state.organization,
        generalInfoEditMode: false
      };
    });
  }
});

export const {
  updateListingSelectedDate,
  updateListingProductNameFilter,
  toggleShoppingCart,
  updateOrganization,
  updateCheckout,
  toggleGlobalIsLoading,
  setOrdersFilter,
  toggleCity,
  setOrdersAdminFilter
} = UISlice.actions;

export const selectUIListingSelectedDate = createSelector(
  (state: RootState) => state.ui,
  (state: UIState) => state.listing.selectedDate
);
export const selectUIListingSelectedCategory = createSelector(
  (state: RootState) => state.ui,
  (state: UIState) => state.listing.selectedCategory
);
export const selectUIListingProductNameFilter = createSelector(
  (state: RootState) => state.ui,
  (state: UIState) => state.listing.filteredProductName
);
export const selectUISessionLoading = createSelector(
  (state: RootState) => state.ui,
  (state: UIState) => state.auth.sessionLoading
);
export const selectUIGlobalLoading = createSelector(
  (state: RootState) => state.ui,
  (state: UIState) => state.global.isLoading
);
export const selectUIShoppingCartIsOpen = createSelector(
  (state: RootState) => state.ui,
  (state: UIState) => state.shoppingCart.isOpen
);
export const selectUIOrganization = createSelector(
  (state: RootState) => state.ui,
  (state: UIState) => state.organization
);
export const selectUICheckout = createSelector(
  (state: RootState) => state.ui,
  (state: UIState) => state.checkout
);
export const selectOrdersFilter = createSelector(
  (state: RootState) => state.ui,
  (state: UIState) => state.orders.filter
);
export const selectUICityIsOpen = createSelector(
  (state: RootState) => state.ui,
  (state: UIState) => state.city.isOpen
);
export const selectOrdersAdminFilter = createSelector(
  (state: RootState) => state.ui,
  (state: UIState) => state.orders.adminFilter
);

export default UISlice.reducer;
