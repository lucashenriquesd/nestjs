import { Controller } from '@nestjs/common';
import { SwaggerErrorResponses } from '@/modules/swagger/decorators/error-responses.decorator';

@SwaggerErrorResponses()
@Controller()
export class AppController {}
