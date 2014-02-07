PRO.Views.BoardIndex = Backbone.View.extend({
    template: JST['boards/index'],
    className: 'boards-index',

    events: {
        'click .boards__board-link--new': 'openNewView'
    },

    initialize: function(options) {
        this.listenTo(this.collection, 'sync', this.render);
    },

    openNewView: function() {
        if (this._newBoardView) return;

        var newBoard = new PRO.Models.Board();
        this._newBoardView = new PRO.Views.BoardNew({
            model: newBoard,
            onClose: this.closeNewView.bind(this)
        });
        this.$('.boards__board--new').html(this._newBoardView.render().$el);
        this._newBoardView.$('#board-name').focus();
    },

    closeNewView: function () {
        var that = this;
        // TODO: is this fetch necessary?
        this.collection.fetch({
            success: function () {
                that._newBoardView && that._newBoardView.remove();
                delete that._newBoardView;
                that.render();
            }
        });
    },

    render: function() {
        this.$el.html(this.template({ collection: this.collection }));
        return this;
    },
});
