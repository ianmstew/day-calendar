(function (Backbone, Calendar, _) {

  // Given a start and end time, this model generates 12-hour (am/pm) time labels at
  // a specified increment
  var RulerModel = Backbone.Model.extend({

    defaults: {
      // start hour in 24-hour format
      start: null,

      // end hour in 24-hour format
      end: null,

      // increment for times in minutes
      increment: 30,

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
      var times = this.calculateTimes();
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
