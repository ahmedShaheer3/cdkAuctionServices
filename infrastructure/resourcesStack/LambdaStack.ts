import { Stack, StackProps } from "aws-cdk-lib";
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import { Code, Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { databaseTablesType, LambdaFunctionsType } from "../../src/models/infrastucture";
import { NodejsFunction as LambdaFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { join } from "path";

interface LambdaStackProps extends StackProps {
  databaseTables: databaseTablesType;
}

export class LambdaStack extends Stack {
  public readonly lambdaFunctions: LambdaFunctionsType;
  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id, props);
    /*
     **  Lambda Functions
     */
    const createAuction = new LambdaFunction(this, "createAuction", {
      runtime: Runtime.NODEJS_20_X,
      entry: join(__dirname, "../../src/functions/auctions/createAuction.ts"),
      handler: "index.handler",
      environment: {
        AUCTION_TABLE_NAME: props.databaseTables?.auctionTable.tableName,
      },
    });
    const updateAuction = new LambdaFunction(this, "updateAuction", {
      runtime: Runtime.NODEJS_20_X,
      entry: join(__dirname, "../../src/functions/auctions/updateAuction.ts"),
      handler: "index.handler",
      environment: {
        AUCTION_TABLE_NAME: props.databaseTables.auctionTable.tableName,
      },
    });

    const deleteAuction = new LambdaFunction(this, "deleteAuction", {
      runtime: Runtime.NODEJS_20_X,
      entry: join(__dirname, "../../src/functions/auctions/deleteAuction.ts"),
      handler: "index.handler",
      environment: {
        AUCTION_TABLE_NAME: props.databaseTables.auctionTable.tableName,
      },
    });

    const getAuction = new LambdaFunction(this, "getAuction", {
      runtime: Runtime.NODEJS_20_X,
      entry: join(__dirname, "../../src/functions/auctions/getAuction.ts"),
      handler: "index.handler",
      environment: {
        AUCTION_TABLE_NAME: props.databaseTables.auctionTable.tableName,
      },
    });

    const getAuctions = new LambdaFunction(this, "getAuctions", {
      runtime: Runtime.NODEJS_20_X,
      entry: join(__dirname, "../../src/functions/auctions/getAuctions.ts"),
      handler: "index.handler",
      environment: {
        AUCTION_TABLE_NAME: props.databaseTables.auctionTable.tableName,
      },
    });
    /*
     ** Grant Lambda permissions to interact with the DynamoDB table
     */
    props.databaseTables.auctionTable.grantReadWriteData(createAuction);

    this.lambdaFunctions = {
      createAuction: new LambdaIntegration(createAuction),
      updateAuction: new LambdaIntegration(updateAuction),
      deleteAuction: new LambdaIntegration(deleteAuction),
      getAuction: new LambdaIntegration(getAuction),
      getAuctions: new LambdaIntegration(getAuctions),
    };
  }
}
