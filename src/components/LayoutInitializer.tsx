import { useEffect } from 'react';
import { getSession, getCognitoUser } from '../store/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchInventories } from '../store/inventories/inventoriesSlice';
import { selectUISessionLoading, updateListingSelectedDate } from '../store/ui/uiSlice';
import { Cover } from './Cover';

type Props = {
  children?: React.ReactNode;
};

const urlParams = new URLSearchParams(window.location.search);
const selectedDate = urlParams.get('selected_date');

const LayoutInitializer = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const sesionLoading = useAppSelector(selectUISessionLoading);

  // Fetch inital Data
  useEffect(() => {
    dispatch(getCognitoUser());
    dispatch(getSession());
    dispatch(fetchInventories());
    dispatch(updateListingSelectedDate(selectedDate));
  }, []);

  const showCover = (): boolean => {
    return sesionLoading;
  };

  return (
    <>
      {showCover() && <Cover />}
      {!showCover() && <>{children}</>}
    </>
  );
};

export default LayoutInitializer;
