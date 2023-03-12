import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { BaseResponse } from 'src/response/base.response';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const exceptionResponse = JSON.parse(
      JSON.stringify(exception.getResponse()),
    );
    const status = exception.getStatus();
    let data = null;

    data = exceptionResponse.data
      ? exceptionResponse.data
      : exceptionResponse.message;

    response.status(status).send({
      success: false,
      error: data,
    } as BaseResponse);
  }
}
