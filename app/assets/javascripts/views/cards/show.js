PRO.Views.CardShow = Backbone.View.extend({
    template: JST['cards/show'],
    tagName: 'li',
    className: 'card',

    events: {},

    render: function() {
        this.$el.html(this.template({ model: this.model }));
        return this;
    },
});
