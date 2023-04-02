import { OrganizationVM } from '@halapp/common';
import { instanceToPlain, plainToClass, plainToInstance } from 'class-transformer';

import { Organization } from '../models/organization';
import { IMapper } from './base.mapper';

export class OrganizationToOrganizationDTOMapper extends IMapper<Organization, OrganizationVM> {
  toDTO(arg: Organization): OrganizationVM {
    return plainToInstance(OrganizationVM, instanceToPlain(arg), {
      enableImplicitConversion: true
    });
  }
  toModel(arg: OrganizationVM): Organization {
    return plainToClass(Organization, arg, {
      enableImplicitConversion: true
    });
  }
}
