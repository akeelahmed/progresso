PRO.Routers.Boards = Backbone.Router.extend({
    routes: {
        '': 'index',
        'boards/:id': 'show'
    },

    initialize: function(options) {
        this.$content = $(options.content);
    },

    _swap: function(newView) {
        this._currentView && this._currentView.remove();
        this._currentView = newView;
        this.$content.html(newView.render().$el);
    },

    index: function () {
        var view = new PRO.Views.BoardIndex({collection: PRO.Store.boards});
        this._swap(view);
    },

    show: function (id) {
        var board = PRO.Store.boards.get(id);
        if (board instanceof Backbone.Model) {
            var view = new PRO.Views.BoardShow({model: board});
            this._swap(view);
        }
    },
});
