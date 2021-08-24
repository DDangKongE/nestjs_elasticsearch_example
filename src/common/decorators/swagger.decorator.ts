import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

// Api 설명 데코레이터
export function SwaggerDecorators(swagger_summary, swagger_description?) {
  if (!swagger_description) {
    return applyDecorators(
      ApiOperation({
        summary: `${swagger_summary}`,
      }),
    );
  } else {
    return applyDecorators(
      ApiOperation({
        summary: `${swagger_summary}`,
        description: `${swagger_description}`,
      }),
    );
  }
}
