(function (Calendar, Backbone, $, _) {

  // Entities module.
  // Maintains shared widget models accessible over widget event bus.
  var CalendarEntities = {

    // Shared models
    eventsCollection: null,
    rulerModel: null,

    start: function () {
      _.bindAll(this,
          'getRuler', 'changeRulerIncrement', 'setRuler',
          'getEvents', 'addEvent', 'removeEvent', 'clearEvents', 'resetEvents');

      this.eventsCollection = new Calendar.Entities.EventsCollection();
      this.rulerModel = new Calendar.Entities.RulerModel();

      Calendar.channel.reply('events', this.getEvents);
      Calendar.channel.reply('ruler', this.getRuler);

      Calendar.channel.comply('set:ruler', this.setRuler);
      Calendar.channel.comply('add:event', this.addEvent);
      Calendar.channel.comply('remove:event', this.removeEvent);
      Calendar.channel.comply('clear:events', this.clearEvents);
      Calendar.channel.comply('reset:events', this.resetEvents);

      Calendar.channel.comply('change:ruler:increment', this.changeRulerIncrement);
    },

    getRuler: function () {
      return this.rulerModel;
    },

    setRuler: function (ruler) {
      this.rulerModel.set(ruler);
    },

    getEvents: function () {
      return this.eventsCollection;
    },

    resetEvents: function (events) {
      this.eventsCollection.once('invalid', this.onInvalid);
      this.eventsCollection.reset(events, { validate: true, parse: true });
    },

    addEvent: function (event) {
      var eventModel = new Calendar.Entities.EventModel(event, { parse: true });
      if (eventModel.isValid()) {
        this.eventsCollection.add(eventModel, { parse: true });
      } else {
        Calendar.channel.trigger('user:error', eventModel.validationError);
      }
    },

    removeEvent: function (eventModel) {
      this.eventsCollection.remove(eventModel);
    },

    clearEvents: function () {
      this.eventsCollection.reset();
    },

    changeRulerIncrement: function (rulerIncrement) {
      this.rulerModel.set('increment', rulerIncrement);
    }
  };

  Calendar.CalendarEntities = CalendarEntities;
})(this.Calendar, this.Backbone, this.jQuery, this._);
