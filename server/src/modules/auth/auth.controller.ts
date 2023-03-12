import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { RefreshTokenGuard } from 'src/guards/refresh-token.guard';
import { UpdateProfileRequest } from 'src/request/auth/update-profile.request';
import { TokenPayload } from 'src/response/auth/token-payload.response';
import { FormUserRequest } from '../../request/auth/form-user.request';
import { AuthService } from './auth.service';

@Controller({
  path: '/v1/auth',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('get-me')
  @UseGuards(AuthGuard)
  async getMe(@User() user: TokenPayload): Promise<TokenPayload> {
    return user;
  }

  @Patch()
  @UseGuards(AuthGuard)
  async updateProfile(
    @User() user: TokenPayload,
    @Body() updateProfileRequest: UpdateProfileRequest,
  ): Promise<TokenPayload> {
    return this.authService.updateProfile(user.email, updateProfileRequest);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() formUserRequest: FormUserRequest) {
    return this.authService.login(formUserRequest);
  }

  @Post('register')
  async register(@Body() formUserRequest: FormUserRequest) {
    return this.authService.register(formUserRequest);
  }

  @Get('refresh-token')
  @UseGuards(RefreshTokenGuard)
  refreshToken(@User() user: TokenPayload) {
    return this.authService.refreshToken(user);
  }
}
