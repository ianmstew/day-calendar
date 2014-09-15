(function (Backbone, Calendar, _) {

  var EventModel = Backbone.Model.extend({

    // Computed properties, stored outside of model attributes for performance
    // (avoids costly Backbone event logic while inside the sort algorithm)
    _col: null,
    _numCols: null,

    defaults: {
      start: 0,
      end: 0,
      title: 'No Title',
      location: 'No Location'
    },

    initialize: function () {
      this._col = 0;
      this._numCols = 1;
    },

    // Sanitize data and permit defaults to go into effect for empty strings
    parse: function (data) {
      data.title = data.title || undefined;
      data.location = data.location || undefined;
      data.start = parseInt(data.start) || undefined;
      data.end = parseInt(data.end) || undefined;
      return data;
    },

    setCol: function (col) {
      this._col = col;
    },

    setNumCols: function (numCols) {
      this._numCols = numCols;
    },

    getCol: function () {
      return this._col;
    },

    getNumCols: function () {
      return this._numCols;
    },

    // Assumes following.start >= this.start
    intersectsFollowing: function (following) {
      return this.get('end') >= following.get('start');
    },

    // Sanity check data
    validate: function (attrs) {
      var error;

      if (attrs.start < 0) {
        error = 'Events may not start earlier than 9:00am';
      }
      else if (attrs.end > 720) {
        error = 'Events may not end after 9:00pm';
      }
      else if (attrs.end === attrs.start) {
        error = 'Events may not be zero width in time';
      }
      else if (attrs.end < attrs.start) {
        error = 'Events may not end before they begin';
      }

      if (error) return error + ': ' + '[' + attrs.start + ', ' + attrs.end + ']';
    },

    // Inline computed properties for the view
    toJSON: function () {
      var data = EventModel.__super__.toJSON.apply(this, arguments);
      _.extend(data, {
        col: this.getCol(),
        numCols: this.getNumCols()
      });
      return data;
    },

    toString: function () {
      return this.get('start') + ':' + this.get('end');
    }
  });

  Calendar.Entities.EventModel = EventModel;
})(this.Backbone, this.Calendar, this._);
