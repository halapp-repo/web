import axios from 'axios';
import { OrganizationToOrganizationDTOMapper } from '../../mappers/organization-to-organization-dto.mapper';
import { OrganizationDTO } from '../../models/dtos/organization.dto';
import { Organization } from '../../models/organization';

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
        'content-type': 'application/json'
      }
    });
  }

  async fetchOrganizations(): Promise<Organization[]> {
    return await axios
      .get<OrganizationDTO[]>('/organizations', {
        baseURL: this.baseUrl
      })
      .then((response) => {
        const { data } = response;
        return this.mapper.toListModel(data);
      });
  }
}
