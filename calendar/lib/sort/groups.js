(function (Calendar, _) {

  // A set of groups stored by groupId.
  function Groups() {
    this.reset();
  }

  _.extend(Groups.prototype, {

    groups: null,

    // Batch process all groups
    process: function () {
      _.invoke(this.groups, 'process');
    },

    reset: function () {
      this.groups = {};
    },

    // Add model using a particular groupId
    addModel: function (model, groupId) {
      var group = this.groups[groupId] || (this.groups[groupId] = new Calendar.Sort.Group());
      group.addModel(model);
    },

    // Permits a merge operation between groups (currently nused)
    merge: function (groupId, groupId2) {
      var mergeGroup = this.groups[groupId2];
      if (mergeGroup) {
        this.groups[groupId].merge(mergeGroup);
        delete this.groups[groupId2];
      }
    }
  });

  Calendar.Sort.Groups = Groups;
})(this.Calendar, this._);
