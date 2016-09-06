# item-quantity-dropdown jQuery plugin
Dropdown menu to select items with quantities

![Demo](https://raw.githubusercontent.com/reserbus/item-quantity-dropdown/master/test/demo.gif)

## Dependencies:
- jquery: ^3.0.0

## Installation
### Direct Download
- Download the script [here](https://github.com/reserbus/item-quantity-dropdown/blob/master/lib/item-quantity-dropdown.min.js) and include it as shown below
- Download the stylesheet [here](https://github.com/reserbus/item-quantity-dropdown/blob/master/lib/item-quantity-dropdown.min.css) and include it as shown below
```html
<html>
  <head>
    ···
    <link href="/path/to/item-quantity-dropdown.min.css" rel="stylesheet">
  </head>
  <body>
    ···
    <script src="/path/to/item-quantity-dropdown.min.js"></script>
  </body>
</html>
```

### NPM + Bower
```shell
npm install item-quantity-dropdown --save-dev
# or
bower install item-quantity-dropdown --save
```

Then import/require it:
```javascript
import 'item-quantity-dropdown';
import 'item-quantity-dropdown/lib/item-quantity-dropdown.css';
require('item-quantity-dropdown');
require('item-quantity-dropdown/lib/item-quantity-dropdown.css');
```

## Usage
- In Markup:
```html
<div class="iqdropdown">
  <p class="iqdropdown-description">Select Passengers</p>
  <p class="iqdropdown-selection"></p>
  <ul class="iqdropdown-menu">
    <li data-id="item1" data-defaultcount=1>
      <div>Item One</div>
    </li>
    <li data-id="item2" data-defaultcount=0>
      <div>Item Two</div>
    </li>
    <li data-id="item3" data-defaultcount=0>
      <div>Item Three</div>
    </li>
  </ul>
</div>
```

- In Javascript:
```javascript
$(document).ready(function () {
  $('.iqdropdown').iqDropdown({ [options] });
});
```

### Config options:

## Item specific using data attributes
```html
<li data-id="item1" data-defaultcount="0" data-mincount="0" data-maxcount="1">
  ···
</li>
```

## Globals on initialization
```javascript
{
  // max total items
  maxItems: Infinity,
  // min total items
  minItems: 0,
  // text to show on the dropdown
  selectionText: 'item',
  // text to show for multiple items
  textPlural: '',
  // buttons to increment/decrement
  controls: {
    position: 'right',
    incrementText: '+',
    decrementText: '-',
    displayCls: 'iqdropdown-item-display',
    controlsCls: 'iqdropdown-item-controls',
    counterCls: 'counter'
  },
  // fires when an item quantity changes
  onChange: function (id, count, totalItems) {},
  // return false to prevent an item decrement
  beforeDecrement: function (id, itemCount) {},
  // return false to prevent an item increment
  beforeIncrement: function (id, itemCount) {}
}
```

### Demo
A demo is included [here](https://github.com/reserbus/item-quantity-dropdown/blob/master/lib/index.html)

## Contributing

### Running
```shell
# install dependencies
npm i
# start the project
npm start
```

Now open up [http://localhost:8080](http://localhost:8080)

### Build
```shell
# install dependencies
npm i
# development build
npm run build
# production build
NODE_ENV=production npm run build
```

Development build outputs the following files:
- item-quantity-dropdown.js
- item-quantity-dropdown.css

Production build outputs the following (minified) files:
- item-quantity-dropdown.min.js
- item-quantity-dropdown.min.css
