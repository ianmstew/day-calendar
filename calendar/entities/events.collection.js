(function (Backbone, Calendar) {

  var EventsCollection = Backbone.Collection.extend({

    model: Calendar.Entities.EventModel,

    // Maintain the collection ordered by start time
    comparator: 'start',

    // Arrange models into columns and save column data on each model
    columnSort: function () {
      var cols = [];
      var models = _.clone(this.models);

      console.log(_.map(models, function (model) {
        return model.toString();
      }));

      this._sortColumn(models, cols);
      this._countColumns(cols.length - 1, cols);

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
    // current column by pushing to the next column.
    //
    // 'models' are the set of models remaining to be binned
    // 'cols' is a 2-dimensional array of models binned by column
    _sortColumn: function (models, cols) {
      var colCount = cols.length + 1;
      var currCol = [];
      var nextCol = [];
      var curr = models[0];
      var next;

      // Seed the column with the trivial case
      curr.set({
        col: colCount,
        numCols: colCount
      });
      currCol.push(curr);

      // Compare a pivot (a model that fits in the current column) against those that follow.
      for (var i = 0; i < models.length - 1; i++) {
        curr = models[i];

        // I didn't fit into the current column, therefore I am not a pivot
        if (!curr) continue;

        // Only compare against the models that come after me
        for (var j = i + 1; j < models.length; j++) {
          next = models[j];

          // Simple comparison is possible because column in sorted by start time
          if (curr.get('end') < next.get('start')) {
            // Next can fit in the current column; pivot on this model
            next.set({
              col: colCount,
              numCols: colCount
            });
            currCol.push(next);
            break;
          } else {
            // Next can't fit in the current column, so push to the next
            next.set('col', colCount + 1);
            nextCol.push(next);
            models[j] = null;
          }
        }
      }

      // Add this column to the columns array, then recurse of any models remain
      cols.push(currCol);
      if (nextCol.length) this._sortColumn(nextCol, cols);
    },

    // Compare each model in the current column against all the models that come in previous
    // columns for an intersection. On intersection, bump the column count.
    _countColumns: function (colIdx, cols) {
      // Must have a prior column to perform compare
      if (colIdx < 1) return;

      var currCol = cols[colIdx];
      var currColModel;
      var prevColIdx;
      var prevCol;
      var prevColModel;
      var numCols;

      // Check every model in current column
      for (var i = 0; i < currCol.length; i++) {
        currColModel = currCol[i];

        // Compare to each previous column
        for (prevColIdx = colIdx - 1; prevColIdx >= 0; prevColIdx--) {
          prevCol = cols[prevColIdx];

          // Check against each model within previous column
          for (var j = 0; j < prevCol.length; j++) {
            prevColModel = prevCol[j];

            // I intersect with the previous column's model
            if (currColModel.intersect(prevColModel)) {

              // Therefore set previous column count to either my column number or column count,
              // whichever is greater.
              numCols = Math.max(
                  currColModel.get('col'), currColModel.get('numCols'),
                  prevColModel.get('col'), prevColModel.get('numCols'));
              currColModel.set('numCols', numCols);
              prevColModel.set('numCols', numCols);

              prevColModel.on('change:numCols', function (model, value) {
                currColModel.set('numCols', value);
              });
            }
          }
        }
      }

      this._countColumns(colIdx - 1, cols);
    }
  });

  Calendar.Entities.EventsCollection = EventsCollection;
})(Backbone, Calendar);
