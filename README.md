# item-quantity-dropdown jQuery plugin

Dropdown menu to select items with quantities

![Demo](https://raw.githubusercontent.com/reservamos/item-quantity-dropdown/master/test/demo.gif)

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

### Yarn + Bower

```shell
yarn add item-quantity-dropdown
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

### Markup

```html
<div class="iqdropdown">
  <p class="iqdropdown-selection"></p>
  <div class="iqdropdown-menu">
    <div class="iqdropdown-menu-option" data-id="item1">
      <div>
        <p class="iqdropdown-item">Item 1</p>
        <p class="iqdropdown-description">A short description</p>
      </div>
    </div>
    <div class="iqdropdown-menu-option" data-id="item2">
      <div>
        <p class="iqdropdown-item">Item 2</p>
        <p class="iqdropdown-description">A short description</p>
      </div>
    </div>
    <div class="iqdropdown-menu-option" data-id="item3">
      <div>
        <p class="iqdropdown-item">Item 3</p>
        <p class="iqdropdown-description">A short description</p>
      </div>
    </div>
  </div>
</div>
```

### JavaScript

```javascript
$(document).ready(() => {
  $('.iqdropdown').iqDropdown({ [options] });
});
```

### Config options

#### Dropdown options using data attributes

```html
<div class="iqdropdown">
  <p class="iqdropdown-selection" data-seletion-text="item" data-text-plural="items"></p>
  <div class="iqdropdown-menu">
    ...
  </div>
</div>
```

#### Item specific using data attributes

```html
<li data-id="item1" data-defaultcount="0" data-mincount="0" data-maxcount="1">
  ···
</li>
```

#### Globals on initialization

```javascript
{
  // max total items
  maxItems: Infinity,
  // min total items
  minItems: 0,
  // text to show on the dropdown override data-selection-text attribute
  selectionText: 'item',
  // text to show for multiple items
  textPlural: 'items',
  // optionally can use setSelectionText function to override selectionText
  setSelectionText: (itemCount, totalItems) => { /* return string */ },
  // buttons to increment/decrement
  controls: {
    position: 'right',
    displayCls: 'iqdropdown-item-display',
    controlsCls: 'iqdropdown-item-controls',
    counterCls: 'counter'
  },
  // fires when an item quantity changes
  onChange: (id, count, totalItems) => {},
  // return false to prevent an item decrement
  beforeDecrement: (id, itemCount) => {},
  // return false to prevent an item increment
  beforeIncrement: (id, itemCount) => {}
}
```

#### Selection text

Default value.

```javascript
`${totalItems} item` // if total items is 1
`${totalItems} items` // if total items is not 1
```

Data attribute `data-selection-text` override default value.

```html
<p class="iqdropdown-selection" data-seletion-text="item" data-text-plural="items">
```

Property `selectionText` override data attribute

```javascript
options.selectionText = 'item';
options.textPlural = 'items';
```

Function `setSelectionText` override `selectionText` property.

```javascript
options.setSelectionText = function setSelectionText(itemCount, totalItems)
```

Arguments:

- *itemCount* <object> - keys - items data-id; values - items count
- *totalCount* <number> - total items count

Return selection text <string>.

### Demo

A demo is included [here](https://github.com/reserbus/item-quantity-dropdown/blob/master/lib/index.html)

## Contributing

### Running

```shell
# install dependencies
yarn
# start the project
yarn start
```

Now open up [http://localhost:8080](http://localhost:8080)

### Build

```shell
# install dependencies
yarn
# make a css and js bundle
yarn build
```

The build script outputs the following (minified) files:

- item-quantity-dropdown.min.js
- item-quantity-dropdown.min.css
