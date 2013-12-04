PRO.Views.ListNew = Backbone.View.extend({
    template: JST['lists/new'],
    tagName: 'div',
    className: 'lists__list--new__form',
    id: 'new-list-form',

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

    save: function() {
        var that = this;
        var name = this.$('#list-name').val();
        if (name.length === 0) {
            this.$el.trigger('close');
            return;
            //TODO refactor.
        }

        this.model.save(
            { name: name },
            {
                success: function () {
                    console.log('saved');
                },
            }
        )
    },

    render: function() {
        this.$el.html(this.template({ model: this.model }));
        return this;
    }
})
