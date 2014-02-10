PRO.Views.ParentView = Backbone.View.extend({
    adopt: function(view) {
        if (!this.hasOwnProperty('_children')) this._children = {};
        if (!this.hasOwnProperty('_indexByModel')) this._indexByModel = {};

        this._children[view.cid] = view;
        if (view.model) this._indexByModel[view.model.cid] = view.cid;
    },

    orphan: function(child) {
        delete this._children[child.cid];
        if (child.model) delete this._indexByModel[child.model.cid];
        child.remove();
    },

    remove: function () {
        this.orphanAll();
        Backbone.View.prototype.remove.apply(this);
    },

    findChildByModel: function(model){
        var viewCid = this._indexByModel[model.cid];
        return this.findByCid(viewCid);
    },

    orphanAll: function () {
        _(this._children).each(this.orphan.bind(this));
    },
});
