(function (Backbone, $, _) {

  // A Widget is a simple class that contains a region,
  // but leaves all rendering up to the implementer.
  function Widget(options) {
    var opts = options || {};

    this.region = opts.region || this.region;
    this.$region = $(this.region);

    // Backbone-style initialize
    if (this.initialize) this.initialize(options);
  }

  _.extend(Widget.prototype, Backbone.Events, {

    // Region owned by this widget
    region: null,
    $region: null
  });

  _.extend(Widget, {

    // Namespaces
    Views: {},
    Entities: {},
    Presenters: {},

    // Inheritance convenience method
    extend: Backbone.Model.extend
  });

  // Extend Backbone
  Backbone.Widget = Widget;
})(Backbone, jQuery, _);
