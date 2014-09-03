(function (Backbone, Calendar, _) {

  var EventsCollection = Backbone.Collection.extend({

    model: Calendar.Entities.EventModel,

    // Maintain the collection ordered by start time
    comparator: 'start',

    // Arrange models into columns and save column data on each model
    columnSort: function () {
      var sorter = new Calendar.Sort.Sorter(this.models);
      sorter.columnSort();
    }
  });

  Calendar.Entities.EventsCollection = EventsCollection;
})(this.Backbone, this.Calendar, this._);
