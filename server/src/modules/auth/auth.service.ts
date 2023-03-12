import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FormUserRequest } from 'src/request/auth/form-user.request';
import { UsersService } from '../users/users.service';
import * as jwt from 'jsonwebtoken';
import { AuthResponse } from 'src/response/auth/auth.response';
import { toInstanct } from 'src/utils/index.utils';
import { Serialize } from 'cerialize';
import { TokenPayload } from 'src/response/auth/token-payload.response';
import * as argon2 from 'argon2';
import { UpdateProfileRequest } from 'src/request/auth/update-profile.request';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async login(formUserRequest: FormUserRequest) {
    const user = await this.usersService.findByEmail(formUserRequest.email);

    if (!user) {
      throw new HttpException(
        { data: 'email or password is not match' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const isMatched = await argon2.verify(
      user.password,
      formUserRequest.password,
    );

    if (!isMatched) {
      throw new HttpException(
        {
          data: 'email or password is not match',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const payload = toInstanct<TokenPayload>(user, TokenPayload);
    return this.generateToken(payload);
  }

  async register(formUserRequest: FormUserRequest): Promise<AuthResponse> {
    const user = await this.usersService.create(formUserRequest);
    const payload = toInstanct<TokenPayload>(user, TokenPayload);
    return this.generateToken(payload);
  }

  async updateProfile(
    email: string,
    updateProfileRequest: UpdateProfileRequest,
  ): Promise<TokenPayload> {
    const user = await this.usersService.updateProfile(
      email,
      updateProfileRequest,
    );
    const response = toInstanct<TokenPayload>(user, TokenPayload);
    return response;
  }

  refreshToken(user: TokenPayload): AuthResponse {
    const payload = toInstanct<TokenPayload>(user, TokenPayload);
    return this.generateToken(payload);
  }

  private generateToken(payload: TokenPayload): AuthResponse {
    const authResponse: AuthResponse = { accessToken: '', refreshToken: '' };
    const serializePayload = Serialize(payload);

    for (let i = 0; i < 2; i++) {
      if (i === 0) {
        const token = jwt.sign(
          serializePayload,
          process.env.ACCESS_TOKEN_SECRET ?? '',
          {
            expiresIn: '15mins',
          },
        );
        authResponse.accessToken = token;
      } else {
        const token = jwt.sign(
          serializePayload,
          process.env.REFRESH_TOKEN_SECRET ?? '',
          {
            expiresIn: '7days',
          },
        );
        authResponse.refreshToken = token;
      }
    }

    return authResponse;
  }
}
