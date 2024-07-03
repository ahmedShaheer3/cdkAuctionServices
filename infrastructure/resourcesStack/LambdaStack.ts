import { Stack, StackProps } from "aws-cdk-lib";
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import { Code, Function as LambdaFunction, Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { databaseTablesType, LambdaFunctionsType } from "../../src/models/infrastucture";

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
        AUCTION_TABLE_NAME: props.databaseTables?.auctionTable.tableName,
      },
    });
    const updateAuction = new LambdaFunction(this, "updateAuction", {
      runtime: Runtime.NODEJS_20_X,
      code: Code.fromAsset("lambda"),
      handler: "updateAuction.handler",
      environment: {
        AUCTION_TABLE_NAME: props.databaseTables.auctionTable.tableName,
      },
    });

    const deleteAuction = new LambdaFunction(this, "deleteAuction", {
      runtime: Runtime.NODEJS_20_X,
      code: Code.fromAsset("lambda"),
      handler: "deleteAuction.handler",
      environment: {
        AUCTION_TABLE_NAME: props.databaseTables.auctionTable.tableName,
      },
    });

    const getAuction = new LambdaFunction(this, "getAuction", {
      runtime: Runtime.NODEJS_20_X,
      code: Code.fromAsset("lambda"),
      handler: "getAuction.handler",
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
    };
  }
}
