"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDI = exports.container = void 0;
const inversify_1 = require("inversify");
const inversify_bindings_1 = require("@modules/products/inversify.bindings");
const inversify_bindings_2 = require("@modules/shared/inversify.bindings");
exports.container = new inversify_1.Container();
const initDI = () => {
    (0, inversify_bindings_2.bindToContainer)(exports.container);
    (0, inversify_bindings_1.bindToContainer)(exports.container);
};
exports.initDI = initDI;
//# sourceMappingURL=inversify.dependencies.js.map