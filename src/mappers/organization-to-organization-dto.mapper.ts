import { plainToClass } from 'class-transformer';
import { OrganizationDTO } from '../models/dtos/organization.dto';
import { Organization } from '../models/organization';
import { IMapper } from './base.mapper';

export class OrganizationToOrganizationDTOMapper extends IMapper<Organization, OrganizationDTO> {
  toDTO(): OrganizationDTO {
    throw new Error('Not Implemented');
  }
  toListDTO(): OrganizationDTO[] {
    throw new Error('Not Implemented');
  }
  toModel(arg: OrganizationDTO): Organization {
    return plainToClass(Organization, {
      Name: arg.Name
    });
  }
}
