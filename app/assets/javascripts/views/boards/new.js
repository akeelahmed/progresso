PRO.Views.BoardNew = Backbone.View.extend({
    template: JST['boards/edit'],
    tagName: 'div',
    className: 'boards__board--new__form',
    id: 'new-board-form',

    events: {
        "keyup input": "handleKey",
        "blur input": "save",
    },

    initialize: function(options) {
        this.onClose = options.onClose;
    },

    handleKey: function(event) {
        // TODO: make constants 13 = enter, 27 = esc.
        if (event.keyCode === 13) {
            this.save();
        } else if (event.keyCode === 27) {
            // TODO: instead trigger close event on view (not $el)
            this.onClose();
        }
    },

    save: function() {
        var that = this;
        var name = this.$('#board-name').val();
        if (name.length === 0) {
            this.onClose();
            return;
            //TODO Refactor to remove weirdness of error checking here.
        }

        this.model.save(
            { name: name },
            { success: that.onClose }
        );
    },

    render: function() {
        this.$el.html(this.template({ model: this.model }));
        return this;
    }
});
