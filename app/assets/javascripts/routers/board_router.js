PRO.Routers.Boards = Backbone.Router.extend({
    routes: {
        '': 'show',
    },

    initialize: function(options) {
        this.$content = $(options.content);
    },

    _swap: function(newView) {
        this._currentView && this._currentView.remove();
        this._currentView = newView;
        this.$content.html(newView.render().$el);
    },

    show: function () {
        var board = PRO.Store.boards.min(function(board) {
            return +board.get("cardinality");
            //TODO Do I really need to cast to number here?
            //TODO Move into model.
        });

        if (board instanceof Backbone.Model) {
            var view = new PRO.Views.BoardShow({model: board});
            this._swap(view);
        }
    },
});
