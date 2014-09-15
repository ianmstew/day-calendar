(function (Backbone, Calendar, _) {

  var EventsCollection = Backbone.Collection.extend({

    model: Calendar.Entities.EventModel,

    // Maintain the collection ordered by start time (ascending) then length (descending)
    comparator: function (event1, event2) {
      if (event1.get('start') === event2.get('start')) {
        return event1.get('end') > event2.get('end') ? -1
            : event1.get('end') < event2.get('end') ? 1 : 0;
      } else {
        return event1.get('start') < event2.get('start') ? -1 : 1;
      }
    },

    // Arrange models into columns and save column data on each model
    columnSort: function () {
      var sorter = new Calendar.Sort.Sorter(this.models);
      sorter.columnSort();
    }
  });

  Calendar.Entities.EventsCollection = EventsCollection;
})(this.Backbone, this.Calendar, this._);
