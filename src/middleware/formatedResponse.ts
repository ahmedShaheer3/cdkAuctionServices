import { APIGatewayProxyResult } from "aws-lambda";

interface formatJSONResponseType {
  statusCode: number;
  response: string | object | unknown;
  success?: boolean;
  error?: boolean;
}
export const formatJSONResponse = ({
  statusCode = 200,
  response = "",
  success = true,
  error = false,
}: formatJSONResponseType): APIGatewayProxyResult => {
  if (response === "UserNotFoundException") {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: true, message: "User not found" }),
    };
  }
  if (response === "InvalidPasswordException") {
    return {
      statusCode: 406,
      body: JSON.stringify({ error: true, message: "Invalid password" }),
    };
  }
  if (response === "User is disabled.") {
    return {
      statusCode: 403,
      body: JSON.stringify({ error: true, message: "User is disabled" }),
    };
  }
  if (response === "NotAuthorizedException") {
    return {
      statusCode: 403,
      body: JSON.stringify({ error: true, message: "Incorrect username or password" }),
    };
  }
  if (response === "UnsupportedUserStateException") {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: true, message: "User already confirmed" }),
    };
  }
  if (response === "UserNotConfirmedException") {
    return {
      statusCode: 403,
      body: JSON.stringify({ error: true, message: "User not confirmed" }),
    };
  }
  if (response === "UsernameExistsException") {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: true, message: "User already exits" }),
    };
  }
  if (response === "User cannot be confirmed. Current status is CONFIRMED") {
    return {
      statusCode: 406,
      body: JSON.stringify({ error: true, message: "User already confirmed" }),
    };
  }
  if (response === "CodeMismatchException") {
    return {
      statusCode: 406,
      body: JSON.stringify({ error: true, message: "Invalid confirmation code try again later" }),
    };
  }
  if (response === "InvalidParameterType") {
    return {
      statusCode: 406,
      body: JSON.stringify({ error: true, message: "Invalid params" }),
    };
  }
  if (response === "AccessDeniedException") {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: true, message: "Unauthorized" }),
    };
  }
  if (response === "ValidationException") {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: true, message: "Invalid expression" }),
    };
  }
  if (response === "InvalidParameterException") {
    return {
      statusCode: 406,
      body: JSON.stringify({ error: true, message: "Invalid parameter" }),
    };
  }
  //checking wheather is there any error
  if (error) {
    return {
      statusCode,
      body: JSON.stringify({ error: true, message: response }),
    };
  } else {
    return {
      statusCode,
      body: JSON.stringify({ success, data: response }),
    };
  }
};
