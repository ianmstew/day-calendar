(function (Backbone, Calendar, $, _) {

  // Form for driving day calendar
  var FormView = Backbone.View.extend({

    // Precompile template on script load
    template: _.template($('#forms-view').html()),

    className: 'forms',
    rulerModel: null,

    events: {
      'submit .js-form-event': 'submitEvent',
      'submit .js-form-clear': 'clearEvents',
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

    // Add a new event
    submitEvent: function (evt) {
      evt.preventDefault();
      var event = {
        title:    this.$('input[name=title]').val(),
        location: this.$('input[name=location]').val(),
        start:    this.$('input[name=start-time]').val(),
        end:      this.$('input[name=end-time]').val()
      };
      Calendar.channel.command('add:event', event);
    },

    clearEvents: function (evt) {
      evt.preventDefault();
      Calendar.channel.command('clear:events');
    },

    rulerIncrementChanged: function (evt) {
      var increment = evt.target.value;
      Calendar.channel.command('change:ruler:increment', increment);
    },

    // Select the appropriate radio button
    _setDefaultState: function () {
      this.$('input[name=ruler-increment]')
        .filter('input[value=' + this.rulerModel.get('increment') + ']')
        .prop('checked', true);
    }
  });

  Calendar.Views.FormView = FormView;
})(this.Backbone, this.Calendar, this.jQuery, this._);
