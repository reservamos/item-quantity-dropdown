/* global jQuery */

// plugin styles
import 'style.scss';

(function ($) {
  const defaults = {
    maxItems: Infinity,
    minItems: 0,
    selectionText: 'item',
    textPlural: '',
    items: [
      { id: 'item1', description: 'Item 1', defaultCount: 1 },
      { id: 'item2', description: 'Item 2', defaultCount: 0 },
      { id: 'item3', description: 'Item 3', defaultCount: 0 }
    ]
  };
  let itemCount = {};
  let totalItems = 0;
  let settings;

  function increment (id) {
    let count = itemCount[id];

    if (totalItems < settings.maxItems) {
      count++;
      totalItems++;
    }

    itemCount[id] = count;
  }

  function decrement (id) {
    let count = itemCount[id];

    if (totalItems > settings.minItems && count > 0) {
      count--;
      totalItems--;
    }

    itemCount[id] = count;
  }

  function createItem (item, updateDisplay) {
    const $description = $('<div />').html(item.description);
    const $controls = $('<div />');
    const $decrementButton = $('<button>-</button>');
    const $incrementButton = $('<button>+</button>');
    const $countDisplay = $(`<span>${item.defaultCount}</span>`);
    const $item = $('<li />');

    $controls.append($decrementButton, $countDisplay, $incrementButton);
    $item.append($description, $controls);

    $decrementButton.click(() => {
      decrement(item.id);
      $countDisplay.html(itemCount[item.id]);
      updateDisplay();
    });

    $incrementButton.click(() => {
      increment(item.id);
      $countDisplay.html(itemCount[item.id]);
      updateDisplay();
    });

    $item.click((event) => event.stopPropagation());

    return $item;
  }

  $.fn.iqDropdown = function (options) {
    const $container = this.children().first();
    const $selection = this.find('.iqdropdown-selection');
    const $menu = $('<ul />').addClass('iqdropdown-menu').appendTo($container);
    const updateDisplay = () => {
      const usePlural = totalItems !== 1 && settings.textPlural.length > 0;
      const text = usePlural ? settings.textPlural : settings.selectionText;
      $selection.html(`${totalItems} ${text}`);
    };

    this.click(() => $menu.toggleClass('show-menu'));
    settings = $.extend({}, defaults, options);

    settings.items.forEach(item => {
      itemCount[item.id] = item.defaultCount;
      totalItems += item.defaultCount;
      createItem(item, updateDisplay).appendTo($menu);
    });

    updateDisplay();

    return this;
  };
}(jQuery));
