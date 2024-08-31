import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CurrencyRateAppStack } from '../lib/cdk-lambda-ts-stack';


const app = new cdk.App();
new CurrencyRateAppStack(app, 'CurrencyRateAppStack', {
  /* If you don't specify 'env', this stack will be environment-agnostic. */
  /* Uncomment the next line to specialize this stack for the AWS Account and Region that are implied by the current CLI configuration. */
  // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

  /* Uncomment the next line if you know exactly what Account and Region you want to deploy the stack to. */
  // env: { account: '123456789012', region: 'us-east-1' },
});
