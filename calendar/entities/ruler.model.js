(function (Backbone, Calendar, _) {

  // Given a start and end time, this model generates 12-hour (am/pm) time labels at
  // a specified increment
  var RulerModel = Backbone.Model.extend({

    defaults: {
      // Start hour in 24-hour format
      start: null,

      // End hour in 24-hour format
      end: null,

      // Increment for times in minutes
      increment: 30,

      // Height of frame this ruler should measure.
      // (Start/end time will show slightly outside of frame, just as in a physical ruler)
      baseHeight: 720,

      // calculated
      times: null,
      height: null,
      timeHeight: null
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

      // The array of times
      var times = this.calculateTimes();

      // Extra calculations to draw a picture perfect ruler no matter the baseHeight
      // or increment settings.  Really, try changing increment to 15, 45, or 60 :)
      var baseTimeHeight = data.baseHeight / times.length;
      var height = data.baseHeight + baseTimeHeight;
      var timeHeight = height / times.length;

      data.times = times;
      data.height = height;
      data.timeHeight = timeHeight;

      return data;
    }
  });

  Calendar.Entities.RulerModel = RulerModel;
})(this.Backbone, this.Calendar, this._);
