PRO.Views.CardShow = Backbone.View.extend({
    template: JST['cards/show'],
    tagName: 'li',
    className: 'card',

    events: {
        'click .delete-card': 'delete'
    },

    render: function() {
        this.$el.html(this.template({ model: this.model }));
        return this;
    },
});
