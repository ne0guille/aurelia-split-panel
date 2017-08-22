import { bindable, bindingMode, inject, TaskQueue } from 'aurelia-framework';

import * as Split from 'split.js';

const splitDirection = { vertical: 'vertical', horizontal: 'horizontal' };

@inject(Element, TaskQueue)
export class SplitPanelCustomAttribute {
  @bindable({ defaultBindingMode: bindingMode.oneWay }) sizes: Array<number>;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) minSize: Array<number> | number = 100;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) gutterSize: number = 10;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) vertical: boolean = false;

  private splitjs: any;

  constructor(private element: HTMLElement, private taskQueue: TaskQueue) { }

  attached() {
    this.split();
  }

  detached() {
    this.splitjs.destroy();
  }

  split(): void {
    this.taskQueue.queueMicroTask(() => {
      const panelItems = this.getPanelItems();
      if (!(this.vertical && this.element.style.height && this.element.clientHeight)) this.setParentHeight();

      this.splitjs = Split(panelItems, {
        sizes: this.sizes,
        minSize: this.minSize,
        gutterSize: this.gutterSize,
        direction: this.vertical ? splitDirection.vertical : splitDirection.horizontal
      });
    });
  }

  private getElementHeight(element): number {
    return element.clientHeight || element.offsetHeight || Number.parseInt(element.style.height) || 0;
  }

  private setParentHeight(): void {
    const parentHeight = String(this.getElementHeight(this.element));
    const height = parentHeight === '0' ? this.getElementHeight(this.element.children[0]) : parentHeight;

    this.element.style.height = `${height}px`;
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
