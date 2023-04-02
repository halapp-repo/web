import { OrderStatusType, OrderVM } from '@halapp/common';

import { DateRangeType } from '../../models/types/date-range.type';
import { OrderStatusExtendedType } from '../../models/types/order-status-extended.type';

export interface OrdersState {
  List: {
    [orgId: string]: {
      [filterName: string]: OrderVM[] | undefined;
    };
  };
  IsLoading: boolean;
  Edit: {
    [orderId: string]: OrderVM | null;
  };
  AdminList: {
    [range in DateRangeType]: {
      [status in OrderStatusType | OrderStatusExtendedType]: OrderVM[] | undefined;
    };
  };
}
