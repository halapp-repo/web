export interface UIState {
  listing: {
    selectedDate: string;
    selectedCategory: string;
    filteredProductName: string;
    selectedCity: string;
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
    orderNote: string;
  };
}
