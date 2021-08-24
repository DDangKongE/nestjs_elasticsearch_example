import { HttpStatus } from '@nestjs/common';

export type ResponseData = {
  statusCode: HttpStatus;
  responseCode: number;
  data: any;
};

export abstract class AbstractController {
  makeResponse({
    statusCode = HttpStatus.OK,
    responseCode = 20000,
    data = null,
  }): ResponseData {
    return {
      statusCode,
      responseCode,
      data,
    };
  }
}
