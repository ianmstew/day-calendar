(function (root, Calendar) {

  // Singleton Calendar instance
  var calendar = null;

  // Driver function
  function layOutDay(events) {
    calendar.renderDay(events);
  }

  function startCalendar() {
    calendar = new Calendar({
      region: '#calendar-region',
      alertRegion: '#alert-region'
    });
  }

  startCalendar();

  root.layOutDay = layOutDay;
})(this, this.Calendar);
