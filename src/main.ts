import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import * as passport from 'passport';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'my secret',
      saveUninitialized: false,
      resave: false,
      cookie: { maxAge: 60 * 1000 }
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(5048, () => console.log('5048 portunda dinleniyor'));
}

bootstrap();
