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
        var body = this.$('.body').val();
        this.model.set({body: body})
        console.log(this.model.id);
        if (body.length > 0) {
            this.model.save({}, {
                success: function () {
                    that.$el.trigger('close');
                },
            });
        } else {
            that.$el.trigger('close');
        }
    }
});
