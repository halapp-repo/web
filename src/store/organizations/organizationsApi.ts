import axios from 'axios';
import { OrganizationToOrganizationDTOMapper } from '../../mappers/organization-to-organization-dto.mapper';
import { OrganizationDTO } from '../../models/dtos/organization.dto';
import { Organization, OrganizationAddress } from '../../models/organization';

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

  async createEnrollmentRequest(request: OrganizationDTO): Promise<void> {
    return await axios.post('/organizations/enrollment', JSON.stringify(request), {
      baseURL: this.baseUrl,
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }
  async fetchOrganizations({ token }: { token: string }): Promise<Organization[]> {
    return await axios
      .get<OrganizationDTO[]>('/organizations', {
        baseURL: this.baseUrl,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        const { data } = response;
        return this.mapper.toListModel(data);
      });
  }
  async fetchAllOrganizations({ token }: { token: string }): Promise<Organization[]> {
    return await axios
      .get<OrganizationDTO[]>('/admin/organizations', {
        baseURL: this.baseUrl,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        const { data } = response;
        return this.mapper.toListModel(data);
      });
  }
  async toggleOrganizationActivation({
    isActive,
    organizationId,
    token
  }: {
    isActive: boolean;
    organizationId: string;
    token: string;
  }): Promise<void> {
    return await axios.put(
      `/admin/organization/${organizationId}`,
      { IsActive: isActive },
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
    organization: OrganizationDTO;
  }): Promise<Organization> {
    return await axios
      .put<OrganizationDTO>(`/organization/${organization.ID}`, JSON.stringify(organization), {
        baseURL: this.baseUrl,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        const { data } = response;
        return this.mapper.toModel(data);
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
  }): Promise<Organization> {
    return await axios
      .post<OrganizationDTO>(
        `/organization/${organizationId}/deliveryaddresses`,
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
        return this.mapper.toModel(data);
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
      .get<OrganizationDTO>(`/organization/${organizationId}`, {
        baseURL: this.baseUrl,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        const { data } = response;
        return this.mapper.toModel(data);
      });
  }
}
