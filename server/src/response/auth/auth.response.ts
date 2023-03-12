import { autoserializeAs } from 'cerialize';

export class AuthResponse {
  @autoserializeAs('accessToken')
  accessToken!: string;

  @autoserializeAs('refreshToken')
  refreshToken!: string;
}
