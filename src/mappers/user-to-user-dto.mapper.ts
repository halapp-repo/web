import { plainToClass } from 'class-transformer';
import { UserVM } from '@halapp/common';
import { IMapper } from './base.mapper';
import { User } from '../models/user';

export class UserToUserDTOMapper extends IMapper<User, UserVM> {
  toDTO(): UserVM {
    throw new Error('Not Implemented');
  }
  toModel(arg: UserVM): User {
    return plainToClass(User, {
      Active: arg.Active,
      Email: arg.Email,
      ID: arg.ID
    } as User);
  }
  toListDTO(): UserVM[] {
    throw new Error('Not Implemented');
  }
}
