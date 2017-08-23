"use strict";

function __export(m) {
    for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_pal_1 = require("aurelia-pal");
function configure(config) {
    config.globalResources(aurelia_pal_1.PLATFORM.moduleName('./aurelia-split-panel'));
}
exports.configure = configure;
__export(require("./split-service"));
//# sourceMappingURL=index.js.map
