(function (Backbone, Calendar) {

  var EventModel = Backbone.Model.extend({

    defaults: {
      start: null,
      end: null,

      // Computed properties
      col: null,
      numCols: 2
    },

    validate: function (attrs) {
      if (attrs.end === attrs.start) {
        return 'Events may not be zero width in time.';
      }
      if (attrs.end < attrs.start) {
        return 'Events may not end before they begin.';
      }
    },

    toString: function () {
      return this.get('start') + ':' + this.get('end');
    }
  });

  Calendar.Entities.EventModel = EventModel;
})(Backbone, Calendar);
