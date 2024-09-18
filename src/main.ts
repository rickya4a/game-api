import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use((req, res, next) => {
    const { method, url } = req;
    const statusCode = res.statusCode;
    const ip = req.ip;

    fs.appendFileSync(
      'access.log',
      `${new Date().toISOString()} - ${method} ${url} - ${ip} - ${statusCode}\n`,
    );
    next();
  });

  await app.listen(3100);
}
bootstrap();
