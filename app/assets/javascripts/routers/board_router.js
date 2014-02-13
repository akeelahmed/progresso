PRO.Routers.Boards = Backbone.Router.extend({
    routes: {
        '': 'index',
        'boards/:id': 'show'
    },

    initialize: function(options) {
        this.$content = $(options.content);
        this.header = new PRO.Views.Header({
            el: options.header
        });
    },

    _swap: function(newView) {
        $('body').removeClass();
        // When swapping, close modals.
        this.header.closeModals();

        this._currentView && this._currentView.remove();
        this._currentView = newView;
        this.$content.html(newView.render().$el);
    },

    index: function () {
        PRO.Store.boards.fetch();
        var view = new PRO.Views.BoardIndex({ collection: PRO.Store.boards });
        this._swap(view);
    },

    show: function (id) {
        var that = this;
        var board = PRO.Store.boards.getOrFetch(id, {
            success: function () {
                var view = new PRO.Views.BoardShow({ model: board });
                that._swap(view);
                $('body').addClass('board-view');

            }
        });


    },
});
