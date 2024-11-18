import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@/modules/auth/auth.module';
import { SwaggerModule } from '@/modules/swagger/swagger.module';
import { DrizzleModule } from '@/modules/drizzle/drizzle.module';
import { UserModule } from '@/modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    SwaggerModule,
    DrizzleModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
