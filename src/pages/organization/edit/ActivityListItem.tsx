import { AccountEventType } from '@halapp/common';
import { AccountEvent } from '../../../models/events/account-event';
import { AccountActivityItemContent } from './AccountActivityItemContent';
import { OrganizationCreatedActivity } from './OrganizationCreatedActivity';
import { OrganizationDepositActivity } from './OrganizationDepositActivity';
import { OrganizationWithdrewActivity } from './OrganizationWithdrewActivity';

interface ActivityListItemProps {
  Event: AccountEvent;
}

const ActivityListItem = ({ Event }: ActivityListItemProps) => {
  const getContent = (event: AccountEvent) => {
    if (event.EventType === AccountEventType.OrganizationCreatedV1) {
      return <OrganizationCreatedActivity />;
    } else if (event.EventType === AccountEventType.OrganizationWithdrewFromBalanceV1) {
      return <OrganizationWithdrewActivity Event={event} />;
    } else if (event.EventType === AccountEventType.OrganizationDepositedToBalanceV1) {
      return <OrganizationDepositActivity Event={event} />;
    }
  };

  return <AccountActivityItemContent Event={Event}>{getContent(Event)}</AccountActivityItemContent>;
};

export { ActivityListItem };
