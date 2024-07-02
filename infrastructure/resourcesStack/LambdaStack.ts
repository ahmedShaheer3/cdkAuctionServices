import { Stack, StackProps } from "aws-cdk-lib";
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import { ITable } from "aws-cdk-lib/aws-dynamodb";
import { Code, Function as LambdaFunction, Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

interface LambdaStackProps extends StackProps {
  databaseTable: ITable;
}

export class LambdaStack extends Stack {
  public readonly auctionFunctions: LambdaIntegration;
  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id, props);

    /*
     **  Lambda Functions
     */
    const createAuction = new LambdaFunction(this, "createAuction", {
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
    this.auctionFunctions = new LambdaIntegration(createAuction);
  }
}
