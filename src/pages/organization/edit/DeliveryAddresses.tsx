import { List } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';

import { Organization, OrganizationAddress } from '../../../models/organization';
import { useAppDispatch } from '../../../store/hooks';
import { updateOrganizationDeliveryAddresses } from '../../../store/organizations/organizationsSlice';
import { CompanyAddressListItem } from './CompanyAddressListItem';
import { DeliveryAddressAddListItem } from './DeliveryAddressAddListItem';
import { DeliveryAddressListItem } from './DeliveryAddressListItem';

interface DeliveryAddressesProps {
  Organization: Organization;
}

const DeliveryAddresses = ({ Organization }: DeliveryAddressesProps) => {
  const dispatch = useAppDispatch();
  const [addresses, setAddresses] = useState(Organization.DeliveryAddresses);
  const [didUpdate, setDidUpdate] = useState(false);

  useEffect(() => {
    if (didUpdate) {
      dispatch(
        updateOrganizationDeliveryAddresses({
          deliveryAddresses: addresses,
          organizationId: Organization.ID!
        })
      );
      setDidUpdate(false);
    }
  }, [didUpdate]);

  const addAddress = (address: OrganizationAddress) => {
    setAddresses((prev) => [...(prev || []), address]);
    setDidUpdate(true);
  };
  const editAddress = (index: number) => (address: OrganizationAddress) => {
    setAddresses((prev) =>
      [...(prev || [])].map((v, i) => {
        if (i === index) {
          address.Active = v.Active;
          return address;
        }
        return v;
      })
    );
    setDidUpdate(true);
  };
  const deleteAddress = (index: number) => () => {
    setAddresses((prev) => {
      const arr = [...(prev || [])];
      arr.splice(index, 1);
      return arr;
    });
    setDidUpdate(true);
  };
  const setDefault = (index?: number) => () => {
    setAddresses((prev) =>
      [...(prev || [])].map((v, i) => {
        if (i === index) {
          v.Active = true;
        } else {
          v.Active = false;
        }
        return v;
      })
    );
    setDidUpdate(true);
  };
  return (
    <List disablePadding={true}>
      <CompanyAddressListItem
        Address={Organization.CompanyAddress!}
        IsDefault={!Organization.DeliveryAddresses.some((d) => d.Active)}
        OnSetDefault={setDefault()}
      />
      {/* Delivery Addresses  */}
      {Organization.DeliveryAddresses.map((d: OrganizationAddress, index: number) => (
        <Fragment key={index}>
          <DeliveryAddressListItem
            key={index}
            Key={index + 1}
            Address={d}
            OnEditAddress={editAddress(index)}
            OnDeleteAddress={deleteAddress(index)}
            OnSetDefault={setDefault(index)}
          />
        </Fragment>
      ))}
      <DeliveryAddressAddListItem OnAddAddress={addAddress} />
    </List>
  );
};

export { DeliveryAddresses };
