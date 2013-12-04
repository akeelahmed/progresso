PRO.Views.ParentView = Backbone.View.extend({
    // View with a bunch of children.
    // The children attribute should be a collection.
    // Also needs a childViewClass.

    remove: function () {
        Backbone.View.prototype.remove.apply(this, arguments);
        this._removeAllChildren();
    },

    _buildChildViews: function () {
        if (!(this.children && this.childViewClass)) {
            throw "Error: Need children and childViewClass attributes.";
        }
        var view = this.childViewClass();

        this._childViews = _(this.children().map(
            function(child) {
                return new view({ model: child });
            }
        ));
        return this._childViews;
    },

    _removeAllChildren: function () {
        this._childViews.each(
            function(view) {
                view.remove();
            }
        );
        this._childViews = [];
    },
});
