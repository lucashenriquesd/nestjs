import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Handle HTTP exceptions
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      response.status(status).json({
        statusCode: status,
        error: (exceptionResponse as any).error || null,
        message:
          (exceptionResponse as any).message ||
          (exceptionResponse as any) ||
          'Error',
        timestamp: new Date().toISOString(),
        path: request.url,
      });
      return;
    }

    // Handle PostgreSQL errors from Drizzle (using 'pg' driver)
    const pgError = exception as any;

    if (pgError && pgError.code) {
      // Handle unique constraint violations
      if (pgError.code === '23505') {
        const detail = pgError.detail; // e.g., 'Key (email)=(test@example.com) already exists.'
        const fieldMatch = detail.match(/\(([^)]+)\)=\(([^)]+)\)/);

        const field = fieldMatch ? fieldMatch[1] : 'Field';
        const value = fieldMatch ? fieldMatch[2] : '';

        response.status(HttpStatus.CONFLICT).json({
          statusCode: HttpStatus.CONFLICT,
          error: 'Conflict',
          message: `The value for ${field} '${value}' already exists.`,
          timestamp: new Date(),
          path: request.url,
        });
        return;
      }

      // Handle other PostgreSQL errors if necessary
      // For example, foreign key violations (code '23503'), etc.

      this.logger.error(
        `Database error: ${pgError.code} - ${pgError.message}`,
        exception instanceof Error ? exception.stack : '',
      );

      // Return a generic database error response
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Internal Server Error',
        message: 'Database error',
        timestamp: new Date().toISOString(),
        path: request.url,
      });
      return;
    }

    // Handle other exceptions (fallback)
    this.logger.error(
      `Unhandled exception: ${exception}`,
      exception instanceof Error ? exception.stack : '',
    );

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      error: 'Internal Server Error',
      message: 'Unhandled exception',
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
