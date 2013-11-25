PRO.Views.BoardShow = Backbone.View.extend({
    template: JST['boards/show'],
    tagName: 'div',
    className: 'board',
    id: 'board',

    events: {},

    render: function() {
        this.$el.html(this.template({model: this.model}));
        return this;
    },
});
