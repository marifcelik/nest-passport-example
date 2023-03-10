import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UsersService } from 'src/users/users.service';
import { User as GoogleUser } from 'src/users/types/User';
import { User as UserEntity } from 'src/entities/User.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }

  async validateGoogleUser({ email, name }: GoogleUser) {
    console.log('auth service');
    let user: GoogleUser | Promise<GoogleUser> = await this.userRepository.findOneBy({ email });
    if (!user) {
      console.log('user not found, so new one created');
      user = this.userRepository.create({ email, name });
      user = this.userRepository.save(user);
    }
    return user;
  }

  async findGoogleUser(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }
}
