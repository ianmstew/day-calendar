(function (Calendar, _) {
  /* jshint maxparams: 6 */

  // Algorithm that meets the following requirements, to the very best of my interpretation:
  // 1. No events may visually overlap.
  // 2. If two events collide in time, they must have the same width.
  // 3. An event should utilize the maximum width available, but constraint 2) takes precedence
  //    over this constraint.
  //
  // This algorithm modifies in place 'col' and 'numCols' on the event models passed in.
  // Approach:
  // 1. Begin with list of models sorted by start time, which simplifies intersection comparisons
  // 2. Interate through list of models, pushing any that overlap into the next column
  //    - While iterating, group models into sets who share the same number of columns,
  //      by virtue of adjacency.
  //    - Permit cascading adjacency, such that intermediary columns have a transitive effect.
  // 4. Repeat for the next column
  function Sorter(models) {
    this.models = models;
    this.groups = new Calendar.Sort.Groups();
  }

  _.extend(Sorter.prototype, {

    models: null,
    groups: null,

    // Arrange models into columns and saves column data on each model. Assumes models are
    // pre-ordered by start time.
    columnSort: function () {
      var cols = [];

      // groupId is used internally by the sort algorithm, therefore there is no need to store
      // on the actual Backbone model
      var _models = _.map(this.models, function (model) {
        return { groupId: null, model: model };
      });

      var t = Date.now();
      var t2;

      this.groups.reset();
      this._sortColumn(_models, cols);
      this.groups.process();

      t2 = Date.now();
      console.log('Sorted ' + _models.length + ' events in ' + (t2 - t) + ' ms');

      return cols;
    },

    // Adds next to curr's group. Groups are sets of models that will inherit the same
    // column width
    _addToMyGroup: function (curr, next) {
      var groupId = curr.groupId;

      if (!groupId) {

        // curr doesn't have a group id, so generate one
        groupId = _.uniqueId('group_');
        curr.groupId = groupId;
        this.groups.addModel(curr.model, groupId);
      }

      if (next.groupId && next.groupId !== groupId) {

        // Next already has a group id, so perform a merge. This, however, should not be
        // necessary.
        console.warn('Merging should not be necessary.');
        this.groups.merge(groupId, next.groupId);
      } else {

        // Add next into curr's group
        this.groups.addModel(next.model, groupId);
        next.groupId = groupId;
      }
    },

    // Starting with all the models, recursively weed out those that don't fit into the
    // current column by pushing to the next column. In the meanwhile, bin overlapping
    // models into groups for efficient post-processing.
    //
    // Note: While there are three 'for' loops involved, the algorithm behaves like an
    // inchworm and avoids making unnecesary comparisons. The algorithm is a single pass
    // and overlap binning occurs inline.
    //
    // 'models' are the set of grouped models remaining to be binned
    // 'cols' is a 2-dimensional array of models binned by column
    _sortColumn: function (models, cols) {
      var colCount = cols.length + 1;
      var currCol = [];
      var nextCol = [];
      var curr = models[0];

      // Seed the column with the trivial case
      curr.model.setCol(colCount);
      currCol.push(curr);

      // Compare a pivot (a model that fits in the current column) against those that follow.
      for (var i = 0; i < models.length - 1; i++) {
        curr = models[i];

        // I didn't fit into the current column, therefore I am not a pivot
        if (!curr) continue;

        this._scanFollowing(curr, models, i + 1, colCount, currCol, nextCol);
      }

      // Add this column to the columns array, then recurse of any models remain
      cols.push(currCol);
      if (nextCol.length) this._sortColumn(nextCol, cols);
    },

    // Scan 'curr' against following models, but only while following models intersect
    _scanFollowing: function (curr, models, start, colCount, currCol, nextCol) {
      var next;

      // Only compare against the models that come after me
      for (var i = start; i < models.length; i++) {
        next = models[i];

        // Simple comparison is possible because column in sorted by start time
        if (curr.model.intersectsFollowing(next.model)) {

          // Next can't fit in the current column, so push to the next
          next.model.setCol(colCount + 1);
          this._addToMyGroup(curr, next);
          nextCol.push(next);
          models[i] = null;

          // Since 'next' was just promoted to the next column, make sure to test against
          // the rest of this column while we're here
          this._scanRemainder(next, models, i + 1);
        } else {

          next.model.setCol(colCount);
          currCol.push(next);

          // Next can fit in the current column; pivot on this model
          break;
        }
      }
    },

    // Scan 'next' against remainder of models array, starting with index 'start', but only
    // while remaining models intersect
    _scanRemainder: function (next, models, start) {
      var afterNext;

      for (var i = start; i < models.length; i++) {
        afterNext = models[i];

        if (next.model.intersectsFollowing(afterNext.model)) {
          this._addToMyGroup(next, afterNext);
        } else {
          // Given sorted order, if 'afterNext' does not intersect, neither do any after it
          break;
        }
      }
    }
  });

  Calendar.Sort.Sorter = Sorter;
})(this.Calendar, this._);
