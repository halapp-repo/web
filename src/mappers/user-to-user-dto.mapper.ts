import { plainToClass } from 'class-transformer';
import { UserVM } from '@halapp/common';
import { IMapper } from './base.mapper';
import { User } from '../models/user';
import { UserVMWithPreview } from '../models/viewmodels/user-with-preview';

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
