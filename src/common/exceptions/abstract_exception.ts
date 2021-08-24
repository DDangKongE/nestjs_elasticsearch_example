import { HttpStatus } from '@nestjs/common';

export abstract class AbstractException {
  statusCode: HttpStatus;

  msg: string;

  responseCode: number;
}
