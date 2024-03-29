import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CardContent, Collapse, Grid, Theme, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ExpandMore } from '../../../components/ExpandMoreButton';
import MainCard from '../../../components/MainCard';
import { Overlay } from '../../../components/Overlay';
import { selectUserAuth } from '../../../store/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchOrder, selectOrder, selectOrderIsLoading } from '../../../store/orders/ordersSlice';
import {
  destroyOrganizationList,
  fetchIndividualOrganization,
  selectIndividualOrganization,
  selectOrganizationIsLoading
} from '../../../store/organizations/organizationsSlice';
import { DialogCancelOrder } from './DialogCancelOrder';
import { DialogOrderDelivered } from './DialogOrderDelivered';
import { DialogOrderPickedUp } from './DialogOrderPickedUp';
import { OrderButtons } from './OrderButtons';
import { OrderInfo } from './OrderInfo';
import { OrderItemList } from './OrderItemList';
import { OrderTimeline } from './OrderTimeline';

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
  const [isDialogOrderPickedUpOpen, setIsDialogOrderPickedUpOpen] = useState(false);

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
    let destroyList = false;
    if (order) {
      if (!organization) {
        destroyList = true;
        dispatch(fetchIndividualOrganization(order.OrganizationId));
      }
    }
    return () => {
      if (destroyList) {
        dispatch(destroyOrganizationList());
      }
    };
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
  const handleToggleDialogOrderPickedUp = (toggle: boolean): void => {
    setIsDialogOrderPickedUpOpen(toggle);
  };

  return (
    <>
      {(orderIsLoading || organizationIsLoading) && <Overlay />}
      <Grid container rowSpacing={4.5} justifyContent="left" columnSpacing={2.75} alignItems="left">
        <Grid item xs={12} md={4}>
          <MainCard sx={{ mt: 2, p: '10px' }}>
            {order && organization && <OrderInfo Order={order} Organization={organization} />}
          </MainCard>
        </Grid>
        <Grid item xs={12} md={4}>
          {order && (
            <MainCard sx={{ mt: 2, p: '10px' }}>
              <OrderItemList Order={order} Organization={organization} />
            </MainCard>
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          {order && (
            <OrderButtons
              Order={order}
              HandleOpenDialogCancelOrder={() => handleToggleDialogCancelOrder(true)}
              HandleOpenDialogOrderDelivered={() => handleToggleDialogOrderDelivered(true)}
              HandleOpenDialogOrderPickedUp={() => handleToggleDialogOrderPickedUp(true)}
            />
          )}
          <MainCard
            sx={{
              backgroundColor: matchesXS && !expanded ? 'background.paper' : '#fafafb',
              mt: 2
            }}
            title={
              matchesXS && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    justifyItems: 'center',
                    alignItems: 'center'
                  }}>
                  {expanded ? <span /> : <span>{'Zaman Çizgisi'}</span>}
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more">
                    <ExpandMoreIcon />
                  </ExpandMore>
                </div>
              )
            }>
            <Collapse in={!matchesXS ? true : expanded} timeout="auto" unmountOnExit>
              <CardContent sx={{ pt: '0px', pb: '0px' }}>
                {<OrderTimeline Events={order?.Events} />}
              </CardContent>
            </Collapse>
          </MainCard>
        </Grid>
      </Grid>
      {order && organization && (
        <DialogCancelOrder
          Organization={organization}
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
        <DialogOrderPickedUp
          Open={isDialogOrderPickedUpOpen}
          HandleClose={() => handleToggleDialogOrderPickedUp(false)}
          Order={order}
          Organization={organization}
        />
      )}
    </>
  );
};

export default OrderEdit;
