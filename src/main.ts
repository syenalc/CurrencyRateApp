// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   // CORSを有効にする
//   app.enableCors();
  
//   await app.listen(4000);
// }
// bootstrap();


//上記はlambda環境でのサーバーの起動を想定
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from 'http';
import * as awsServerlessExpress from 'aws-serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';

let cachedServer: Server;

async function bootstrapServer(): Promise<Server> {
  if (!cachedServer) {
    const app = await NestFactory.create(AppModule);
    await app.init();
    cachedServer = awsServerlessExpress.createServer(app.getHttpAdapter().getInstance());
  }
  return cachedServer;
}

export const handler: Handler = async (event: any, context: Context, callback: Callback) => {
  cachedServer = await bootstrapServer();
  return awsServerlessExpress.proxy(cachedServer, event, context, 'PROMISE').promise;
};

