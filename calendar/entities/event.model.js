(function (Backbone, Calendar) {

  var EventModel = Backbone.Model.extend({

    defaults: {
      start: null,
      end: null,

      // Computed properties
      col: null,
      numCols: null
    },

    validate: function (attrs) {
      if (attrs.end === attrs.start) {
        return 'Events may not be zero width in time: ' +
            '[' + attrs.start + ', ' + attrs.end + ']';
      }
      if (attrs.end < attrs.start) {
        return 'Events may not end before they begin: ' +
            '[' + attrs.start + ', ' + attrs.end + ']';
      }
    },

    intersect: function (model) {
      return (this.get('start') >= model.get('start') &&
              this.get('start') <= model.get('end'))
              ||
             (this.get('end') >= model.get('start') &&
              this.get('end') <= model.get('end'))
              ||
             (this.get('start') <= model.get('start') &&
              this.get('end') >= model.get('end'));
    },

    toString: function () {
      return this.get('start') + ':' + this.get('end');
    }
  });

  Calendar.Entities.EventModel = EventModel;
})(Backbone, Calendar);
