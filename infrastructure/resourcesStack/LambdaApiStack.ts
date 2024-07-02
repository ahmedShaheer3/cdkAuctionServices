import { Stack, StackProps } from "aws-cdk-lib";
import { LambdaIntegration, LambdaRestApi, RestApi } from "aws-cdk-lib/aws-apigateway";
import { ITable } from "aws-cdk-lib/aws-dynamodb";
import { Code, Function as LambdaFunction, Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

interface LambdaApiStackProps extends StackProps {
  databaseTable: ITable;
}

export class LambdaApiStack extends Stack {
  constructor(scope: Construct, id: string, props: LambdaApiStackProps) {
    super(scope, id, props);
    /*
     **  Api gateway resouce
     */
    const api = new RestApi(this, "cdkAuctionServicesApis");

    /*
     **  Lambda Functions
     */
    const firstLambda = new LambdaFunction(this, "testingAuctionLambda", {
      runtime: Runtime.NODEJS_20_X,
      code: Code.fromInline(`
        exports.handler = async function(event) {
          return {
            statusCode: 200,
            body: JSON.stringify('Hello World!'),
          };
        };
        `),
      handler: "index.handler",
      environment: {
        TABLE_NAME: props.databaseTable.tableName,
      },
    });

    const auctionResourse = api.root.addResource("auction");
    auctionResourse.addMethod("GET", new LambdaIntegration(firstLambda));

    console.log("firstLambda", firstLambda);
  }
}
