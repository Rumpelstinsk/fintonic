"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WinstonLogger = void 0;
class WinstonLogger {
    debug(message, metadata) {
        console.debug(Object.assign({ message }, (metadata && { metadata })));
    }
    info(message, metadata) {
        console.info(Object.assign({ message }, (metadata && { metadata })));
    }
    error(message, metadata) {
        console.error(Object.assign({ message }, (metadata && { metadata })));
    }
}
exports.WinstonLogger = WinstonLogger;
//# sourceMappingURL=WinstonLogger.js.map