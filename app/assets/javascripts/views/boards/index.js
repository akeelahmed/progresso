PRO.Views.BoardIndex = Backbone.View.extend({
    template: JST['boards/index'],
    tagName: 'ul',
    className: 'boards',
    id: 'boards',

    events: {},

    createNewBoard: function() {
        newBoard = new PRO.Models.Board();

    },

    render: function() {
        this.$el.html(this.template({ collection: this.collection }));
        return this;
    },
});
