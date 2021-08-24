import { AbstractException } from './abstract_exception';
import { HttpStatus } from '@nestjs/common';

/**
 * AllExceptionsFilter(Global) 에서 핸들링 되는 예외
 */
export class GlobalException extends AbstractException {
  constructor({
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
    msg = '예외 처리 되지 않은 서버 에러 입니다.',
    responseCode = 50000,
  }) {
    super();

    this.statusCode = statusCode;

    this.msg = msg;

    this.responseCode = responseCode;
  }
}
