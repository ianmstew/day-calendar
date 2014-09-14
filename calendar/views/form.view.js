(function (Backbone, Calendar, $, _) {

  // Simple static view. Time index logic is within the model.
  var FormView = Backbone.View.extend({

    // Precompile template on script load
    template: _.template($('#forms-view').html()),

    className: 'forms',
    rulerModel: null,

    events: {
      'submit .js-form-event': 'submitEvent',
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

    submitEvent: function (evt) {
      evt.preventDefault();
      var event = {
        title:    this.$('input[name=title]').val() || undefined,
        location: this.$('input[name=location]').val() || undefined,
        start:    this.$('input[name=start-time]').val() || undefined,
        end:      this.$('input[name=end-time]').val() || undefined
      };
      Calendar.channel.command('add:event', event);
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
