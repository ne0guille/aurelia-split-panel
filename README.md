Simply aurelia custom attribute to split screen using https://github.com/nathancahill/Split.js

**demo**
http://aurelia-split-panel.azurewebsites.net/

**Installation**

`npm install aurelia-split-panel --save`

**Plugin Setup**
`aurelia.use.plugin(PLATFORM.moduleName('aurelia-split-panel'));`

**add style in webpack**
`'aurelia-split-panel/dist/aurelia-split-panel.css'`

**Usage**
split-panel custom attribute needs to be placed on the parent of the panels to be splitted.
Panels must specify an Id.

If the parent doesnt't have a height and the clientHeight is also 0, it will take the childrens panel height;
``` 
<div split-panel style="height: 200px">
    <div id="panel1">
      <p>test</p>
      <a>test</a>
      <a>test</a>
    </div>
    <div id="panel2">
      <p>test</p>
      <a>test</a>
      <a>test</a>
    </div>
  </div>
  ```

  **Options**
  https://nathancahill.github.io/Split.js/
```
  sizes: Array<number>; Initial sizes of each element in percents.
  minSize: Array<number> | number = 100; Minimum size of each element in pixels.
  gutterSize: number = 10; Gutter size in pixels.
  vertical: boolean = false; Direction to split: horizontal or vertical.
  initialize: boolean = true; The split its initialize by default when the element is attached. 
```

``` 
<div split-panel="sizes: [40, 60]; minSize: 200; gutterSize: 5; vertical: true; initialize: false ">
    <div id="panel1">
      <p>test</p>
      <a>test</a>
      <a>test</a>
    </div>
    <div id="panel2">
      <p>test</p>
      <a>test</a>
      <a>test</a>
    </div>
  </div>
  ```
  
  **SplitService**
  You can trigger programatically the following methods using the SplitService class.
  ```
  create(options: SplitOptions): void;
  setSizes(sizes: number[]): void;
  destroy(): void;
  ```

  **Dependencies**
  "split.js": https://nathancahill.github.io/Split.js/
