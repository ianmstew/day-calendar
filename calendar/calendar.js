(function (root, Backbone, $, _) {

  var Calendar = Backbone.Widget.extend({

    dayPresenter: null,

    initialize: function () {
      this.dayPresenter = new Calendar.Presenters.DayPresenter({
        region: this.region
      });
    },

    renderDay: function (events) {
      var _events = _.map(events, _.clone);
      this.dayPresenter.present({ events: _events });
    }
  });

  root.Calendar = Calendar;
})(this, Backbone, jQuery, _);
