(function (Backbone, $, _) {

  // A Presenter manages a single region and provides display logic hooks in concert.
  // The chief role of a Presenter is to acquire data and pass to a view, while handling
  // any additional higher level display logic or interfaces with the app at large.
  //
  // Note: To expand architecture to multiple presenters that share a region, a Region
  // element would be necessary to prevent memory leak; for example, Marionette.Region.
  function Presenter(options) {
    var opts = options || {};

    // Allow options to override values declared on the class
    this.region = opts.region || this.region;
    this.$region = $(this.region);

    // Backbone-style initialize
    if (this.initialize) this.initialize(options);
  }

  // Instance properties
  _.extend(Presenter.prototype, Backbone.Events, {

    // Presenter will render into this region
    region: null,
    $region: null,

    // Current view
    _view: null,

    // Dynamically updates region and called onPresent().
    // Implement onPresent() to encapsulate presentation logic.
    present: function (options) {
      var opts = options || {};

      // Allow dynamic override of the region
      if (opts.region) {
        this.region = opts.region;
        this.$region = $(this.region);
      }

      // Present complete
      this.trigger('present', options);
      if (this.onPresent) this.onPresent(options);
    },

    // Renders view and attaches to the DOM within the region element.
    // Supports swapping views without memory leaks.
    show: function (view, options) {
      // Properly remove the old view
      if (this._view && this._view !== view) {
        this._view.remove();
        this._view = null;
      }

      // Show the new view
      if (!this._view) {
        this.$region.append(view.render().$el);
        this._view = view;
      }

      // Show complete
      this.trigger('show', view, options);
      if (this.onShow) this.onShow(options);
    }
  });

  // Class properties
  _.extend(Presenter, {

    // Inheritance convenience method
    extend: Backbone.Model.extend
  });

  // Extend Backbone
  Backbone.Presenter = Presenter;
})(this.Backbone, this.jQuery, this._);
