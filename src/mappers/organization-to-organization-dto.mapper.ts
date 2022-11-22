import { plainToClass } from 'class-transformer';
import { OrganizationDTO } from '../models/dtos/organization.dto';
import { Organization } from '../models/organization';
import { IMapper } from './base.mapper';

export class OrganizationToOrganizationDTOMapper extends IMapper<Organization, OrganizationDTO> {
  toDTO(arg: Organization): OrganizationDTO {
    return plainToClass(OrganizationDTO, arg, {
      enableImplicitConversion: true
    });
  }
  toModel(arg: OrganizationDTO): Organization {
    return plainToClass(Organization, arg, {
      enableImplicitConversion: true
    });
  }
}
