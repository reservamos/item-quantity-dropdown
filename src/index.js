/* global jQuery */

// plugin styles
import 'style.scss';

(function ($) {
  const defaults = {
    maxItems: Infinity,
    minItems: 0,
    items: [
      { id: 'item1', description: 'Item 1', defaultCount: 1 },
      { id: 'item2', description: 'Item 2', defaultCount: 0 },
      { id: 'item3', description: 'Item 3', defaultCount: 0 }
    ]
  };
  let itemCount = {};
  let totalItems = 0;
  let settings;

  function createItem (item) {
    const $description = $('<div />').html(item.description);
    const $controls = $('<div />');
    const $decrementButton = $('<button>-</button>');
    const $incrementButton = $('<button>+</button>');
    const $countDisplay = $(`<span>${item.defaultCount}</span>`);
    const $item = $('<li />');

    $controls.append($decrementButton, $countDisplay, $incrementButton);
    $item.append($description, $controls);

    $decrementButton.click((event) => decrement(item.id, $countDisplay));
    $incrementButton.click((event) => increment(item.id, $countDisplay));
    $item.click((event) => event.stopPropagation());

    return $item;
  }

  function increment (id, $countDisplay) {
    let count = itemCount[id];

    if (totalItems < settings.maxItems) {
      count++;
      totalItems++;
    }

    itemCount[id] = count;
    $countDisplay.html(count);
  }

  function decrement (id, $countDisplay) {
    let count = itemCount[id];

    if (totalItems > settings.minItems && count > 0) {
      count--;
      totalItems--;
    }

    itemCount[id] = count;
    $countDisplay.html(count);
  }

  $.fn.iqDropdown = function (options) {
    const $container = this.children().first();
    const $selection = this.find('.iqdropdown-selection');
    const $menu = $('<ul />').addClass('iqdropdown-menu').appendTo($container);

    this.click(() => $menu.toggleClass('show-menu'));
    settings = $.extend({}, defaults, options);

    settings.items.forEach(item => {
      itemCount[item.id] = item.defaultCount;
      totalItems += item.defaultCount;
      createItem(item).appendTo($menu);
    });

    return this;
  };
}(jQuery));
