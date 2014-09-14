(function (Backbone, Calendar, $, _) {

  var DayView = Backbone.View.extend({

    // Precompile template on script load
    template: _.template($('#day-view').html()),

    // Collection of events
    eventsCollection: null,

    // Child view containers
    eventsContainer: '.js-events',
    rulerContainer: '.js-ruler',
    formContainer: '.js-form',

    // Child views
    eventsView: null,
    rulerView: null,
    formView: null,

    initialize: function (options) {
      this.eventsCollection = (options || {}).eventsCollection;
    },

    // Render myself
    render: function () {
      // Render the template
      this.$el.html(this.template());

      // Render child views
      this.renderEvents();
      this.renderRuler();
      this.renderForm();

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
      this.$(this.eventsContainer).append(this.eventsView.render().$el);
    },

    renderRuler: function ($rulerContainer) {
      if (this.rulerView) this.rulerView.remove();
      this.rulerView = new Calendar.Views.RulerView();
      this.$(this.rulerContainer).append(this.rulerView.render().$el);
    },

    renderForm: function ($formContainer) {
      if (this.formView) this.formView.remove();
      this.formView = new Calendar.Views.FormView();
      this.$(this.formContainer).append(this.formView.render().$el);
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
