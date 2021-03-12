import { APIGatewayEvent, Context } from 'aws-lambda';
import { handler } from '../../src/handler';
import * as Utils from '../../src/utils';
import Version from '../../local/data/version.json';

describe('Application entry', () => {
  let event;
  let context;
  let majorVersionNumber: string;
  let basePath: string;

  beforeEach(() => {
    event = {} as APIGatewayEvent;
    context = {} as Context;
    jest.spyOn(Utils, 'createMajorVersionNumber').mockReturnValue('1');
    majorVersionNumber = Utils.createMajorVersionNumber('1.0.0');
    basePath = Utils.createHandlerBasePath(majorVersionNumber);
  });

  afterEach(() => {
    jest.resetAllMocks().restoreAllMocks();
  });

  describe('Handler', () => {
    it('should call the express wrapper', async () => {
      event = { body: 'Test Body' };

      const response = await handler(event, context);
      expect(response.statusCode).toEqual(200);
      expect(typeof response.body).toBe('string');
    });

    describe('when the service is running', () => {
      describe('without proxy', () => {
        it("should return a body response when the handler has event with the '/' as path", async () => {
          event = { httpMethod: 'GET', path: '/' };

          const response = await handler(event, context);
          const parsedBody = JSON.parse(response.body) as { ok: boolean };

          expect(parsedBody.ok).toBe(true);
        });
      });
    });

    describe('with proxy', () => {
      describe("on '<path>' or '<version>'", () => {
        it('should receive the version number from an environmental variable following semver convention', () => {
          expect(process.env.API_VERSION).toMatch(/^(\d+\.)?(\d+\.)?(\*|\d+)$/);
        });

        it('should have version number in the API shown as major', () => {
          expect(majorVersionNumber).toMatch(/^(\d+)$/);
          expect(majorVersionNumber).not.toMatch(/^(\d+\.)$/);
        });
      });

      describe("on '/version' endpoint(s)", () => {
        it("should call the service/lambda when the path contains '/version' and return the app version following the semver convention", async () => {
          event = {
            ...Version,
            path: `stage/${basePath}/version`,
          };

          const response = await handler(event, context);
          const parsedResponse = JSON.parse(response.body) as { version: string };
          // is given when we build the file as API_VERSION from package.json with $npm_package_version
          // TODO we follow semver for code versioning ATM and only use the major for the API endpoint as v1
          const { API_VERSION } = process.env;

          expect(response.statusCode).toEqual(200);
          expect(parsedResponse.version).toBe(API_VERSION);
        });
      });
    });
  });
});
