PRO.Views.ListShow = Backbone.View.extend({
    template: JST['lists/show'],
    tagName: 'div',
    className: 'list',

    events: {},

    render: function () {
        this.$el.html(this.template({ model: this.model }));
        return this;
    },
});
