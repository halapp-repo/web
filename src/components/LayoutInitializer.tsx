import { useEffect } from 'react';
import {
  getSession,
  getCognitoUser,
  refreshSession,
  selectUserAuth
} from '../store/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchInventories } from '../store/inventories/inventoriesSlice';
import '../store/users/usersSlice';
import { getProfile, selectUserProfile } from '../store/profile/profileSlice';
import { fetchCartItem } from '../store/shopping-cart/shoppingCartSlice';
import {
  selectUIGlobalLoading,
  selectUISessionLoading,
  updateListingSelectedDate
} from '../store/ui/uiSlice';
import { Cover } from './Cover';
import { fetchById } from '../store/users/usersSlice';

type Props = {
  children?: React.ReactNode;
};

const urlParams = new URLSearchParams(window.location.search);
const selectedDate = urlParams.get('selected_date');

const LayoutInitializer = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const sesionLoading = useAppSelector(selectUISessionLoading);
  const isGlobalLoading = useAppSelector(selectUIGlobalLoading);
  const userAuth = useAppSelector(selectUserAuth);
  const profile = useAppSelector(selectUserProfile);

  // Fetch inital Data
  useEffect(() => {
    dispatch(getCognitoUser());
    dispatch(getSession());
    dispatch(fetchInventories());
    dispatch(updateListingSelectedDate(selectedDate));
    dispatch(fetchCartItem());
    dispatch(getProfile());
    const timer = setInterval(() => {
      dispatch(refreshSession());
    }, 180000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (userAuth && userAuth.id && typeof profile === 'undefined') {
      dispatch(
        fetchById({
          userId: userAuth.id,
          isMyProfile: true
        })
      );
    }
  }, [userAuth, profile]);

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
