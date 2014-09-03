(function (Calendar, _) {

  // A proper set of models sharing the same column width
  function Group() {
    this.models = {};
    this.numCols = 0;
  }

  _.extend(Group.prototype, {

    models: null,
    numCols: null,

    // Batch process models, setting column width
    process: function () {
      _.each(this.models, function (model) {
        model.setNumCols(this.numCols);
      }, this);
    },

    // Add model, accumulating the column width value
    addModel: function (model) {
      this.numCols = Math.max(this.numCols, model.getCol());
      this.models[model.cid] = model;
    },

    // Merge in a second group (currently unused)
    merge: function (group) {
      _.each(group.models, function (model) {
        this.addModel(model);
      }, this);
    }
  });

  Calendar.Sort.Group = Group;
})(this.Calendar, this._);
