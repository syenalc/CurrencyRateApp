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
    app.enableCors(); // CORSを有効にする
    await app.init();
    cachedServer = awsServerlessExpress.createServer(app.getHttpAdapter().getInstance());
  }
  return cachedServer;
}

export const handler: Handler = async (event: any, context: Context, callback: Callback) => {
  console.log("Received event:", JSON.stringify(event));
  
  cachedServer = await bootstrapServer();
  const response = await awsServerlessExpress.proxy(cachedServer, event, context, 'PROMISE').promise;

  // CORSヘッダーを追加して、適切なレスポンスを設定
  response.headers = {
    // ...response.headers,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
    'Access-Control-Allow-Methods': 'OPTIONS,GET,POST,PUT,DELETE',
  };
  // response.statusCode = 200; 

  return response;
};


