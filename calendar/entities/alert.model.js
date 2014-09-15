(function (Backbone, Calendar, _) {

  var AlertModel = Backbone.Model.extend({

    defaults: {
      message: null
    }
  });

  Calendar.Entities.AlertModel = AlertModel;
})(this.Backbone, this.Calendar, this._);
