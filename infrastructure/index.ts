#!/usr/bin/env node
/*
 ** This is the launcher file where all our stack are declare here
 */
import "source-map-support/register";
import { App } from "aws-cdk-lib";
import { DatabaseStack } from "./resourcesStack/DatabaseStack";
import { LambdaApiStack } from "./resourcesStack/LambdaApiStack";

const app = new App();
/*
 ** Stacks
 */
const Databases = new DatabaseStack(app, "DatabaseStack");
new LambdaApiStack(app, "LambdaApiStack", {
  databaseTable: Databases.databaseTable,
});
