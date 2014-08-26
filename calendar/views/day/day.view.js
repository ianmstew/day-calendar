(function (Backbone, Calendar) {

  var DayView = Backbone.View.extend({

    // Precompile template on script load
    template: _.template($('#day-view').html())
  });

  Calendar.Views.DayView = DayView;
})(Backbone, Calendar);
