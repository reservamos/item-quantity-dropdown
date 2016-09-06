/* global jQuery */

// plugin styles
import 'style.scss';

(function ($) {
  let itemCount;
  let totalItems;
  let settings;

  const defaults = {
    maxItems: Infinity,
    minItems: 0,
    selectionText: 'item',
    textPlural: '',
    controls: {
      position: 'right',
      incrementText: '+',
      decrementText: '-',
      displayCls: 'iqdropdown-item-display',
      controlsCls: 'iqdropdown-item-controls',
      counterCls: 'counter'
    },
    items: {},
    onChange: () => {},
    beforeDecrement: () => true,
    beforeIncrement: () => true
  };

  const setItemSettings = (id, $item) => {
    const minCount = parseInt($item.data('mincount'), 10);
    const maxCount = parseInt($item.data('maxcount'), 10);

    settings.items[id] = {
      minCount: isNaN(minCount) ? 0 : minCount,
      maxCount: isNaN(maxCount) ? Infinity : maxCount
    };
  };

  const addControls = (id, $item, updateDisplay) => {
    const $controls = $('<div />').addClass(settings.controls.controlsCls);
    const $decrementButton = $(`<button>${settings.controls.decrementText}</button>`);
    const $incrementButton = $(`<button>${settings.controls.incrementText}</button>`);
    const $counter = $(`<span>${itemCount[id]}</span>`).addClass(settings.controls.counterCls);

    $item.children('div').addClass(settings.controls.displayCls);
    $controls.append($decrementButton, $counter, $incrementButton);

    if (settings.controls.position === 'right') {
      $item.append($controls);
    } else {
      $item.prepend($controls);
    }

    $decrementButton.click(event => {
      const { items, minItems, beforeDecrement, onChange } = settings;
      const allowClick = beforeDecrement(id, itemCount);
      if (allowClick && totalItems > minItems && itemCount[id] > items[id].minCount) {
        itemCount[id]--;
        totalItems--;
        $counter.html(itemCount[id]);
        updateDisplay();
        onChange(id, itemCount[id], totalItems);
      }
      event.preventDefault();
    });

    $incrementButton.click(event => {
      const { items, maxItems, beforeIncrement, onChange } = settings;
      const allowClick = beforeIncrement(id, itemCount);
      if (allowClick && totalItems < maxItems && itemCount[id] < items[id].maxCount) {
        itemCount[id]++;
        totalItems++;
        $counter.html(itemCount[id]);
        updateDisplay();
        onChange(id, itemCount[id], totalItems);
      }
      event.preventDefault();
    });

    $item.click(event => event.stopPropagation());

    return $item;
  };

  $.fn.iqDropdown = function (options) {
    const $selection = this.find('p').last();
    const $menu = this.find('ul');
    const $items = $menu.find('li');
    const updateDisplay = () => {
      const usePlural = totalItems !== 1 && settings.textPlural.length > 0;
      const text = usePlural ? settings.textPlural : settings.selectionText;
      $selection.html(`${totalItems} ${text}`);
    };

    itemCount = {};
    totalItems = 0;
    settings = $.extend(true, {}, defaults, options);

    this.click(() => {
      $selection.toggleClass('menu-open');
      $menu.toggleClass('show-menu');
    });

    $items.each(function () {
      const $item = $(this);
      const id = $item.data('id');
      const defaultCount = parseInt($item.data('defaultcount') || '0', 10);

      itemCount[id] = defaultCount;
      totalItems += defaultCount;
      setItemSettings(id, $item);
      addControls(id, $item, updateDisplay);
    });

    updateDisplay();

    return this;
  };
}(jQuery));
