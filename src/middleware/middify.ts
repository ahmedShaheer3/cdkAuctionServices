import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpEventNormalizer from '@middy/http-event-normalizer';
import cors from '@middy/http-cors';
import {Handler} from 'aws-lambda';
import httpHeaderNormalizer from '@middy/http-header-normalizer';
import validator from '@middy/validator';
import httpErrorHandler from '@middy/http-error-handler';
import {transpileSchema} from '@middy/validator/transpile';

// validator Error type
interface validatorError {
  instancePath: string;
  schemaPath: string;
  keyword: string;
  params?: {
    comparison?: string;
    limit: 4;
  };
  message: string;
}
// axois({})

export default (handler: Handler, eventSchema: object = {}): middy.MiddyfiedHandler =>
  middy(handler).use([
    httpJsonBodyParser(),
    validator({eventSchema: transpileSchema(eventSchema)}),
    // checking for validation error
    {
      onError: (request) => {
        console.debug('request in middy is', request);
        const response = request.response;
        const error = request.error;

        // checking if error is coming from validator
        if (response.statusCode != 400) return;
        if (!error.expose || !error.cause) return;

        // formating incoming validator error
        const validatorError: validatorError = error.cause[0];

        // getting error body path variable
        const errorParam: string[] = validatorError?.instancePath?.split('/');

        // creating custome message to show as error
        const customeErrorMsg = 'validation check fail on ' + errorParam[errorParam?.length - 1];

        response.headers['Content-Type'] = 'application/json';
        response.body = JSON.stringify({
          error: true,
          message: validatorError.message,
          validationErrors: customeErrorMsg,
        });
      },
    },
    httpErrorHandler(),
    httpEventNormalizer(),
    httpHeaderNormalizer(),
    cors(),
  ]);
