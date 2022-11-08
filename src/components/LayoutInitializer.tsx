import { useEffect } from 'react';
import { getSession } from '../store/auth/authSlice';
import { useAppDispatch } from '../store/hooks';
import { fetchInventories } from '../store/inventories/inventoriesSlice';
import { updateListingSelectedDate } from '../store/ui/uiSlice';

type Props = {
  children?: React.ReactNode;
};

const urlParams = new URLSearchParams(window.location.search);
const selectedDate = urlParams.get('selected_date');

const LayoutInitializer = ({ children }: Props) => {
  const dispatch = useAppDispatch();

  // Fetch inital Data
  useEffect(() => {
    dispatch(getSession());
    dispatch(fetchInventories());
    dispatch(updateListingSelectedDate(selectedDate));
  }, []);

  return <>{children}</>;
};

export default LayoutInitializer;
