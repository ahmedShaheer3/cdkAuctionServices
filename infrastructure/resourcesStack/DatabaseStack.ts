import { Stack, StackProps } from "aws-cdk-lib";
import { AttributeType, Table as DynamodbTable, ITable } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class DatabaseStack extends Stack {
  public readonly databaseTables: ITable;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    /*
     ** Database tables
     */
    this.databaseTables = new DynamodbTable(this, "CdkAuctionTable", {
      partitionKey: {
        name: "id",
        type: AttributeType.STRING,
      },
      tableName: "CdkAuctionTable",
    });
    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkAuctionQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
