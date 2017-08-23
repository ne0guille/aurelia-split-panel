import * as Split from 'split.js';

import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

import { splitEvents, splitDirection } from './split-constants';

export interface SplitOptions {
  sizes: Array<number>;
  minSize: Array<number> | number;
  gutterSize: number;
  direction: string;
  cursor: string;
}

@inject(EventAggregator)
export class SplitService {
  ea: EventAggregator;

  constructor(ea) {
    this.ea = ea;
  }

  public create(options: SplitOptions) {
    this.ea.publish(splitEvents.create, options);
  }

  public setSizes(sizes) {
    this.ea.publish(splitEvents.setSize, sizes);
  }

  public destroy() {
    this.ea.publish(splitEvents.destroy);
  }

  public initialize(element: HTMLElement, options: SplitOptions) {
    const isVertical = options.direction === splitDirection.vertical;
    const panelItems = this.getPanelItems(element, isVertical);

    this.setParentHeight(element, isVertical);

    return Split(panelItems, options);
  }

  private getPanelItems(element: HTMLElement, isVertical: boolean): string[] {
    if (!(element.children && element.children.length)) return [];

    const childrenArray = Array.from(element.children);

    if (!isVertical) childrenArray.forEach(element => element.classList.add('split-horizontal'));

    return childrenArray.map(element => `#${element.id}`);
  }

  private setParentHeight(element: HTMLElement, isVertical: boolean): void {
    if (!(isVertical && element.style.height && element.clientHeight)) {
      const parentHeight = String(this.getElementHeight(element));
      const height = parentHeight === '0' ? this.getElementHeight(element.children[0]) : parentHeight;

      element.style.height = `${height}px`;
    }
  }

  private getElementHeight(element): number {
    return element.clientHeight || element.offsetHeight || Number.parseInt(element.style.height) || 0;
  }
}