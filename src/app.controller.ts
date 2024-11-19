import { Controller } from '@nestjs/common';
import { ApiErrorResponses } from '@/modules/swagger/decorators/error-responses.decorator';

@ApiErrorResponses()
@Controller()
export class AppController {}
