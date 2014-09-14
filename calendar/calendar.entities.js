(function (Calendar, Backbone, $, _) {

  // Entities module.
  // Maintains shared widget models accessible over widget event bus.
  var CalendarEntities = {

    // Shared models
    eventsCollection: null,
    rulerModel: null,

    start: function () {
      _.bindAll(this,
          'getRuler', 'setRuler', 'changeRulerIncrement',
          'getEvents', 'addEvent', 'removeEvent');

      this.eventsCollection = new Calendar.Entities.EventsCollection();
      this.rulerModel = new Calendar.Entities.RulerModel();

      Calendar.channel.reply('events', this.getEvents);
      Calendar.channel.reply('ruler', this.getRuler);
      Calendar.channel.comply('set:ruler', this.setRuler);
      Calendar.channel.comply('add:event', this.addEvent);
      Calendar.channel.comply('remove:event', this.removeEvent);
      Calendar.channel.comply('change:ruler:increment', this.changeRulerIncrement);
    },

    getRuler: function () {
      return this.rulerModel;
    },

    getEvents: function () {
      return this.eventsCollection;
    },

    addEvent: function (event) {
      var eventModel = new Calendar.Entities.EventModel(event);
      if (eventModel.isValid()) {
        this.eventsCollection.add(eventModel);
      } else {
        console.warn(eventModel.validationError);
      }
    },

    removeEvent: function (eventModel) {
      this.eventsCollection.remove(eventModel);
    },

    setRuler: function (ruler) {
      this.rulerModel.set(ruler);
    },

    changeRulerIncrement: function (rulerIncrement) {
      this.rulerModel.set('increment', rulerIncrement);
    }
  };

  Calendar.CalendarEntities = CalendarEntities;
})(this.Calendar, this.Backbone, this.jQuery, this._);
