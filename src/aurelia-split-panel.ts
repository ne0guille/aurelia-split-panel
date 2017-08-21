import { bindable, bindingMode, TaskQueue, inject } from 'aurelia-framework';

import * as Split from 'split.js';

const splitDirection = { vertical: 'vertical', horizontal: 'horizontal' };

@inject(Element, TaskQueue)
export class SplitPanelCustomAttribute {
  @bindable({ defaultBindingMode: bindingMode.oneWay }) sizes: Array<number>;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) minSize: Array<number> | number = 100;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) gutterSize: number = 10;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) vertical: boolean = false;

  private splitjs: any;

  constructor(private element: Element, private taskQueue: TaskQueue) { }

  attached() {
    this.split();
  }

  detached() {
    this.splitjs.destroy();
  }

  split(): void {
    this.taskQueue.queueMicroTask(() => {
      const panelItems = this.getPanelItems();
      console.log(panelItems);

      this.splitjs = Split(panelItems, {
        sizes: this.sizes,
        minSize: this.minSize,
        gutterSize: this.gutterSize,
        direction: this.vertical ? 'vertical' : 'horizontal'
      });
    });
  }

  private getPanelItems(): string[] {
    if (!(this.element.children && this.element.children.length)) return [];

    const childrenArray = Array.from(this.element.children);

    if (!this.vertical) childrenArray.forEach(element => element.classList.add('split-horizontal'));

    return childrenArray.map(element => `#${element.id}`);
  }

  setSize(sizes: Array<number>): void {
    this.splitjs.setSizes(sizes);
  }
}
