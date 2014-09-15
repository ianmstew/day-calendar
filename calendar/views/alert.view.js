(function (Backbone, Calendar, $, _) {

  var AlertView = Backbone.View.extend({

    // Precompile template on script load
    template: _.template($('#alert-view').html()),

    className: 'alert',

    events: {
      'click .js-remove': 'remove'
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

  Calendar.Views.AlertView = AlertView;
})(this.Backbone, this.Calendar, this.jQuery, this._);
