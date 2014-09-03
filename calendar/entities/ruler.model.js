(function (Backbone, Calendar, _) {

  // Given a start and end time, this model generates time indices with
  // 12-hour formatted time, whether a whole hour tick, and am/pm.
  var RulerModel = Backbone.Model.extend({

    defaults: {
      // start hour in 24-hour format
      start: null,

      // end hour in 24-hour format
      end: null,

      // increment for indices in minutes
      increment: 30,

      // calculated
      times: null,
      tickHeight: null
    },

    // Generate view-usable time index data
    calculateTimes: function () {
      var time = new Calendar.Util.Time(this.get('start'));
      var endTime = new Calendar.Util.Time(this.get('end'));
      var times = [];
      var timeData;

      // Assemble array of pure Time instances
      while (time.getMillis() <= endTime.getMillis()) {
        times.push(time);
        time = time.increment(this.get('increment'));
      }

      // Map time instances to usable model data
      timeData = _.map(times, function (time) {
        return {
          timeStr: time.getHoursMinutes(),
          majorTick: time.getMinutes() === 0,
          amPm: time.getAmPm()
        };
      });

      return timeData;
    },

    // Embed calculated data in output to views
    toJSON: function () {
      var data = RulerModel.__super__.toJSON.apply(this, arguments);
      var times = this.calculateTimes();

      data.times = times;
      data.tickHeight = 1 / times.length * 100 + '%';

      return data;
    }
  });

  Calendar.Entities.RulerModel = RulerModel;
})(this.Backbone, this.Calendar, this._);
