PRO.Views.ParentView = Backbone.View.extend({
    // View with children.
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

        this._removeAllChildren();
        var view = this.childViewClass();

        // TODO: Consider unwrapping the childViews attr.
        this._childViews = _(this.children().map(
            function(child) {
                return new view({ model: child });
            }
        ));
        return this._childViews;
    },

    _removeAllChildren: function () {
        if (!this._childViews) return;
        this._childViews.each(
            function(view) {
                view.remove();
            }
        );
        this._childViews = [];
        return this;
    },
});
