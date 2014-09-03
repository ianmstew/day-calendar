(function (root, Calendar) {

  // Singleton Calendar instance
  var calendar = null;

  // Driver function
  function layOutDay(events) {
    if (!calendar) {
      calendar = new Calendar({ region: '#calendar-region' });
    }
    calendar.renderDay(events);
  }

  root.layOutDay = layOutDay;
})(this, Calendar);