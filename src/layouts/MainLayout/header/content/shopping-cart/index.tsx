import { IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from '../../../../../store/hooks';
import { selectShoppingCart } from '../../../../../store/shopping-cart/shoppingCartSlice';
import { toggleShoppingCart } from '../../../../../store/ui/uiSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { StyledBadge } from '../../../../../components/StyledBadge';

const ShoppingCartNavButton = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const shoppingCart = useAppSelector(selectShoppingCart);
  const handleShoppingCartClicked = () => {
    if (location.pathname !== '/dashboard') {
      navigate('/shopping-cart');
    } else {
      dispatch(toggleShoppingCart());
    }
  };

  return (
    <IconButton aria-label="cart" size="medium" onClick={handleShoppingCartClicked}>
      <StyledBadge badgeContent={shoppingCart.Items.length} color="primary">
        <ShoppingCartOutlined style={{ fontSize: '32px', color: theme.palette.secondary.dark }} />
      </StyledBadge>
    </IconButton>
  );
};

export { ShoppingCartNavButton };
