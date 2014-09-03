(function (Backbone, Calendar, _) {

  var EventModel = Backbone.Model.extend({

    // Computed properties, stored outside of model attributes for performance
    // (avoids costly Backbone event logic while inside the sort algorithm)
    _col: null,
    _numCols: null,

    defaults: {
      start: null,
      end: null,
      title: 'Sample Item',
      location: 'Sample Location'
    },

    initialize: function () {
      this._col = 0;
      this._numCols = 1;
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
      if (attrs.end === attrs.start) {
        return 'Events may not be zero width in time: ' +
            '[' + attrs.start + ', ' + attrs.end + ']';
      }
      if (attrs.end < attrs.start) {
        return 'Events may not end before they begin: ' +
            '[' + attrs.start + ', ' + attrs.end + ']';
      }
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
