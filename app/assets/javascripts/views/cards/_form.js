PRO.Views._CardForm = Backbone.View.extend({
    template: JST['cards/edit'],
    tagName: 'div',
    className: 'cards__new-card__form',

    events: {
        'keyup input': '_handleKey',
        'blur input': 'save'
    },

    _handleKey: function(event) {
        if (event.keyCode === 13) this.save();
        if (event.keycode === 27) this.$el.trigger('close');
    },

    render: function() {
        this.$el.html(this.template({ model: this.model }));
        return this;
    },

    save: function () {
        var that = this;
        var body = this.$('.card-body').val();
        if (body.length > 0) {
            this.model.save({ body: body }, {
                success: function () {
                    that.$el.trigger('close');
                },
            });
        } else {
            that.$el.trigger('close');
        }
    }
});
