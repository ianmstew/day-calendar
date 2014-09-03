(function (Calendar) {

  // The sort algorithm below is my own invention, but after having thoroughly explored this
  // path I found it excessively complex and more iterative than should be necessary. Given a
  // second attempt, I would explore using an Interval Tree.
  // http://en.wikipedia.org/wiki/Interval_tree
  var sorter = {

    // Arrange models into columns and save column data on each model. Assumes models are
    // pre-ordered by start time.
    columnSort: function (models) {
      var cols = [];
      var _models = _.clone(models);

      this._sortColumn(_models, cols);
      this._countColumns(cols.length - 1, cols);

      return _models;
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
      }, { silent: true });
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
            }, { silent: true });
            currCol.push(next);
            break;
          } else {
            // Next can't fit in the current column, so push to the next
            next.set({
              col: colCount + 1,
              numCols: colCount + 1
            }, { silent: true });
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
      var currModel;
      var prevColIdx;
      var prevCol;
      var prevModel;
      var numCols;

      // Check every model in current column
      for (var i = 0; i < currCol.length; i++) {
        currModel = currCol[i];

        // Compare to each previous column
        for (prevColIdx = colIdx - 1; prevColIdx >= 0; prevColIdx--) {
          prevCol = cols[prevColIdx];

          // Check against each model within previous column
          for (var j = 0; j < prevCol.length; j++) {
            prevModel = prevCol[j];

            // I intersect with the previous column's model
            if (currModel.intersect(prevModel)) {

              // Therefore set previous column count to either my column number or column count,
              // whichever is greater.
              numCols = Math.max(currModel.get('numCols'), prevModel.get('numCols'));
              currModel.set('numCols', numCols, { silent: true });
              prevModel.set('numCols', numCols, { silent: true });
            }
          }
        }
      }

      this._countColumns(colIdx - 1, cols);
    }
  };

  Calendar.Util.sorter = sorter;
})(Calendar);
