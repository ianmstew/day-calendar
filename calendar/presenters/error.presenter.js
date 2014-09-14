(function (Backbone, Calendar, $, _) {

  // Show errors to user
  var ErrorPresenter = Backbone.Presenter.extend({

    initialize: function () {
      this.listenTo(Calendar.channel, 'user:error', this.onUserError.bind(this));
    },

    // Implement this method to display general feedback on user error
    onUserError: function (error) {
      console.warn(error);
    }
  });

  Calendar.Presenters.ErrorPresenter = ErrorPresenter;
})(this.Backbone, this.Calendar, this.jQuery, this._);
