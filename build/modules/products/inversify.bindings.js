"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bindToContainer = exports.MODULE_TYPES = void 0;
const infraestructure_1 = require("./infraestructure");
exports.MODULE_TYPES = {
    ProductController: 'ProductController',
    ProductsRepository: 'ProductsRepository',
};
const bindToContainer = (container) => {
    // Repositories
    container.bind(exports.MODULE_TYPES.ProductsRepository).to(infraestructure_1.ProductMongooseRepository);
    // Controllers
    container.bind(exports.MODULE_TYPES.ProductController).to(infraestructure_1.ProductController);
};
exports.bindToContainer = bindToContainer;
//# sourceMappingURL=inversify.bindings.js.map