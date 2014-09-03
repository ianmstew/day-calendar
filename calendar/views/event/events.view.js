(function (Backbone, Calendar, $, _) {

  var EventsView = Backbone.View.extend({

    eventViews: null,
    className: 'events',

    initialize: function (options) {
      _.bindAll(this, 'render');

      // Re-render on collection reset
      this.listenTo(this.collection, 'reset', this.render);

      this.eventViews = [];
    },

    // Render collection of views
    render: function () {
      var $eventsBuffer = $('<div></div>');
      this.collection.columnSort();

      // Clear view
      this.removeEventViews();

      // Buffer event html
      this.collection.reduce(this.bufferEvent, $eventsBuffer, this);

      // Update view
      this.$el.append($eventsBuffer.children());

      return this;
    },

    // Generate html for a single view and add to buffer
    bufferEvent: function ($eventsBuffer, event) {
      var eventView = new Calendar.Views.EventView({
        model: event
      });
      this.eventViews.push(eventView);
      return $eventsBuffer.append(eventView.render().$el);
    },

    // Cleanly remove collection of views
    removeEventViews: function () {
      _.invoke(this.eventViews, 'remove');
      this.eventViews = [];
    },

    // I have no element; remove my children
    remove: function () {
      EventsView.__super__.remove.apply(this, arguments);
      this.removeEventViews();
    }
  });

  Calendar.Views.EventsView = EventsView;
})(Backbone, Calendar, jQuery, _);
