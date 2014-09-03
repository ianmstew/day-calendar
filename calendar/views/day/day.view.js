(function (Backbone, Calendar, $, _) {

  var DayView = Backbone.View.extend({

    // Precompile template on script load
    template: _.template($('#day-view').html()),

    // Collection for events
    eventsCollection: null,

    // Selector within template to render events
    eventsContainer: '.js-events',

    // Current events view, if one exists
    eventsView: null,

    initialize: function (options) {
      this.eventsCollection = (options || {}).eventsCollection;
    },

    // Render myself
    render: function () {
      var $eventsContainer;

      // Render the template
      this.$el.html(this.template());

      // Render events into container scoped on this view
      $eventsContainer = this.$(this.eventsContainer);
      this.renderEvents($eventsContainer);

      return this;
    },

    // Render children
    renderEvents: function ($eventsContainer) {
      // Prevent memory leaks in case of re-render
      if (this.eventsView) this.eventsView.remove();

      // Create child view
      this.eventsView = new Calendar.Views.EventsView({
        collection: this.eventsCollection
      });

      // Render the child view
      $eventsContainer.append(this.eventsView.render().$el);
    },

    // Remove myself first to reduce reflows, then properly remove children
    remove: function () {
      DayView.__super__.remove.apply(this, arguments);
      this.eventsView.remove();
      this.eventsView = null;
    }
  });

  Calendar.Views.DayView = DayView;
})(this.Backbone, this.Calendar, this.jQuery, this._);
