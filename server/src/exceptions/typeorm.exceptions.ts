import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { BaseResponse } from '../response/base.response';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class QueryFailedExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    let status: number = HttpStatus.INTERNAL_SERVER_ERROR;
    let error: string | null = null;

    switch (exception.driverError.code) {
      case '23505':
        status = HttpStatus.CONFLICT;
        error = 'data is already exists';
        break;
      case '22P02':
        status = HttpStatus.NOT_FOUND;
        error = 'data not exists';
      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    response.status(status).send({
      success: false,
      error,
    } as BaseResponse);
  }
}
