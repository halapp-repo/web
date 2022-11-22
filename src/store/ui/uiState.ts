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
}
