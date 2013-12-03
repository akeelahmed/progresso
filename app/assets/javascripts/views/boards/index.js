PRO.Views.BoardIndex = Backbone.View.extend({
    template: JST['boards/index'],
    tagName: 'ul',
    className: 'boards',
    id: 'boards',

    events: {
        'click .boards__board--new__open-button': 'openNewView',
        'close .boards__board--new': 'closeNewView',
    },

    openNewView: function() {
        var newBoard = new PRO.Models.Board();
        this._newBoardView = new PRO.Views.BoardNew({ model: newBoard });
        this.$('.boards__board--new').html(this._newBoardView.render().$el);
        this.$('#board-name').focus();
    },

    closeNewView: function () {
        var that = this;
        this.collection.fetch({
            success: function () {
                that._newBoardView && that._newBoardView.remove();
                that.render();
            }
        });
    },

    render: function() {
        console.log('rendered');
        this.$el.html(this.template({ collection: this.collection }));
        return this;
    },
});
