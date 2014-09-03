(function (Backbone, Calendar, _) {

  var RulerModel = Backbone.Model.extend({

    defaults: {
      start: null,
      end: null,
      increment: 30,

      // calculated
      times: null,
      tickHeight: null
    },

    calculateTimes: function () {
      var time = new Calendar.Util.Time(this.get('start'));
      var endTime = new Calendar.Util.Time(this.get('end'));
      var times = [];
      var timeData;

      while (time.getMillis() <= endTime.getMillis()) {
        times.push(time);
        time = time.increment(this.get('increment'));
      }

      timeData = _.map(times, function (time) {
        return {
          timeStr: time.getHoursMinutes(),
          majorTick: time.getMinutes() === 0,
          amPm: time.getAmPm()
        };
      });

      return timeData;
    },

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
