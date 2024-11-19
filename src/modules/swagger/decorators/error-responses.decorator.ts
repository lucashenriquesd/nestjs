import { applyDecorators } from '@nestjs/common';
import { ApiDefaultResponse } from '@nestjs/swagger';

export function SwaggerErrorResponses() {
  return applyDecorators(
    ApiDefaultResponse({
      description: 'Default error structure response for all endpoints.',
      schema: {
        example: {
          statusCode: 500,
          error: 'Example Error',
          message: 'Example exception',
          timestamp: '2024-11-18T05:34:23.123Z',
          path: '/example',
        },
      },
    }),
  );
}
