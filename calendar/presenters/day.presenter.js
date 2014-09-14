(function (Backbone, Calendar, $, _) {

  // Maintain an EventCollection, bind to a DayView, and show
  var DayPresenter = Backbone.Presenter.extend({

    // Current view, if one exists
    dayView: null,

    // Present the day of events, only re-rendering if necessary
    onPresent: function (options) {
      var events = (options || {}).events;
      var eventsCollection = Calendar.channel.request('events');

      // Successive presentations avoid re-rendering view
      if (!this.dayView) {
        this.dayView = new Calendar.Views.DayView({
          eventsCollection: eventsCollection
        });
      }

      // If view is already shown, collection reset will trigger re-render
      eventsCollection.once('invalid', this.onInvalid);
      eventsCollection.reset(events, { validate: true });

      // No effect if already showing
      this.show(this.dayView);
    },

    // Warn on skipped models (of course, production app would not use console)
    onInvalid: function (events, reason, badEvent) {
      Calendar.channel.trigger('user:error', 'Invalid model, skipping. ' + reason);
    }
  });

  Calendar.Presenters.DayPresenter = DayPresenter;
})(this.Backbone, this.Calendar, this.jQuery, this._);
