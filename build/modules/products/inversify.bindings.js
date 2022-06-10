"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bindToContainer = exports.MODULE_TYPES = void 0;
const infraestructure_1 = require("./infraestructure");
exports.MODULE_TYPES = {
    ProductController: 'ProductController',
};
const bindToContainer = (container) => {
    // Controllers
    container.bind(exports.MODULE_TYPES.ProductController).to(infraestructure_1.ProductController);
};
exports.bindToContainer = bindToContainer;
//# sourceMappingURL=inversify.bindings.js.map