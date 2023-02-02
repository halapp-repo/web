import moment from 'moment';
import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import { UIState } from './uiState';
import type { PayloadAction } from '@reduxjs/toolkit';
import { City } from '../../models/city';
import { ProductType } from '../../models/product-type';
import { trMoment } from '../../utils/timezone';
import { getSession } from '../auth/authSlice';
import { getSignupCodeDetails } from '../auth/authSlice';
import { createOrder } from '../orders/ordersSlice';
import { OrderStatusType } from '@halapp/common';

const initialState = {
  listing: {
    filteredProductName: '',
    selectedCity: City.istanbul,
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
    orderNote: ''
  },
  orders: {
    filter: undefined
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
    updateCheckoutOrderNote: (state: UIState, action: PayloadAction<string>) => {
      state.checkout.orderNote = action.payload;
    },
    toggleGlobalIsLoading: (state: UIState, action: PayloadAction<boolean>) => {
      state.global.isLoading = action.payload;
    },
    setOrdersFilter: (
      state: UIState,
      action: PayloadAction<moment.Moment | OrderStatusType | undefined>
    ) => {
      state.orders.filter = action.payload;
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
        orderNote: ''
      };
    });
  }
});

export const {
  updateListingSelectedDate,
  updateListingProductNameFilter,
  toggleShoppingCart,
  updateOrganization,
  updateCheckoutOrderNote,
  toggleGlobalIsLoading,
  setOrdersFilter
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
export const selectUIListingSelectedCity = createSelector(
  (state: RootState) => state.ui,
  (state: UIState) => state.listing.selectedCity
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
export const selectUICheckoutOrderNote = createSelector(
  (state: RootState) => state.ui,
  (state: UIState) => state.checkout.orderNote
);
export const selectOrdersFilter = createSelector(
  (state: RootState) => state.ui,
  (state: UIState) => state.orders.filter
);

export default UISlice.reducer;
