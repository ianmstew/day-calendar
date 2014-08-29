(function (Backbone, Calendar, $, _) {

  var EventView = Backbone.View.extend({

    // Precompile template on script load
    template: _.template($('#event-view').html()),

    className: 'event',

    // Render at appropriate size and position
    resetPosition: function () {
      var colWidthPercent = 1 / this.model.get('numCols') * 100;
      this.$el.css({
        top: this.model.get('start') + 'px',
        left: (this.model.get('col') - 1) * colWidthPercent + '%',
        height: this.model.get('end') - this.model.get('start') + 'px',
        width: colWidthPercent + '%'
      });
    },

    render: function () {
      this.resetPosition();
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

  Calendar.Views.EventView = EventView;
})(Backbone, Calendar, jQuery, _);
