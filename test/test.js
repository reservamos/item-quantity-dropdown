$(document).ready(function () {
  $(".iqdropdown").iqDropdown({
    minItems: 1,
    maxItems: 5,
    selectionText: 'passenger',
    textPlural: 'passengers',
    items: [
      { id: 'general', description: 'Adult', defaultCount: 1 },
      { id: 'minor', description: 'Minor', defaultCount: 0 },
      { id: 'infant', description: 'Infant', defaultCount: 0 }
    ],
    onChange: function (id, count, totalItems) {
      console.log(id, count, totalItems);
    }
  });
});
