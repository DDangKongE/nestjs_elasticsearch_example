import { applyDecorators } from '@nestjs/common';
import { ApiParam, ApiQuery } from '@nestjs/swagger';

// 페이지네이션 데코레이터
export function SwaggerParameter(explan: string) {
  return applyDecorators(
    ApiParam({
      type: Number,
      name: 'id',
      description: `${explan}`,
      required: true,
    }),
  );
}
