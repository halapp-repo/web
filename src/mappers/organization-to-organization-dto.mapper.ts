import { plainToClass } from 'class-transformer';
import { OrganizationVM } from '@halapp/common';
import { Organization } from '../models/organization';
import { IMapper } from './base.mapper';

export class OrganizationToOrganizationDTOMapper extends IMapper<Organization, OrganizationVM> {
  toDTO(arg: Organization): OrganizationVM {
    return plainToClass(OrganizationVM, arg, {
      enableImplicitConversion: true
    });
  }
  toModel(arg: OrganizationVM): Organization {
    return plainToClass(Organization, arg, {
      enableImplicitConversion: true
    });
  }
}
