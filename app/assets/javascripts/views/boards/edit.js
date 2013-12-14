PRO.Views.BoardEdit = Backbone.View.extend({
    template: JST['boards/edit'],
    tagName: 'div',
    className: 'board__name__form',

    events: {
        "keyup input": "handleKey",
        "blur input": "save",
    },

    handleKey: function(event) {
        if (event.keyCode === 13) {
            this.save();
        } else if (event.keyCode === 27) {
            this.$el.trigger('close');
        }
    },

    save: function() {
        var that = this;
        var name = this.$('#board-name').val();
        if (name.length === 0) {
            this.$el.trigger('close');
            return;
            //TODO Refactor to remove weirdness of error checking here.
        }

        this.model.save(
            { name: name },
            { success: function () {
                that.$el.trigger('close');
              }
            }
        );
    },

    render: function() {
        this.$el.html(this.template({ model: this.model }));
        return this;
    }
});
