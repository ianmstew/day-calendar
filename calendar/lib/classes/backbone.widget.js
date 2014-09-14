(function (Backbone, $, _) {

  // A Widget is a simple class that contains a region.  By injecting a region, the widget
  // is capable of modular, component-ized reuse.
  function Widget(options) {
    var opts = options || {};

    this.region = opts.region || this.region;
    this.$region = $(this.region);

    // Backbone-style initialize
    if (this.initialize) this.initialize(options);
  }

  // Instance properties
  _.extend(Widget.prototype, Backbone.Events, {

    // Region owned by this widget
    region: null,
    $region: null
  });

  // Class properties
  _.extend(Widget, {

    // Override me for Widget-specific event bus
    channel: null,

    // Nested namespaces
    Views: {},
    Entities: {},
    Presenters: {},

    // Inheritance convenience method
    extend: Backbone.Model.extend
  });

  // Extend Backbone
  Backbone.Widget = Widget;
})(this.Backbone, this.jQuery, this._);
