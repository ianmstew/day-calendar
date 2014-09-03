(function (Backbone, Calendar, $, _) {

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

      // Successive presentations with not re-render DayView
      if (!this.dayView) {
        this.dayView = new Calendar.Views.DayView({
          eventsCollection: this.eventsCollection
        });
      }

      // If view is already shown, collection reset will trigger re-render
      this.eventsCollection.off('invalid');
      this.eventsCollection.on('invalid', this.onInvalid);
      this.eventsCollection.reset(events, { validate: true });

      // No effect if already showing
      this.show(this.dayView);
    },

    onInvalid: function (events, reason, badEvent) {
      console.warn('Invalid model, skipping. ' + reason);
    }
  });

  Calendar.Presenters.DayPresenter = DayPresenter;
})(Backbone, Calendar, jQuery, _);
