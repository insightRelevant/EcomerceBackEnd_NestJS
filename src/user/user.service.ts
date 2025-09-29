/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UserService {
  private users = [
    {
      userId: 1,
      username: 'jonh',
      password: 'secret',      
    },

    {
      userId: 2,
      username: 'maria',
      password: 'secret2',
    },
  ];
  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);

  }
}
