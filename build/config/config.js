"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const ENVIROMENT = (_a = process.env.ENVIROMENT) !== null && _a !== void 0 ? _a : 'development';
const SERVER_HOSTNAME = (_b = process.env.SERVER_HOSTNAME) !== null && _b !== void 0 ? _b : 'localhost';
const SERVER_PORT = (_c = process.env.SERVER_PORT) !== null && _c !== void 0 ? _c : 4000;
const DB_NAME = (_d = process.env.DB_USERNAME) !== null && _d !== void 0 ? _d : 'fintonic';
const DB_USERNAME = (_e = process.env.DB_USERNAME) !== null && _e !== void 0 ? _e : 'admin';
const DB_PASSWORD = (_f = process.env.DB_PASSWORD) !== null && _f !== void 0 ? _f : 'admin';
const DB_HOST = (_g = process.env.DB_HOST) !== null && _g !== void 0 ? _g : 'localhost:27017';
const DB_OPTIONS = {
    autoIndex: false,
    keepAlive: true,
};
exports.config = {
    server: {
        hostname: SERVER_HOSTNAME,
        port: SERVER_PORT,
    },
    db: {
        connectionString: ENVIROMENT === 'development'
            ? 'mongodb://localhost:27017/dev?authSource=admin'
            : `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
        options: DB_OPTIONS,
        name: DB_NAME,
        username: DB_NAME,
        password: DB_PASSWORD,
        host: DB_HOST,
    },
};
//# sourceMappingURL=config.js.map