import { UserVM } from '@halapp/common';
import { plainToClass } from 'class-transformer';

import { User } from '../models/user';
import { UserVMWithPreview } from '../models/viewmodels/user-with-preview';
import { IMapper } from './base.mapper';

export class UserToUserDTOMapper extends IMapper<User, UserVM> {
  toDTO(): UserVM {
    throw new Error('Not Implemented');
  }
  toModel(arg: UserVMWithPreview): User {
    return plainToClass(User, {
      Active: arg.Active,
      Email: arg.Email,
      ID: arg.ID,
      FirstName: arg.FirstName,
      LastName: arg.LastName,
      BaseImageUrl: arg.BaseImageUrl,
      PhoneNumber: arg.PhoneNumber,
      Preview: arg.Preview
    } as User);
  }
  toListDTO(): UserVM[] {
    throw new Error('Not Implemented');
  }
}
