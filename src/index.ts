import { PLATFORM } from 'aurelia-pal';
import 'split.js/split.js';

export function configure(config) {
  config.globalResources(PLATFORM.moduleName('./aurelia-split-panel'));
}