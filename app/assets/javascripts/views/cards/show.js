PRO.Views.CardShow = Backbone.View.extend({
    template: JST['cards/show'],
    tagName: 'li',
    className: 'card',

    events: {
        'click .delete-card': 'delete',
        'click .card__body': 'openEditView',
        'close .card__body': 'closeEditView'
    },

    openEditView: function () {
        this._editView = new PRO.Views.CardEdit({ model: this.model });
        this.$('.card__body').html(this._editView.render().$el);
        this.$('.card__body input').focus();
    },

    closeEditView: function () {
        this._editView.remove();
        this._editView = undefined;
        this.$('.card__body').html(this.model.escape('body'));
    },

    render: function() {
        this.$el.html(this.template({ model: this.model }));
        this.$el.data('id', this.model.id);
        return this;
    },
});
