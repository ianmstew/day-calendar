(function (Backbone, Calendar, $, _) {

  // Show errors to user
  var ErrorPresenter = Backbone.Presenter.extend({

    initialize: function () {
      this.listenTo(Calendar.channel, 'user:error', this.onUserError.bind(this));
    },

    onPresent: function () {
      console.warn('present() does nothing; use events channel');
    },

    // Implement this method to display general feedback on user error
    onUserError: function (error) {
      var alertModel = new Calendar.Entities.AlertModel({
        message: error
      });
      var alertView = new Calendar.Views.AlertView({
        model: alertModel
      });
      this.show(alertView);
    }
  });

  Calendar.Presenters.ErrorPresenter = ErrorPresenter;
})(this.Backbone, this.Calendar, this.jQuery, this._);
