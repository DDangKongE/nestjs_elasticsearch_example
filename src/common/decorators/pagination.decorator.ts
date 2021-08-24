import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

// 페이지네이션 데코레이터
export function SwaggerPagination(default_page, dafault_size) {
  return applyDecorators(
    ApiQuery({
      type: Number,
      name: 'page',
      description: `Default : ${default_page}`,
      required: false,
    }),
    ApiQuery({
      type: Number,
      name: 'size',
      description: `Default : ${dafault_size}`,
      required: false,
    }),
  );
}
