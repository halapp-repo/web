import { useEffect } from 'react';
import { getSession, getCognitoUser } from '../store/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchInventories } from '../store/inventories/inventoriesSlice';
import {
  selectUIGlobalLoading,
  selectUISessionLoading,
  updateListingSelectedDate
} from '../store/ui/uiSlice';
import { Cover } from './Cover';

type Props = {
  children?: React.ReactNode;
};

const urlParams = new URLSearchParams(window.location.search);
const selectedDate = urlParams.get('selected_date');

const LayoutInitializer = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const sesionLoading = useAppSelector(selectUISessionLoading);
  const isGlobalLoading = useAppSelector(selectUIGlobalLoading);

  // Fetch inital Data
  useEffect(() => {
    dispatch(getCognitoUser());
    dispatch(getSession());
    dispatch(fetchInventories());
    dispatch(updateListingSelectedDate(selectedDate));
    const timer = setInterval(() => {
      dispatch(getSession());
    }, 1200000);
    return () => clearTimeout(timer);
  }, []);

  const showCover = (): boolean => {
    return sesionLoading || isGlobalLoading;
  };

  return (
    <>
      {showCover() && <Cover />}
      {!showCover() && <>{children}</>}
    </>
  );
};

export default LayoutInitializer;
