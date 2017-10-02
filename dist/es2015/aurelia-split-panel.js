"use strict";

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_event_aggregator_1 = require("aurelia-event-aggregator");
var aurelia_framework_1 = require("aurelia-framework");
var split_service_1 = require("./split-service");
var split_constants_1 = require("./split-constants");
var SplitPanelCustomAttribute = function () {
    function SplitPanelCustomAttribute(element, taskQueue, ea, splitService) {
        this.element = element;
        this.taskQueue = taskQueue;
        this.ea = ea;
        this.splitService = splitService;
        this.minSize = 100;
        this.gutterSize = 10;
        this.vertical = false;
        this.cursor = 'grabbing';
        this.initialize = true;
        this.subscriptions = [];
    }
    SplitPanelCustomAttribute.prototype.attached = function () {
        var _this = this;
        var isVertical = typeof this.vertical === "string" ? JSON.parse(this.vertical) : this.vertical;
        this.options = {
            sizes: this.sizes,
            minSize: this.minSize,
            gutterSize: this.gutterSize,
            direction: isVertical ? split_constants_1.splitDirection.vertical : split_constants_1.splitDirection.horizontal,
            cursor: this.cursor
        };
        if (this.initialize) this.taskQueue.queueMicroTask(function () {
            return _this.initializeSplit();
        });
        this.subscriptions.push(this.ea.subscribe(split_constants_1.splitEvents.create, function (options) {
            return _this.initializeSplit(options);
        }), this.ea.subscribe(split_constants_1.splitEvents.destroy, function () {
            return _this.destroySplit();
        }), this.ea.subscribe(split_constants_1.splitEvents.setSize, function (sizes) {
            return _this.setSizes(sizes);
        }));
    };
    SplitPanelCustomAttribute.prototype.detached = function () {
        this.destroySplit();
        this.subscriptions.forEach(function (subs) {
            return subs.dispose();
        });
    };
    SplitPanelCustomAttribute.prototype.verticalChanged = function (newValue) {
        if (newValue !== undefined && this.options) {
            this.options.direction = newValue;
        }
    };
    SplitPanelCustomAttribute.prototype.initializeSplit = function (options) {
        this.destroySplit();
        var splitOptions = options || this.options;
        this.splitjs = this.splitService.initialize(this.element, splitOptions);
    };
    SplitPanelCustomAttribute.prototype.destroySplit = function () {
        if (this.splitjs !== undefined) this.splitjs = this.splitjs.destroy();
    };
    SplitPanelCustomAttribute.prototype.setSizes = function (sizes) {
        if (this.splitjs !== undefined) this.splitjs.setSizes(sizes);
    };
    __decorate([aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.oneWay, primaryProperty: true })], SplitPanelCustomAttribute.prototype, "sizes", void 0);
    __decorate([aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.oneWay })], SplitPanelCustomAttribute.prototype, "minSize", void 0);
    __decorate([aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.oneWay })], SplitPanelCustomAttribute.prototype, "gutterSize", void 0);
    __decorate([aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.oneWay })], SplitPanelCustomAttribute.prototype, "vertical", void 0);
    __decorate([aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.oneWay })], SplitPanelCustomAttribute.prototype, "cursor", void 0);
    __decorate([aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.oneWay })], SplitPanelCustomAttribute.prototype, "initialize", void 0);
    SplitPanelCustomAttribute = __decorate([aurelia_framework_1.inject(Element, aurelia_framework_1.TaskQueue, aurelia_event_aggregator_1.EventAggregator, split_service_1.SplitService)], SplitPanelCustomAttribute);
    return SplitPanelCustomAttribute;
}();
exports.SplitPanelCustomAttribute = SplitPanelCustomAttribute;
//# sourceMappingURL=aurelia-split-panel.js.map
