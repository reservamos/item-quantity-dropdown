/* global jQuery */

// plugin styles
import 'style.scss';

(function ($) {
  $.fn.iqDropdown = function () {
    this.click(() => {
      const $button = this.find('.iqdropdown-selection');
      const $menu = this.find('.iqdropdown-menu');

      $menu.toggleClass('show-menu');
      $menu.children('li').click(function () {
        $menu.removeClass('show-menu');
        $button.html($(this).html());
      });
    });

    return this;
  };
}(jQuery));
