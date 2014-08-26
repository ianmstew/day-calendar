(function (root, Backbone) {

  // Calendar widget
  function Calendar(options) {
    this.initialize(options);
  }

  // Instance methods/objects
  _.extend(Calendar.prototype, {

    // Events channel
    channel: null,

    // Root container
    $el: null,

    // Semantic initializer conforming to Backbone conventions
    initialize: function (options) {
      if (!(options || {}).el) throw Error('Must supply "el" element or selector for widget');
      this.$el = $(options.el);
      this._initChannel();
    },

    // Widget will communicate internally via a Radio event channel
    // See https://github.com/jmeas/backbone.radio
    _initChannel: function () {
      this.channel = Backbone.Radio.channel('global');
    },

    // Render events for a day
    renderDay: function (events) {
      console.log('Rendering events into', this.$el, events);
    }
  });

  // Static methods/objects
  _.extend(Calendar, {

    // Namespaces
    Views: {},
    Entities: {},
    Presenters: {}
  });

  root.Calendar = Calendar;
})(this, Backbone);
