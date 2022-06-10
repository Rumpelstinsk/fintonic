"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MODULE_TYPES = void 0;
const inversify_bindings_1 = require("@modules/products/inversify.bindings");
const inversify_bindings_2 = require("@shared/inversify.bindings");
exports.MODULE_TYPES = {
    PRODUCT: Object.assign({}, inversify_bindings_1.MODULE_TYPES),
    SHARED: Object.assign({}, inversify_bindings_2.MODULE_TYPES),
};
//# sourceMappingURL=constants.js.map