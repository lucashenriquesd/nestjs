import { defineConfig } from 'drizzle-kit';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export default defineConfig({
  out: './src/modules/drizzle/migrations',
  schema: './src/modules/drizzle/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: configService.get<string>('DATABASE_URL')!,
  },
  migrations: {
    schema: 'public',
  },
});
