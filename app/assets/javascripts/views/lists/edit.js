PRO.Views.ListEdit = Backbone.View.extend({
    template: JST['lists/edit'],
    tagname: 'div',
    className: 'lists__list__name__form',
    events: {
        'keyup input': '_handleKey',
        'blur input': 'save',
    },

    _handleKey: function(event) {
        if (event.keyCode === 13) {
            this.save();
        } else if (event.keyCode === 27) {
            this.$el.trigger('close');
        }
    },

    save: function () {
        var that = this;
        var name = this.$('input').val();
        if (name.length > 0) {
            this.model.save({
                name: name,
            }, {
                success: function () {
                    that.$el.trigger('close');
                }
            });
        } else {
            this.$el.trigger('close');
        };
    },

    render: function() {
        this.$el.html(this.template({ model: this.model }));
        return this;
    }

})
