import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import { ApiResponseDto } from '../dto/api-response.dto';

interface ApiStandardResponseOptions {
  type: any;
  description?: string;
  status?: number;
  message?: string;
}

export function ApiStandardResponse(options: ApiStandardResponseOptions) {
  const {
    status = 200,
    description = 'Example description',
    type,
    message = 'Success',
  } = options;

  // Determine if the type is an array
  const isArray = Array.isArray(type);

  // Register the model with ApiExtraModels
  return applyDecorators(
    ApiExtraModels(ApiResponseDto, ...(isArray ? [type[0]] : [type])),
    ApiResponse({
      status,
      description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiResponseDto) },
          {
            properties: {
              statusCode: { type: 'number', example: status },
              message: { type: 'string', example: message },
              data: isArray
                ? {
                    type: 'array',
                    items: { $ref: getSchemaPath(type[0]) }, // Handle array of models
                  }
                : { $ref: getSchemaPath(type) }, // Handle single model
            },
          },
        ],
      },
    }),
  );
}
