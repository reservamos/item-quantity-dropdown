# item-quantity-dropdown jQuery plugin
Dropdown menu to select items with quantities

## Dependencies:
- jquery: ^3.0.0

## Installation
### Direct Download
- Download the script [here](https://github.com/reserbus/item-quantity-dropdown/blob/master/lib/item-quantity-dropdown.min.js) and include it:
- Download the stylesheet [here](https://github.com/reserbus/item-quantity-dropdown/blob/master/lib/item-quantity-dropdown.min.css) and include it:
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

### NPM
```
npm install item-quantity-dropdown --save-dev
```

Then import/require it:
```javascript
import 'item-quantity-dropdown';
require('item-quantity-dropdown');
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
```javascript
{
    maxItems: Infinity,
    minItems: 0,
    selectionText: 'item',
    textPlural: '',
    controls: {
      position: 'right',
      displayCls: 'iqdropdown-item-display',
      controlsCls: 'iqdropdown-item-controls',
      incrementText: '+',
      decrementText: '-',
      counterCls: 'counter'
    },
    onChange: function () {}
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
