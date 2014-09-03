(function (Backbone, Calendar, $, _) {

  // Simple static view. Time index logic is within the model.
  var RulerView = Backbone.View.extend({

    // Precompile template on script load
    template: _.template($('#ruler-view').html()),

    className: 'ruler',

    initialize: function () {
      this.model = new Calendar.Entities.RulerModel({
        start: 9,
        end: 21
      });
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

  Calendar.Views.RulerView = RulerView;
})(this.Backbone, this.Calendar, this.jQuery, this._);
