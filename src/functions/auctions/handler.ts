import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Context } from "vm";

async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  switch (event.httpMethod) {
    case "GET":
      return getAuction(event);
      break;
    case "POST":
      return createAuction(event);
    case "DELETE":
      return deleteAuction(event);
    case "PATCH":
      return updateAuction(event);
    default:
      break;
  }
}
