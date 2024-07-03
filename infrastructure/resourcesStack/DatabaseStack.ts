import { Stack, StackProps } from "aws-cdk-lib";
import { AttributeType, Table as DynamodbTable, ITable } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import { databaseTablesType } from "../../src/models/infrastucture";

export class DatabaseStack extends Stack {
  public readonly databaseTables: databaseTablesType;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    /*
     ** Database tables
     */
    this.databaseTables = {
      auctionTable: new DynamodbTable(this, "CdkAuctionTable", {
        partitionKey: {
          name: "id",
          type: AttributeType.STRING,
        },
        tableName: "CdkAuctionTable",
      }),
    };
  }
}
