"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.handler = void 0;
require("source-map-support/register");
var serverless_http_1 = require("serverless-http");
var api_1 = require("./infrastructure/api");
var utils_1 = require("./utils");
var _a = process.env, NODE_ENV = _a.NODE_ENV, API_VERSION = _a.API_VERSION, AWS_PROVIDER_REGION = _a.AWS_PROVIDER_REGION, AWS_PROVIDER_STAGE = _a.AWS_PROVIDER_STAGE;
console.log("\nRunning Service\n version: '" + API_VERSION + "'\n mode: " + NODE_ENV + "\n stage: '" + AWS_PROVIDER_STAGE + "'\n region: '" + AWS_PROVIDER_REGION + "'\n\n");
var handler = function (event, context) { return __awaiter(void 0, void 0, Promise, function () {
    return __generator(this, function (_a) {
        console.log('event');
        console.log(JSON.stringify(event, null, 2));
        return [2 /*return*/, serverless_http_1["default"](api_1.app, {
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
                basePath: utils_1.createHandlerBasePath(utils_1.createMajorVersionNumber(API_VERSION))
            })(event, context)];
    });
}); };
exports.handler = handler;
