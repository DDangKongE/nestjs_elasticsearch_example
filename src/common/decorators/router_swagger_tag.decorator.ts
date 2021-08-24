import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// 라우터 + 스웨거 Tag 데코레이터
export function RouterTag(rotuer) {
  return applyDecorators(Controller(rotuer), ApiTags(rotuer));
}
