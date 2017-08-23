"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var Split = require("split.js");
var splitDirection = { vertical: 'vertical', horizontal: 'horizontal' };
var SplitPanelCustomAttribute = function () {
    function SplitPanelCustomAttribute(element, taskQueue) {
        this.element = element;
        this.taskQueue = taskQueue;
        this.minSize = 100;
        this.gutterSize = 10;
        this.vertical = false;
    }
    SplitPanelCustomAttribute.prototype.attached = function () {
        this.split();
    };
    SplitPanelCustomAttribute.prototype.detached = function () {
        this.splitjs.destroy();
    };
    SplitPanelCustomAttribute.prototype.split = function () {
        var _this = this;
        this.taskQueue.queueMicroTask(function () {
            var panelItems = _this.getPanelItems();
            if (!(_this.vertical && _this.element.style.height && _this.element.clientHeight)) _this.setParentHeight();
            _this.splitjs = Split(panelItems, {
                sizes: _this.sizes,
                minSize: _this.minSize,
                gutterSize: _this.gutterSize,
                direction: _this.vertical ? splitDirection.vertical : splitDirection.horizontal
            });
        });
    };
    SplitPanelCustomAttribute.prototype.getElementHeight = function (element) {
        return element.clientHeight || element.offsetHeight || Number.parseInt(element.style.height) || 0;
    };
    SplitPanelCustomAttribute.prototype.setParentHeight = function () {
        var parentHeight = String(this.getElementHeight(this.element));
        var height = parentHeight === '0' ? this.getElementHeight(this.element.children[0]) : parentHeight;
        this.element.style.height = height + "px";
    };
    SplitPanelCustomAttribute.prototype.getPanelItems = function () {
        if (!(this.element.children && this.element.children.length)) return [];
        var childrenArray = Array.from(this.element.children);
        if (!this.vertical) childrenArray.forEach(function (element) {
            return element.classList.add('split-horizontal');
        });
        return childrenArray.map(function (element) {
            return "#" + element.id;
        });
    };
    SplitPanelCustomAttribute.prototype.setSize = function (sizes) {
        this.splitjs.setSizes(sizes);
    };
    __decorate([aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.oneWay })], SplitPanelCustomAttribute.prototype, "sizes", void 0);
    __decorate([aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.oneWay })], SplitPanelCustomAttribute.prototype, "minSize", void 0);
    __decorate([aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.oneWay })], SplitPanelCustomAttribute.prototype, "gutterSize", void 0);
    __decorate([aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.oneWay })], SplitPanelCustomAttribute.prototype, "vertical", void 0);
    SplitPanelCustomAttribute = __decorate([aurelia_framework_1.inject(Element, aurelia_framework_1.TaskQueue)], SplitPanelCustomAttribute);
    return SplitPanelCustomAttribute;
}();
exports.SplitPanelCustomAttribute = SplitPanelCustomAttribute;
//# sourceMappingURL=aurelia-split-panel.js.map
