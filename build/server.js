"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("module-alias/register");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const config_1 = require("./config");
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_dependencies_1 = require("./inversify.dependencies");
const constants_1 = require("./constants");
const initializations_1 = require("./initializations");
// Dependencies
(0, inversify_dependencies_1.initDI)();
const logger = inversify_dependencies_1.container.get(constants_1.MODULE_TYPES.SHARED.Logger);
// DB
(0, initializations_1.initDB)(logger);
// API
const router = (0, express_1.default)();
const server = new inversify_express_utils_1.InversifyExpressServer(inversify_dependencies_1.container, null, { rootPath: '/' }, router);
router.use(({ method, url, socket, params, query }, res, next) => {
    logger.info('Request received', { method, url, remoteAddress: socket.remoteAddress, params, query });
    res.on('finish', () => {
        logger.info('Request fullfilled', { method, url, remoteAddress: socket.remoteAddress });
    });
    next();
});
router.use(body_parser_1.default.urlencoded({ extended: false }));
router.use(body_parser_1.default.json());
// Server
const appConfigured = server.build();
appConfigured.listen(config_1.config.server.port, () => {
    logger.info(`Server ready - listening on '${config_1.config.server.hostname}:${config_1.config.server.port}'`);
});
//# sourceMappingURL=server.js.map