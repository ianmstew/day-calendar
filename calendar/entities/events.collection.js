(function (Backbone, Calendar) {

  var EventsCollection = Backbone.Collection.extend({

    model: Calendar.Entities.EventModel,

    // Maintain the collection ordered by start time
    comparator: 'start',

    // Arrange models into columns and save column data on each model
    columnSort: function () {
      Calendar.Util.sorter.columnSort(this.models);
    }
  });

  Calendar.Entities.EventsCollection = EventsCollection;
})(Backbone, Calendar);
