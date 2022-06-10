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
const mongoose_1 = __importDefault(require("mongoose"));
// Dependencies
(0, inversify_dependencies_1.initDI)();
// DATABASE
mongoose_1.default
    .connect(config_1.config.db.connectionString, config_1.config.db.options)
    .then(() => {
    console.log('Connected to mongo');
})
    .catch(error => {
    console.error({ error });
});
// API
const router = (0, express_1.default)();
const server = new inversify_express_utils_1.InversifyExpressServer(inversify_dependencies_1.container, null, { rootPath: '/' }, router);
router.use((_req, res, next) => {
    console.log('Pendiende crear el logger de DI');
    //req.method, req.url req.socket.remoteAddress
    res.on('finish', () => {
        console.log('Pendiende crear el logger de DI');
        // req.method, req.url, req.remoteAddress, res.statusCode
    });
    next();
});
router.use(body_parser_1.default.urlencoded({ extended: false }));
router.use(body_parser_1.default.json());
// Server
const appConfigured = server.build();
appConfigured.listen(config_1.config.server.port, () => {
    console.log('Pendiende crear el logger de DI');
});
//# sourceMappingURL=server.js.map