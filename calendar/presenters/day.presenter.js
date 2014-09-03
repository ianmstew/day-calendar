(function (Backbone, Calendar, $, _) {

  // Maintain an EventCollection, bind to a DayView, and show
  var DayPresenter = Backbone.Presenter.extend({

    // Current view, if one exists
    dayView: null,

    // Collection of events
    eventsCollection: null,

    initialize: function () {
      this.eventsCollection = new Calendar.Entities.EventsCollection();
    },

    // Present the day of events, only re-rendering if necessary
    onPresent: function (options) {
      var events = (options || {}).events;

      // Successive presentations avoid re-rendering view
      if (!this.dayView) {
        this.dayView = new Calendar.Views.DayView({
          eventsCollection: this.eventsCollection
        });
      }

      // If view is already shown, collection reset will trigger re-render
      this.eventsCollection.off('invalid', this.onInvalid);
      this.eventsCollection.on('invalid', this.onInvalid);
      this.eventsCollection.reset(events, { validate: true });

      // No effect if already showing
      this.show(this.dayView);
    },

    // Warn on skipped models (of course, production app would not use console)
    onInvalid: function (events, reason, badEvent) {
      console.warn('Invalid model, skipping. ' + reason);
    }
  });

  Calendar.Presenters.DayPresenter = DayPresenter;
})(this.Backbone, this.Calendar, this.jQuery, this._);
