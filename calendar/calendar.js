(function (root, Backbone, $, _) {

  // The top level widget
  var Calendar = Backbone.Widget.extend({

    dayPresenter: null,
    errorPresenter: null,

    initialize: function (options) {
      this.dayPresenter = new Calendar.Presenters.DayPresenter({
        region: this.region
      });
      this.errorPresenter = new Calendar.Presenters.ErrorPresenter({
        region: options.alertRegion
      });

      // Start entities module
      Calendar.CalendarEntities.start();

      this.dayPresenter.present();
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
