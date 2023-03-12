import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FormUserRequest } from '../../request/auth/form-user.request';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import * as argon2 from 'argon2';
import { UpdateProfileRequest } from 'src/request/auth/update-profile.request';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }

  async create(formUserRequest: FormUserRequest): Promise<User> {
    const password = await argon2.hash(formUserRequest.password);
    const user = await this.usersRepository.save({
      email: formUserRequest.email,
      password,
    });

    return user;
  }

  async updateProfile(email: string, updateProfileRequest: UpdateProfileRequest): Promise<User> {
    const user = await this.findByEmail(email)

    if (!user) {
      throw new HttpException({ data: "user is not exists" }, HttpStatus.NOT_FOUND)
    }

    user.name = updateProfileRequest.name
    user.avatar = updateProfileRequest.avatar

    await this.usersRepository.save(user)

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }
}
