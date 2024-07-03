import { Stack, StackProps } from "aws-cdk-lib";
import { RestApi } from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";
import { LambdaFunctionsType } from "../../src/models/infrastucture";

interface ApiGatewayStackProps extends StackProps {
  lambdaFunctions: LambdaFunctionsType;
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
    const auctionResource = auctionApis.root.addResource("auction");
    auctionResource.addMethod("POST", props.lambdaFunctions.createAuction);
    auctionResource.addMethod("PATCH", props.lambdaFunctions.updateAuction);
    auctionResource.addMethod("DELETE", props.lambdaFunctions.deleteAuction);
    auctionResource.addMethod("GET", props.lambdaFunctions.getAuction);
  }
}
