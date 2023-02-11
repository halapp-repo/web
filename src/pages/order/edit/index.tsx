import { Grid, useMediaQuery, Theme, Stack, Collapse, CardContent } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { selectUserAuth } from '../../../store/auth/authSlice';
import { fetchOrder, selectOrder, selectOrderIsLoading } from '../../../store/orders/ordersSlice';
import MainCard from '../../../components/MainCard';
import { ExpandMore } from '../../../components/ExpandMoreButton';
import { OrderTimeline } from './OrderTimeline';
import {
  fetchIndividualOrganization,
  selectIndividualOrganization,
  selectOrganizationIsLoading
} from '../../../store/organizations/organizationsSlice';
import { Overlay } from '../../../components/Overlay';
import { OrderInfo } from './OrderInfo';
import { OrderButtons } from './OrderButtons';
import { DialogCancelOrder } from './DialogCancelOrder';
import { DialogOrderDelivered } from './DialogOrderDelivered';
import { OrderItemList } from './OrderItemList';
import { DialogOrderPaid } from './DialogOrderPaid';

const OrderEdit = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userAuth = useAppSelector(selectUserAuth);
  const order = useAppSelector((state) => selectOrder(state, orderId));
  const organization = useAppSelector((state) =>
    selectIndividualOrganization(state, order?.OrganizationId)
  );
  const matchesXS = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const [expanded, setExpanded] = useState(false);
  const orderIsLoading = useAppSelector(selectOrderIsLoading);
  const organizationIsLoading = useAppSelector(selectOrganizationIsLoading);
  const [isDialogCancelOrderOpen, setIsDialogCancelOrderOpen] = useState(false);
  const [isDialogOrderDeliveredOpen, setIsDialogOrderDeliveredOpen] = useState(false);
  const [isDialogOrderPaidOpen, setIsDialogOrderPaidOpen] = useState(false);

  useEffect(() => {
    if (!userAuth.authenticated) {
      navigate('/auth/signin');
    } else {
      if (orderId && !order) {
        dispatch(fetchOrder(orderId));
      }
    }
  }, [userAuth, orderId]);

  useEffect(() => {
    if (order) {
      if (!organization) {
        dispatch(fetchIndividualOrganization(order.OrganizationId));
      }
    }
  }, [order]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleToggleDialogCancelOrder = (toggle: boolean): void => {
    setIsDialogCancelOrderOpen(toggle);
  };
  const handleToggleDialogOrderDelivered = (toggle: boolean): void => {
    setIsDialogOrderDeliveredOpen(toggle);
  };
  const handleToggleDialogOrderPaid = (toggle: boolean): void => {
    setIsDialogOrderPaidOpen(toggle);
  };

  return (
    <>
      {(orderIsLoading || organizationIsLoading) && <Overlay />}
      <Grid container rowSpacing={4.5} justifyContent="left" columnSpacing={2.75} alignItems="left">
        <Grid item xs={12} md={3}>
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
        <Grid item xs={12} md={5}>
          <MainCard sx={{ mt: 2, p: '10px' }}>
            {order && organization && <OrderInfo Order={order} Organization={organization} />}
          </MainCard>
          {order && (
            <OrderButtons
              Order={order}
              HandleOpenDialogCancelOrder={() => handleToggleDialogCancelOrder(true)}
              HandleOpenDialogOrderDelivered={() => handleToggleDialogOrderDelivered(true)}
              HandleOpenDialogOrderPaid={() => handleToggleDialogOrderPaid(true)}
            />
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          {order && (
            <MainCard sx={{ mt: 2, p: '10px' }}>
              <OrderItemList Order={order} />
            </MainCard>
          )}
        </Grid>
      </Grid>
      {order && (
        <DialogCancelOrder
          Order={order}
          Open={isDialogCancelOrderOpen}
          HandleClose={() => handleToggleDialogCancelOrder(false)}
        />
      )}
      {order && organization && (
        <DialogOrderDelivered
          Open={isDialogOrderDeliveredOpen}
          HandleClose={() => handleToggleDialogOrderDelivered(false)}
          Order={order}
          Organization={organization}
        />
      )}
      {order && organization && (
        <DialogOrderPaid
          Open={isDialogOrderPaidOpen}
          HandleClose={() => handleToggleDialogOrderPaid(false)}
          Order={order}
          Organization={organization}
        />
      )}
    </>
  );
};

export default OrderEdit;
