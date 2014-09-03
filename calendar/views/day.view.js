(function (Backbone, Calendar, $, _) {

  var DayView = Backbone.View.extend({

    // Precompile template on script load
    template: _.template($('#day-view').html()),

    // Collection of events
    eventsCollection: null,

    // Child view containers
    eventsContainer: '.js-events',
    rulerContainer: '.js-ruler',

    // Child views
    eventsView: null,
    rulerView: null,

    initialize: function (options) {
      this.eventsCollection = (options || {}).eventsCollection;
    },

    // Render myself
    render: function () {
      var $eventsContainer;
      var $rulerContainer;

      // Render the template
      this.$el.html(this.template());

      // Render children into containers scoped on this view
      $eventsContainer = this.$(this.eventsContainer);
      $rulerContainer = this.$(this.rulerContainer);
      this.renderEvents($eventsContainer);
      this.renderRuler($rulerContainer);

      return this;
    },

    // Render child view
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

    renderRuler: function ($rulerContainer) {
      if (this.rulerView) this.rulerView.remove();
      this.rulerView = new Calendar.Views.RulerView();
      $rulerContainer.append(this.rulerView.render().$el);
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
