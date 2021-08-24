import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { AbstractException } from '../exceptions/abstract_exception';
import { ResponseData } from '../abstract_controller';
import { QueryFailedError } from 'typeorm';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse();

    const responseData = AllExceptionsFilter.responseData(exception);

    response.status(responseData.statusCode).json(responseData);
  }

  private static responseData(exception: unknown): ResponseData {
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    let responseCode = 50000;

    // error 에 대한 data 는 string[]
    // string 에러 메시지
    let data = ['예외 처리 되지 않은 서버 에러 입니다.'];

    if (exception instanceof AbstractException) {
      statusCode = exception.statusCode;

      responseCode = exception.responseCode;

      data = [exception.msg];
    } else if (exception instanceof HttpException) {
      statusCode = exception.getStatus() ?? 500;

      responseCode = Number(`${statusCode}00`);

      data = [exception['response']['message']];
    } else if (exception instanceof QueryFailedError) {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

      responseCode = 50099;

      data = ['데이터베이스 에러가 발생하였습니다.'];

      if (exception['errno'] === 1062) {
        statusCode = HttpStatus.CONFLICT;

        responseCode = 40990;

        data = ['데이터베이스 저장 중 중복 에러가 발생하였습니다.'];
      }
    } else if (exception instanceof EntityNotFoundError) {
      statusCode = 404;

      responseCode = Number(`${statusCode}00`);

      data = [exception.message];
    }

    console.log(exception);

    return {
      statusCode,
      responseCode,
      data,
    };
  }
}
