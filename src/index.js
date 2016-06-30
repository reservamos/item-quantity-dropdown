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
      { id: 'item1', description: 'Item 1', defaultCount: 0 },
      { id: 'item2', description: 'Item 2', defaultCount: 0 },
      { id: 'item3', description: 'Item 3', defaultCount: 0 }
    ],
    onChange: function () {}
  };
  let itemCount = {};
  let totalItems = 0;
  let settings;

  function createItem (item, updateDisplay) {
    const $description = $('<div />').html(item.description);
    const $controls = $('<div />');
    const $decrementButton = $('<button>-</button>');
    const $incrementButton = $('<button>+</button>');
    const $countDisplay = $(`<span>${item.defaultCount}</span>`);
    const $item = $('<li />').addClass('iqdropdown-menu-item');

    $controls.append($decrementButton, $countDisplay, $incrementButton);
    $item.append($description, $controls);

    $decrementButton.click(() => {
      if (totalItems > settings.minItems && itemCount[item.id] > 0) {
        itemCount[item.id]--;
        totalItems--;
        $countDisplay.html(itemCount[item.id]);
        updateDisplay();
        settings.onChange(item.id, itemCount[item.id], totalItems);
      }
    });

    $incrementButton.click(() => {
      if (totalItems < settings.maxItems) {
        itemCount[item.id]++;
        totalItems++;
        $countDisplay.html(itemCount[item.id]);
        updateDisplay();
        settings.onChange(item.id, itemCount[item.id], totalItems);
      }
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
