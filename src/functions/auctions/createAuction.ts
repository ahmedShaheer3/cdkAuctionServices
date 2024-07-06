import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda";
import { formatJSONResponse } from "../../middleware/formatedResponse";
import middify from "../../middleware/middify";

const createAuction = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log("🚀 ~ createAuction ~ event:", event);
  try {
    return formatJSONResponse({ statusCode: 201, response: "auction created", success: true });
  } catch (error) {
    console.debug("ERROR[getEventUsersWithConnectionStatus]", error);
    if (error instanceof Error) {
      console.debug("ERROR[getEventUsersWithConnectionStatus]", error?.message);
      // checking if aws error
      if ("code" in error && "name" in error) {
        return formatJSONResponse({ statusCode: 400, response: error?.code, error: true });
      }
      return formatJSONResponse({ statusCode: 400, response: error?.message, error: true });
    }
    return formatJSONResponse({ statusCode: 500, response: "Failed to get users", error: true });
  }
};

// //schemas
const objectSchema: object = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        userEmail: { type: "string", format: "email" },
      },
      required: ["userEmail"],
    },
  },
};

export const handler: Handler = middify(createAuction, objectSchema);
