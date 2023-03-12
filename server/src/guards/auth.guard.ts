import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { TokenPayload } from 'src/response/auth/token-payload.response';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest() as Request & {
      payload: TokenPayload;
    };

    const authorization = request.headers.authorization;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new HttpException(
        {
          data: 'you are not authenticated',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      const token = authorization.split(' ')[1];
      const payload = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET ?? '',
      ) as TokenPayload;
      request.payload = payload;
      return true;
    } catch (err) {
      throw new HttpException(
        {
          data: 'you are not authenticated',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
