import { Injectable } from '@nestjs/common';

export type User = {
  id: number;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      username: 'arif',
      password: 'dalas'
    },
    {
      id: 2,
      username: 'furkan',
      password: 'passwordIsNot123'
    }
  ];

  async getAll(): Promise<User[]> {
    return this.users;
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((value) => value.username === username);
  }
}
