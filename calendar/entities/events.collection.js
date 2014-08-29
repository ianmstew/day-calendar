(function (Backbone, Calendar) {

  var EventsCollection = Backbone.Collection.extend({

    model: Calendar.Entities.EventModel,

    // Maintain the collection ordered by start time
    comparator: 'start',

    // Arrange models into columns and save column data on each model
    arrangeColumns: function () {
      var cols = [];
      var models = _.clone(this.models);

      console.log(_.map(models, function (model) {
        return model.toString();
      }));

      this._arrangeNextColumn(models, cols);

      console.log(_.map(cols, function (models) {
        return _.reduce(_.map(models, function (model) {
          return model.toString();
        }), function (modelStr, value) {
          return modelStr += value + ' ';
        }, ' ');
      }));

      return this;
    },

    // Starting with all the models, recursively weed out those that don't fit into the
    // current column.
    //
    // 'models' are the set of models remaining to be binned
    // 'cols' is a 2-dimensional array of models binned by column
    //
    // TODO: Store multi-dimensional hash of intersecting models and leverage for faster
    //       numCols calculation.
    _arrangeNextColumn: function (models, cols) {
      var colCount = cols.length + 1;
      var currCol = [];
      var nextCol = [];
      var curr = models[0];
      var next;

      // Seed the column with the trivial case
      curr.set('col', colCount);
      currCol.push(curr);

      // Compare a pivot (a model that fits in the current column) against those that follow.
      for (var i = 0; i < models.length - 1; i++) {
        curr = models[i];
        // I didn't fit into the current column, therefore I am not a pivot
        if (!curr) continue;

        // Only compare against the models that come after me
        for (var j = i + 1; j < models.length; j++) {
          next = models[j];

          if (curr.get('end') < next.get('start')) {
            // I can fit in the current column; pivot on this model
            next.set('col', colCount);
            currCol.push(next);
            break;
          } else {
            // I can't fit in the current column, and neither can all that follow, because this
            // list is sorted by start time.
            next.set('col', colCount + 1);
            nextCol.push(next);
            models[j] = null;
          }
        }
      }

      // Add this column to the columns array, then recurse of any models remain
      cols.push(currCol);
      if (nextCol.length) this._arrangeNextColumn(nextCol, cols);
    }
  });

  Calendar.Entities.EventsCollection = EventsCollection;
})(Backbone, Calendar);
