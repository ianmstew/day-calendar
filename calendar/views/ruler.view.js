(function (Backbone, Calendar, $, _) {

  // Simple static view. Time index logic is within the model.
  var RulerView = Backbone.View.extend({

    // Precompile template on script load
    template: _.template($('#ruler-view').html()),

    className: 'ruler',

    initialize: function () {
      this.model = Calendar.channel.request('ruler');
      this.model.set({
        start: 9,
        end: 21
      });
      this.model.on('change', this.render.bind(this));
    },

    render: function () {
      var data = this.model.toJSON();

      // Scale and position the ruler like a physical ruler--time labels should "straddle"
      // the exact time mark
      this.$el.css({
        height: data.height + 'px',
        marginTop: -data.timeHeight / 2 + 'px'
      });

      this.$el.html(this.template(data));
      return this;
    }
  });

  Calendar.Views.RulerView = RulerView;
})(this.Backbone, this.Calendar, this.jQuery, this._);
