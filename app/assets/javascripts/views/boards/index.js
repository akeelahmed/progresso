PRO.Views.BoardIndex = Backbone.View.extend({
    template: JST['boards/index'],
    tagName: 'div',
    className: 'boards',
    id: 'boards',

    events: {},

    render: function() {
        this.$el.html(this.template({ collection: this.collection }));
        return this;
    },
});
