import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda";

const deleteAuction = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log("🚀 ~ createAuction ~ event:", event);
  // Your handler logic for creating an auction
  return {
    statusCode: 200,
    body: JSON.stringify("Auction deleted!"),
  };
};

export const handler: Handler = deleteAuction;
