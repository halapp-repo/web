import axios from 'axios';
import { OrganizationToOrganizationDTOMapper } from '../../mappers/organization-to-organization-dto.mapper';
import { OrganizationVM } from '@halapp/common';
import { OrganizationAddress } from '../../models/organization';

export class OrganizationsApi {
  baseUrl: string;
  mapper: OrganizationToOrganizationDTOMapper;

  constructor() {
    const baseUrl = process.env.REACT_APP_ACCOUNT_BASE_URL;
    if (!baseUrl) {
      throw new Error('REACT_APP_ACCOUNT_BASE_URL is not set!');
    }
    this.baseUrl = baseUrl;
    this.mapper = new OrganizationToOrganizationDTOMapper();
  }

  async createEnrollmentRequest(request: OrganizationVM): Promise<void> {
    return await axios.post('/organizations/enrollment', JSON.stringify(request), {
      baseURL: this.baseUrl,
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }
  async fetchOrganizations({ token }: { token: string }): Promise<OrganizationVM[]> {
    return await axios
      .get<OrganizationVM[]>('/organizations', {
        baseURL: this.baseUrl,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        const { data } = response;
        return data;
      });
  }
  async fetchAllOrganizations({ token }: { token: string }): Promise<OrganizationVM[]> {
    return await axios
      .get<OrganizationVM[]>('/admin/organizations', {
        baseURL: this.baseUrl,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        const { data } = response;
        return data;
      });
  }
  async toggleOrganizationActivation({
    isActive,
    creditLimit,
    organizationId,
    token
  }: {
    isActive: boolean;
    creditLimit: number;
    organizationId: string;
    token: string;
  }): Promise<void> {
    return await axios.put(
      `/admin/organizations/${organizationId}/activation`,
      { Activation: isActive, CreditLimit: creditLimit },
      {
        baseURL: this.baseUrl,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
  }
  async updateOrganization({
    token,
    organization
  }: {
    token: string;
    organization: OrganizationVM;
  }): Promise<OrganizationVM> {
    return await axios
      .put<OrganizationVM>(`/organizations/${organization.ID}`, JSON.stringify(organization), {
        baseURL: this.baseUrl,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        const { data } = response;
        return data;
      });
  }
  async updateOrganizationDeliveryAddresses({
    token,
    organizationId,
    deliveryAddresses
  }: {
    token: string;
    organizationId: string;
    deliveryAddresses: OrganizationAddress[];
  }): Promise<OrganizationVM> {
    return await axios
      .post<OrganizationVM>(
        `/organizations/${organizationId}/deliveryaddresses`,
        JSON.stringify({
          DeliveryAddresses: deliveryAddresses
        }),
        {
          baseURL: this.baseUrl,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )
      .then((response) => {
        const { data } = response;
        return data;
      });
  }
  async fetchIndividualOrganization({
    token,
    organizationId
  }: {
    token: string;
    organizationId: string;
  }) {
    return await axios
      .get<OrganizationVM>(`/organizations/${organizationId}`, {
        baseURL: this.baseUrl,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        const { data } = response;
        return data;
      });
  }
}
