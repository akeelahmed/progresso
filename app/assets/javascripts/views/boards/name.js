PRO.Views.BoardName = Backbone.View.extend({
    tagName: 'div',
    className: 'board__name',

    events: {
        'click .board__name__text': 'toggleState',
        'blur .board__name__input': 'saveAndToggleState',
        'keyup .board__name__input': 'handleKey'
    },

    toggleState: function() {
        this._editing = (this._editing ? false : true);
        this.render();
    },

    saveAndToggleState: function() {
        if (!this._editing) return;
        var newName = this.$('.board__name__input').val();

        if (newName.length === 0) {
            this.toggleState();
            return;
        }

        this.model.save({
            name: newName
        }, {
            success: this.toggleState.bind(this)
        });
    },

    handleKey: function(event) {
        keys = {
            enter: 13,
            escape: 27
        };

        if (event.keyCode === keys.enter) {
            this.saveAndToggleState();
        } else if (event.keyCode === keys.escape) {
            this.toggleState();
        }
    },

    render: function () {
        if (this._editing) {
            this.$el.html('<input type=\"text\" class=\"board__name__input\" value=\"'
                          + this.model.escape('name') + '\">');
            this.$('.board__name__input').focus();
        } else {
            this.$el.html('<h1 class="board__name__text">'
                          + this.model.escape('name') + '</h1>');
        }

        return this;
    }
});
