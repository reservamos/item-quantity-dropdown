/* global jQuery */

// plugin styles
import 'style.scss';

(function ($) {
  const defaults = {
    items: [
      { id: 'item1', description: 'Item 1', defaultCount: 1 },
      { id: 'item2', description: 'Item 2', defaultCount: 0 },
      { id: 'item3', description: 'Item 3', defaultCount: 0 }
    ]
  };

  let itemCount = {};

  function createItem (item) {
    itemCount[item.id] = item.defaultCount;

    const $description = $('<div />').html(item.description);
    const $controls = $('<div />');
    const $decrementButton = $('<button>-</button>');
    const $incrementButton = $('<button>+</button>');
    const $countDisplay = $(`<span>${item.defaultCount}</span>`);
    const $item = $('<li />');

    $controls.append($decrementButton, $countDisplay, $incrementButton);
    $item.append($description, $controls);

    $item.click((event) => event.stopPropagation());
    $decrementButton.click((event) => {
      event.stopPropagation();
      decrement(item.id, $countDisplay);
    });
    $incrementButton.click((event) => {
      event.stopPropagation();
      increment(item.id, $countDisplay);
    });

    return $item;
  }

  function increment (id, $countDisplay) {
    itemCount[id]++;
    $countDisplay.html(itemCount[id]);
  }

  function decrement (id, $countDisplay) {
    if (itemCount[id] > 0) {
      itemCount[id]--;
      $countDisplay.html(itemCount[id]);
    }
  }

  $.fn.iqDropdown = function (options) {
    const $container = this.children().first();
    const $selection = this.find('.iqdropdown-selection');
    const $menu = $('<ul />').addClass('iqdropdown-menu').appendTo($container);
    const settings = $.extend({}, defaults, options);

    settings.items.forEach(item => createItem(item).appendTo($menu));
    this.click(() => $menu.toggleClass('show-menu'));

    return this;
  };
}(jQuery));
