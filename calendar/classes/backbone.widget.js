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

    // Nested namespaces
    Views: {},
    Entities: {},
    Presenters: {},
    Util: {},

    // Inheritance convenience method
    extend: Backbone.Model.extend
  });

  // Extend Backbone
  Backbone.Widget = Widget;
})(Backbone, jQuery, _);
