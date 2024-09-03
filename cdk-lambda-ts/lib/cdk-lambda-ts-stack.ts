import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as s3 from 'aws-cdk-lib/aws-s3';

export class CurrencyRateAppStack extends cdk.Stack {
    constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // S3バケットの定義
        const bucket = new s3.Bucket(this, 'CurrencyRateAppBucket', {
            removalPolicy: cdk.RemovalPolicy.DESTROY, // 開発時には削除を許可
            autoDeleteObjects: true,  // バケット削除時にオブジェクトも削除
            websiteIndexDocument: 'index.html', // インデックスドキュメントの指定
            websiteErrorDocument: 'error.html',  // エラードキュメントの指定
          });

        // // DynamoDBテーブルの定義
        // const table = new dynamodb.Table(this, 'CurrencyRateAppTable', {
        //     partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
        //     billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
        //     removalPolicy: cdk.RemovalPolicy.DESTROY,
        // });

        // Nestjs Lambda関数の定義
        const handler = new lambda.Function(this, 'NestJsLambda', {
          runtime: lambda.Runtime.NODEJS_20_X,
          code: lambda.Code.fromAsset('/home/syenalc/currency-rate-app/backend/my-nest/lambda-package.zip'), // ビルドされたNestJSアプリのディレクトリ,絶対パスでも相対パスでも可
          handler: 'dist/main.handler', // 上記のハンドラー関数
          timeout: cdk.Duration.seconds(45), 
          environment: {
            NODE_ENV: 'production',
          },
        });
        

        // API Gatewayの定義
        const api = new apigateway.LambdaRestApi(this, 'MyApi', {
          handler: handler,
          proxy: false, // プロキシを無効にする
        });
        
        // 手動でリソースとメソッドを追加
        const items = api.root.addResource('items');
        items.addMethod('GET', new apigateway.LambdaIntegration(handler));
        items.addMethod('POST', new apigateway.LambdaIntegration(handler));
        items.addMethod('PUT', new apigateway.LambdaIntegration(handler));
        items.addMethod('DELETE', new apigateway.LambdaIntegration(handler));

        const getCurrenciesIntegration = new apigateway.LambdaIntegration(handler, {
            requestTemplates: { "application/json": '{ "statusCode": "200" }' },
        });

        api.root.addMethod("GET", getCurrenciesIntegration); // GET / エンドポイントの設定

        // // 必要なアクセス権を付与
        // table.grantReadWriteData(handler);
        bucket.grantReadWrite(handler);
    }
}

