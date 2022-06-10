"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bindToContainer = exports.MODULE_TYPES = void 0;
const logger_1 = require("./logger");
exports.MODULE_TYPES = {
    Logger: 'Logger',
};
const bindToContainer = (container) => {
    // Controllers
    container.bind(exports.MODULE_TYPES.Logger).to(logger_1.WinstonLogger);
};
exports.bindToContainer = bindToContainer;
//# sourceMappingURL=inversify.bindings.js.map