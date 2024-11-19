import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const contextHttp = context.switchToHttp();
    const request = contextHttp.getRequest();
    const path = request.url;

    return next.handle().pipe(
      map((data) => ({
        statusCode: contextHttp.getResponse().statusCode,
        message: 'Success',
        data,
        timestamp: new Date(),
        path,
      })),
    );
  }
}
