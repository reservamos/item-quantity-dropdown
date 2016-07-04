/* global jQuery */

// plugin styles
import 'style.scss';

(function ($) {
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
    onChange: function () {}
  };
  let itemCount = {};
  let totalItems = 0;
  let settings;

  function addControls (item, id, updateDisplay) {
    const $item = $(item);
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

    $decrementButton.click((event) => {
      if (totalItems > settings.minItems && itemCount[id] > 0) {
        itemCount[id]--;
        totalItems--;
        $counter.html(itemCount[id]);
        updateDisplay();
        settings.onChange(id, itemCount[id], totalItems);
      }
      event.preventDefault();
    });

    $incrementButton.click(() => {
      if (totalItems < settings.maxItems) {
        itemCount[id]++;
        totalItems++;
        $counter.html(itemCount[id]);
        updateDisplay();
        settings.onChange(id, itemCount[id], totalItems);
      }
      event.preventDefault();
    });

    $item.click((event) => event.stopPropagation());

    return $item;
  }

  $.fn.iqDropdown = function (options) {
    const $selection = this.find('p').last();
    const $menu = this.find('ul');
    const $items = $menu.find('li');
    const updateDisplay = () => {
      const usePlural = totalItems !== 1 && settings.textPlural.length > 0;
      const text = usePlural ? settings.textPlural : settings.selectionText;
      $selection.html(`${totalItems} ${text}`);
    };

    this.click(() => $menu.toggleClass('show-menu'));
    settings = $.extend(true, {}, defaults, options);

    $items.each(function () {
      const $item = $(this);
      const id = $item.data('id');
      const defaultCount = parseInt($item.data('defaultcount'), 10);
      itemCount[id] = defaultCount;
      totalItems += defaultCount;
      addControls(this, id, updateDisplay);
    });

    updateDisplay();

    return this;
  };
}(jQuery));
