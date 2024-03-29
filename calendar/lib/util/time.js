(function (Calendar, _) {

  // Helper utility for dealing in 12 hour time format
  function Time(hours, minutes) {
    this.date = new Date('2001-01-01');
    this.date.setHours(hours || 0);
    this.date.setMinutes(minutes || 0);
  }

  _.extend(Time.prototype, {

    start: null,
    date: null,

    // http://stackoverflow.com/a/16529336/957813
    _formatTime: function () {
      var formatted;
      var hours24 = this.date.getHours();
      var hours = ((hours24 + 11) % 12) + 1;

      formatted = [
        [hours, this._addZero(this.date.getMinutes())].join(':'),
        hours24 > 11 ? 'pm' : 'am'
      ].join(' ');

      return formatted;
    },

    _addZero: function (num) {
      return (num >= 0 && num < 10) ? '0' + num : num + '';
    },

    // Return a new Time instance exactly 'minutes' in the future of this
    increment: function (minutes) {
      var date = new Date(this.date.getTime() + minutes * 60000);
      return new Time(date.getHours(), date.getMinutes());
    },

    // Return time in 'hh:mm am/pm' format
    getFormattedTime: function () {
      return this._formatTime();
    },

    // Return only 'hh:mm'
    getHoursMinutes: function () {
      var timeFormatted = this._formatTime();
      return timeFormatted.slice(0, timeFormatted.length - 3);
    },

    // Return only 'am/pm'
    getAmPm: function () {
      var timeFormatted = this._formatTime();
      return timeFormatted.slice(timeFormatted.length - 2);
    },

    // Return millisecond representation (useful for comparisons)
    getMillis: function () {
      return this.date.getTime();
    },

    getMinutes: function () {
      return this.date.getMinutes();
    },

    getHours: function () {
      return this.date.getHours();
    },

    getSeconds: function () {
      return this.date.getSeconds();
    }
  });

  Calendar.Util.Time = Time;
})(this.Calendar, this._);
