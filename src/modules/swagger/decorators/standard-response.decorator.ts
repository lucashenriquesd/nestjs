import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import { ApiResponseDto } from '../dto/api-response.dto';

interface ApiStandardResponseOptions {
  type: any;
  description?: string;
  status?: number;
}

export function ApiStandardResponse(options: ApiStandardResponseOptions) {
  const { status = 200, description = 'Success', type } = options;

  return applyDecorators(
    ApiExtraModels(ApiResponseDto, type),
    ApiResponse({
      status,
      description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiResponseDto) },
          {
            properties: {
              statusCode: { type: 'number', example: status },
              message: { type: 'string', example: description },
              data: { $ref: getSchemaPath(type) },
            },
          },
        ],
      },
    }),
  );
}
