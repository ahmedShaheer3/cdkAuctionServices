import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import { ITable } from "aws-cdk-lib/aws-dynamodb";

type tableNames = "auctionTable";
type LambdaFunctionNames =
  | "createAuction"
  | "updateAuction"
  | "deleteAuction"
  | "getAuction"
  | "getAuctions";

// Add more table names as needed

export type databaseTablesType = {
  [key in tableNames]: ITable;
};

// Add more function names as needed

export type LambdaFunctionsType = {
  [key in LambdaFunctionNames]: LambdaIntegration;
};
