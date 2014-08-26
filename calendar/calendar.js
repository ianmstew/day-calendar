(function (Backbone, root) {

  // Application
  function Calendar() {
    this.initialize();
  }

  // Instance methods
  _.extend(Calendar.prototype, {

    // Application events channel
    // https://github.com/jmeas/backbone.radio
    channel: null,

    initialize: function () {
      this._initChannel();
    },

    _initChannel: function () {
      this.channel = Backbone.Radio.channel('global');
    },

    renderEvents: function (events) {
      console.log('Rendering events:', events);
    }
  });

  // Class methods/objects
  _.extend(Calendar, {

    layOutDay: function (events) {
      var calendar = new Calendar();
      calendar.renderEvents(events);
    },

    // Submodules
    Views: {},
    Entities: {},
    Presenters: {}
  });

  root.Calendar = Calendar;
  root.layOutDay = Calendar.layOutDay;
})(Backbone, this);
