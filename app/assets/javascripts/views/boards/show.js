PRO.Views.BoardShow = Backbone.View.extend({
    template: JST['boards/show'],
    tagName: 'div',
    className: 'board',
    id: 'board',

    events: {
        'click .lists__list--new__button': 'openNewView',
        'close .lists__list--new': 'closeNewView'
    },

    openNewView: function (event) {
        var lists = this.model.get('lists');
        var newList = new PRO.Models.List({
            board_id: this.model.id,
            cardinality: (_.max(lists.pluck('cardinality')) + 1),
        });

        this._newListView = new PRO.Views.ListNew({ model: newList });
        this.$('.lists__list--new').html(this._newListView.render().$el);
        this.$('#list-name').focus();
    },

    closeNewView: function() {
        var that = this;
        this.model.get('lists').fetch({
            success: function () {
                console.log('successful!');
            }
        });
    },

    initialize: function () {
        this._children = _(this.model.get("lists").map(
            function(list) {
                return new PRO.Views.ListShow({model: list});
            }
        ));
    },

    remove: function() {
        Backbone.View.prototype.remove.apply(this, arguments);
        this._removeAllChildren();
    },

    _removeAllChildren: function() {
        _(this._children).each(
            function(view) {
                view.remove();
            });
        this._children = [];
    },

    render: function() {
        this.$el.html(this.template({ model: this.model }));
        var $lists = this.$('#lists');
        $lists.empty();
        this._children.each(function(list) {
            $lists.append(list.render().$el);
        });
        return this;
    },
});
