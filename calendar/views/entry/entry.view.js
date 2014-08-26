(function (Backbone, Calendar) {

  var EntryView = Backbone.View.extend({

    // Precompile template on script load
    template: _.template($('#entry-view').html())
  });

  Calendar.Views.EntryView = EntryView;
})(Backbone, Calendar);
