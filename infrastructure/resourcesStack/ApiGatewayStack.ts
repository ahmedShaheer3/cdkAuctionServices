import { Stack, StackProps } from "aws-cdk-lib";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";

interface ApiGatewayStackProps extends StackProps {
  lambdaFunctions: LambdaIntegration;
}

export class ApiGatewayStack extends Stack {
  constructor(scope: Construct, id: string, props: ApiGatewayStackProps) {
    super(scope, id, props);
    /*
     ** Auction app api resource
     */
    const auctionApis = new RestApi(this, "cdkAuctionServicesApis");
    /*
     ** Auction apis
     */
    const auctionResourse = auctionApis.root.addResource("auction");
    auctionResourse.addMethod("GET", props.lambdaFunctions);
    auctionResourse.addMethod("POST", props.lambdaFunctions);
    auctionResourse.addMethod("PATCH", props.lambdaFunctions);
    auctionResourse.addMethod("DELETE", props.lambdaFunctions);
  }
}
