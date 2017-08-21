Simply aurelia custom attribute to split screen using https://github.com/nathancahill/Split.js

**Installation**

`npm install aurelia-split-panel --save`

**Plugin Setup**
`aurelia.use.plugin(PLATFORM.moduleName('aurelia-split-panel'));`

**add style in webpack**
`'aurelia-split-panel/dist/aurelia-split-panel.css'`

**Usage**
split-panel custom attribute needs to be placed on the parent of the panels to be splitted.
Panels must specify an Id.

``` 
<div split-panel>
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
```

``` 
<div split-panel="sizes: [40, 60]; minSize: 200; gutterSize: 5; vertical: true">
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

  **Dependencies**
  "split.js": https://nathancahill.github.io/Split.js/
