(function (Backbone, Calendar, $, _) {

  // Simple static view. Time index logic is within the model.
  var FormView = Backbone.View.extend({

    // Precompile template on script load
    template: _.template($('#form-view').html()),

    className: 'form',
    tagName: 'form',
    rulerModel: null,

    events: {
      'click button[name=add-event]': 'addEventClicked',
      'change input[name=ruler-increment]': 'rulerIncrementChanged'
    },

    initialize: function () {
      this.rulerModel = Calendar.channel.request('ruler');
    },

    render: function () {
      this.$el.html(this.template());
      this._setDefaultState();
      return this;
    },

    addEventClicked: function (evt) {
      var event = { start: this.ui.startTime.val(), end: this.ui.endTime.val() };
      Calendar.channel.command('add:event', event);
      evt.preventDefault();
    },

    rulerIncrementChanged: function (evt) {
      var increment = evt.target.value;
      Calendar.channel.command('change:ruler:increment', increment);
    },

    _setDefaultState: function () {
      this.$('input[name=ruler-increment]')
        .filter('input[value=' + this.rulerModel.get('increment') + ']')
        .prop('checked', true);
    }
  });

  Calendar.Views.FormView = FormView;
})(this.Backbone, this.Calendar, this.jQuery, this._);
