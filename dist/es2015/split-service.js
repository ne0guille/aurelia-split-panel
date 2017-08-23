"use strict";

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Split = require("split.js");
var aurelia_framework_1 = require("aurelia-framework");
var aurelia_event_aggregator_1 = require("aurelia-event-aggregator");
var split_constants_1 = require("./split-constants");
var SplitService = function () {
    function SplitService(ea) {
        this.ea = ea;
    }
    SplitService.prototype.create = function (options) {
        this.ea.publish(split_constants_1.splitEvents.create, options);
    };
    SplitService.prototype.setSizes = function (sizes) {
        this.ea.publish(split_constants_1.splitEvents.setSize, sizes);
    };
    SplitService.prototype.destroy = function () {
        this.ea.publish(split_constants_1.splitEvents.destroy);
    };
    SplitService.prototype.initialize = function (element, options) {
        var isVertical = options.direction === split_constants_1.splitDirection.vertical;
        var panelItems = this.getPanelItems(element, isVertical);
        this.setParentHeight(element, isVertical);
        return Split(panelItems, options);
    };
    SplitService.prototype.getPanelItems = function (element, isVertical) {
        if (!(element.children && element.children.length)) return [];
        var childrenArray = Array.from(element.children);
        if (!isVertical) childrenArray.forEach(function (element) {
            return element.classList.add('split-horizontal');
        });
        return childrenArray.map(function (element) {
            return "#" + element.id;
        });
    };
    SplitService.prototype.setParentHeight = function (element, isVertical) {
        if (!(isVertical && element.style.height && element.clientHeight)) {
            var parentHeight = String(this.getElementHeight(element));
            var height = parentHeight === '0' ? this.getElementHeight(element.children[0]) : parentHeight;
            element.style.height = height + "px";
        }
    };
    SplitService.prototype.getElementHeight = function (element) {
        return element.clientHeight || element.offsetHeight || Number.parseInt(element.style.height) || 0;
    };
    SplitService = __decorate([aurelia_framework_1.inject(aurelia_event_aggregator_1.EventAggregator)], SplitService);
    return SplitService;
}();
exports.SplitService = SplitService;
//# sourceMappingURL=split-service.js.map
