(function (root, Backbone, $, _) {

  // The top level widget
  var Calendar = Backbone.Widget.extend({

    dayPresenter: null,

    initialize: function () {
      this.dayPresenter = new Calendar.Presenters.DayPresenter({
        region: this.region
      });

      // Start entities module
      Calendar.CalendarEntities.start();
    },

    renderDay: function (events) {
      var _events = _.map(events, _.clone);
      this.dayPresenter.present({ events: _events });
    }
  }, {

    // Backbone.Radio channel name for this widget's events
    channel: Backbone.Radio.channel('calendar'),

    // Nested namespace as a class property
    Sort: {},
    Util: {},
    Mixin: {}
  });

  root.Calendar = Calendar;
})(this, this.Backbone, this.jQuery, this._);
