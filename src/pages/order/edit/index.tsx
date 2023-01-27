import { Grid, useMediaQuery, Theme, Stack, Collapse, CardContent } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { selectUserAuth } from '../../../store/auth/authSlice';
import { fetchOrderById, selectOrder } from '../../../store/orders/ordersSlice';
import MainCard from '../../../components/MainCard';
import { ExpandMore } from '../../../components/ExpandMoreButton';
import { OrderTimeline } from './OrderTimeline';
const OrderEdit = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userAuth = useAppSelector(selectUserAuth);
  const order = useAppSelector((state) => selectOrder(state, orderId));
  const matchesXS = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!userAuth.authenticated) {
      navigate('/auth/signin');
    } else {
      if (orderId && !order) {
        dispatch(fetchOrderById(orderId));
      }
    }
  }, [userAuth, orderId]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Grid container rowSpacing={4.5} justifyContent="left" columnSpacing={2.75} alignItems="left">
        <Grid item xs={12} sm={4} md={3}>
          <MainCard
            sx={{
              backgroundColor: matchesXS && !expanded ? 'background.paper' : '#fafafb',
              mt: 2
            }}
            title={
              matchesXS && (
                <Stack
                  direction={'row'}
                  justifyContent="space-between"
                  justifyItems={'center'}
                  alignItems="center">
                  {expanded && <span>{''}</span>}
                  {expanded || <span>{'Zaman Çizgisi'}</span>}
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more">
                    <ExpandMoreIcon />
                  </ExpandMore>
                </Stack>
              )
            }>
            <Collapse in={!matchesXS ? true : expanded} timeout="auto" unmountOnExit>
              <CardContent sx={{ pt: '0px', pb: '0px' }}>
                {<OrderTimeline Events={order?.Events} />}
              </CardContent>
            </Collapse>
          </MainCard>
        </Grid>
        <Grid item xs={12} sm={5}>
          <MainCard sx={{ mt: 2 }}> {'YYYYYY'}</MainCard>
        </Grid>
      </Grid>
    </>
  );
};

export default OrderEdit;
