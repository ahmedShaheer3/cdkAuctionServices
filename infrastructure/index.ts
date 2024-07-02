#!/usr/bin/env node
/*
 ** This is the launcher file where all our stack are declare here
 */
import "source-map-support/register";
import { App } from "aws-cdk-lib";
import { DatabaseStack } from "./resourcesStack/DatabaseStack";
import { ApiGatewayStack } from "./resourcesStack/ApiGatewayStack";
import { LambdaStack } from "./resourcesStack/LambdaStack";

const app = new App();
/*
 ** Stacks
 */
const Databases = new DatabaseStack(app, "DatabaseStack");
const lambdas = new LambdaStack(app, "LambdaApiStack", {
  databaseTable: Databases.databaseTables,
});
new ApiGatewayStack(app, "ApiStack", {
  lambdaFunctions: lambdas.auctionFunctions,
});
