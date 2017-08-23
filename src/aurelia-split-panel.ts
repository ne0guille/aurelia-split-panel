import { EventAggregator, Subscription } from 'aurelia-event-aggregator';
import { bindable, bindingMode, inject, TaskQueue } from 'aurelia-framework';

import { SplitOptions, SplitService } from './split-service';
import { splitDirection, splitEvents } from "./split-constants";

@inject(Element, TaskQueue, EventAggregator, SplitService)
export class SplitPanelCustomAttribute {
  @bindable({ defaultBindingMode: bindingMode.oneWay, primaryProperty: true }) sizes: Array<number>;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) minSize: Array<number> | number = 100;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) gutterSize: number = 10;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) vertical: boolean = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) cursor: string = 'grabbing';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) initialize: boolean = true;

  private splitjs: any;
  private options: SplitOptions;
  private subscriptions: Subscription[] = [];

  constructor(private element: HTMLElement,
    private taskQueue: TaskQueue,
    private ea: EventAggregator,
    private splitService: SplitService) { }

  attached() {
    this.options = {
      sizes: this.sizes,
      minSize: this.minSize,
      gutterSize: this.gutterSize,
      direction: this.vertical ? splitDirection.vertical : splitDirection.horizontal,
      cursor: this.cursor
    };

    if (this.initialize) this.taskQueue.queueMicroTask(() => this.initializeSplit());

    this.subscriptions.push(
      this.ea.subscribe(splitEvents.create, (options?: SplitOptions) => this.initializeSplit(options)),
      this.ea.subscribe(splitEvents.destroy, () => this.destroySplit()),
      this.ea.subscribe(splitEvents.setSize, (sizes: number[]) => this.setSizes(sizes))
    );
  }

  detached() {
    this.destroySplit();
    this.subscriptions.forEach((subs: Subscription) => subs.dispose());
  }

  private initializeSplit(options?: SplitOptions) {
    this.destroySplit();

    const splitOptions = options || this.options;

    this.splitjs = this.splitService.initialize(this.element, splitOptions);
  }

  private destroySplit() {
    if (this.splitjs !== undefined) this.splitjs = this.splitjs.destroy();
  }

  private setSizes(sizes: number[]){
    if (this.splitjs !== undefined) this.splitjs.setSizes(sizes);
  }
}
