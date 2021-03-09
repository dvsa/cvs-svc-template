import 'source-map-support/register';
import serverless from 'serverless-http';
import { Context, APIGatewayEvent, APIGatewayProxyStructuredResultV2 } from 'aws-lambda';

import { app } from './infrastructure/api';

import { createMajorVersionNumber, createHandlerBasePath } from './utils';

const {
  NODE_ENV, API_VERSION, AWS_PROVIDER_REGION, AWS_PROVIDER_STAGE,
} = process.env;

console.log(
  `\nRunning Service\n version: '${API_VERSION}'\n mode: ${NODE_ENV}\n stage: '${AWS_PROVIDER_STAGE}'\n region: '${AWS_PROVIDER_REGION}'\n\n`,
);

const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyStructuredResultV2> => {
  console.log('event');
  console.log(JSON.stringify(event, null, 2));

  return serverless(app, {
    /**
     * We proxy requests from / as <stage> is handled in APIG when we deploy.
     * With with serverless-offline we proxy requests from /v<x> from the client -
     * The package.json version as single source of truth to be the app basePath with stage
     * given at build time with .env files
     *
     * --noPrependStageInUrl flag could be used while running serverless offline if we wanted
     * to proxy from the stage instead of /.
     * The Open API specs specifies it should contain the version as /v<x> so we use
     *
     * Endpoints on API G must contain a stage (e.g. /devops) and must be followed by the version as /v1 for example
     * if the version is used - For local development we allow both, also please see test data of API G (local/data/.*json)
     *
     * /<stage>/<valid-endpoint> will work
     * /<stage>/v<x>/<valid-endpoint> will work
     *
     * /<valid-endpoint> won't work unless --noPrependStageInUrl is passed when running the serverless offline
     * /<stage>/v<x>/something/<valid-endpoint> won't work
     * something/<stage>/v<x>/<valid-endpoint> won't work
     *
     *
     * We use express Router to proxy redirect requests from /v<x>/
     */
    // basePath: `${AWS_PROVIDER_STAGE}/${MAJOR_VERSION}`,
    basePath: createHandlerBasePath(createMajorVersionNumber(API_VERSION)),
  })(event, context);
};

export { handler };
